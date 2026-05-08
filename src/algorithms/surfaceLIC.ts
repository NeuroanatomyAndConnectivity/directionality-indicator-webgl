import { mat4, vec3 } from "gl-matrix";
import { linkProgram, type ShaderProgram } from "../gfx/program";
import { createFramebuffer } from "../gfx/framebuffer";
import { createScreenQuad } from "../gfx/screenQuad";
import { generateWhiteNoise3D } from "./whiteNoise";

import transformVertSrc from "../shaders/lic.transform.vert.glsl?raw";
import transformFragSrc from "../shaders/lic.transform.frag.glsl?raw";
import shadingSrc from "../shaders/shading.glsl?raw";
import edgeVertSrc from "../shaders/lic.edge.vert.glsl?raw";
import edgeFragSrc from "../shaders/lic.edge.frag.glsl?raw";
import advectVertSrc from "../shaders/lic.advect.vert.glsl?raw";
import advectFragSrc from "../shaders/lic.advect.frag.glsl?raw";
import composeVertSrc from "../shaders/lic.compose.vert.glsl?raw";
import composeFragSrc from "../shaders/lic.compose.frag.glsl?raw";

export interface SurfaceLICInput {
  meshVAO: WebGLVertexArrayObject;
  meshIndexCount: number;
  meshIndexType: number; // gl.UNSIGNED_INT etc.
  meshBBMin: vec3;
  meshBBMax: vec3;
  /** Live-tunable LIC parameters from the panel. Optional — defaults match the original C++. */
  licIterations?: number;
  useHighContrast?: boolean;
  showLIC?: boolean;
  showColor?: boolean;
  /** When true, the compose pass overrides weak-magnitude pixels with white/black bands
   * to highlight singular points (saddles, vortex centers). Mirrors the original C++
   * `m_emphasizeSingularPointsEnable` toggle. Default: false. */
  emphasizeSingular?: boolean;
  /** Surface shading params (Phong) — passed to the transform pass via shading.glsl. */
  surfaceAmbient?: number;     // default 0.04
  surfaceDiffuse?: number;     // default 0.75
  surfaceSpecular?: number;    // default 0.4
  surfaceShininess?: number;   // default 80
}

export interface SurfaceLIC {
  /** Run all 4 passes. Final pass writes to whichever FB is bound on entry. */
  render(input: SurfaceLICInput, view: mat4, projection: mat4, viewportW: number, viewportH: number): void;
  /** Resize internal FBOs to match a new viewport. */
  resize(width: number, height: number): void;
  /** Attribute locations of the transform program — needed to build the mesh VAO. */
  transformAttribs: Map<string, number>;
  /** Depth texture from the transform pass. Exposed so consumers can do depth-aware
   * screen-space culling (e.g. arrow occlusion against the rendered surface). */
  getTransformDepthTexture(): WebGLTexture | null;
  /** G-buffer color (RGBA8). View-space-shaded mesh color. */
  getColorTexture(): WebGLTexture;
  /** G-buffer view-space vec (RGBA16F). a=1 inside mesh, 0 outside. */
  getVecTexture(): WebGLTexture;
  /** G-buffer view-space normal (RGBA16F). a=1 inside mesh, 0 outside. */
  getNormalTexture(): WebGLTexture;
  /** G-buffer view-space position (RGBA16F). a=1 inside mesh, 0 outside. */
  getPosTexture(): WebGLTexture;
}

function injectShading(fragSrc: string): string {
  // Insert the shading helper above the main() of the transform fragment.
  // We put it after the version + precision lines and after the layout(location=...) decls.
  // Simplest: put it right before the line `void main()`.
  const idx = fragSrc.indexOf("void main()");
  if (idx < 0) throw new Error("transform.frag.glsl: void main() not found");
  return fragSrc.slice(0, idx) + shadingSrc + "\n" + fragSrc.slice(idx);
}

export function createSurfaceLIC(
  gl: WebGL2RenderingContext,
  initialWidth: number,
  initialHeight: number,
): SurfaceLIC {
  // Programs.
  const transformProgram = linkProgram(gl, transformVertSrc, injectShading(transformFragSrc), "lic.transform");
  const edgeProgram = linkProgram(gl, edgeVertSrc, edgeFragSrc, "lic.edge");
  const advectProgram = linkProgram(gl, advectVertSrc, advectFragSrc, "lic.advect");
  const composeProgram = linkProgram(gl, composeVertSrc, composeFragSrc, "lic.compose");

  // Screen quad (one VAO per program because attribute location may differ).
  const screenQuadEdge = createScreenQuad(gl, edgeProgram.attribs.get("a_position") ?? -1);
  const screenQuadAdvect = createScreenQuad(gl, advectProgram.attribs.get("a_position") ?? -1);
  const screenQuadCompose = createScreenQuad(gl, composeProgram.attribs.get("a_position") ?? -1);

  // FBOs.
  // Transform: 5 color attachments (color, vec, noise, normal, pos) + depth.
  // Indices match Render*-Transform-fragment.glsl layout(location=...) outputs.
  let transformFBO = createFramebuffer(gl, {
    width: initialWidth, height: initialHeight,
    colors: [
      { internalFormat: gl.RGBA8,   format: gl.RGBA, type: gl.UNSIGNED_BYTE }, // 0: color
      { internalFormat: gl.RGBA16F, format: gl.RGBA, type: gl.HALF_FLOAT },    // 1: vec
      { internalFormat: gl.R8,      format: gl.RED,  type: gl.UNSIGNED_BYTE }, // 2: noise
      { internalFormat: gl.RGBA16F, format: gl.RGBA, type: gl.HALF_FLOAT },    // 3: normal
      { internalFormat: gl.RGBA16F, format: gl.RGBA, type: gl.HALF_FLOAT },    // 4: pos
    ],
    depth: true,
  });
  let edgeFBO = createFramebuffer(gl, {
    width: initialWidth, height: initialHeight,
    colors: [{ internalFormat: gl.RGBA8, format: gl.RGBA, type: gl.UNSIGNED_BYTE, mipmap: true }],
    depth: false,
  });
  let advectFBO = createFramebuffer(gl, {
    width: initialWidth, height: initialHeight,
    colors: [{ internalFormat: gl.RGBA8, format: gl.RGBA, type: gl.UNSIGNED_BYTE }],
    depth: false,
  });

  // 3D noise texture (128³ R8, ~2 MB). Sampled by world-space pos → seamless across mesh.
  // Matches the original C++ (SurfaceLIC.cpp line 436). Lower resolutions produce
  // low-frequency blobs instead of streaky LIC patterns because adjacent screen pixels
  // pull from the same noise voxel after trilinear interpolation.
  const noiseSize = 128;
  const noiseData = generateWhiteNoise3D(noiseSize, noiseSize, noiseSize, 12345);
  const noiseTex = gl.createTexture();
  if (!noiseTex) throw new Error("createTexture failed for noiseTex");
  gl.bindTexture(gl.TEXTURE_3D, noiseTex);
  gl.texImage3D(gl.TEXTURE_3D, 0, gl.R8, noiseSize, noiseSize, noiseSize, 0, gl.RED, gl.UNSIGNED_BYTE, noiseData);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT);

  function bindUniformTexture(program: ShaderProgram, name: string, unit: number, target: number, tex: WebGLTexture | null): void {
    const loc = program.uniforms.get(name);
    if (!loc) return; // uniform may be optimized out
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(target, tex);
    gl.uniform1i(loc, unit);
  }

  function render(input: SurfaceLICInput, viewMat: mat4, projection: mat4, vpW: number, vpH: number): void {
    // Capture the FBO bound on entry so we can restore it for the final compose target.
    const targetFBO = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING) as WebGLFramebuffer | null;

    // ---------- Pass 1: Transform ----------
    transformFBO.bind();
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.useProgram(transformProgram.program);
    gl.uniformMatrix4fv(transformProgram.uniforms.get("u_view")!, false, viewMat);
    gl.uniformMatrix4fv(transformProgram.uniforms.get("u_projection")!, false, projection);
    gl.uniform3fv(transformProgram.uniforms.get("u_meshBBMin")!, input.meshBBMin);
    gl.uniform3fv(transformProgram.uniforms.get("u_meshBBMax")!, input.meshBBMax);
    gl.uniform1f(transformProgram.uniforms.get("u_surfaceAmbient")!, input.surfaceAmbient ?? 0.04);
    gl.uniform1f(transformProgram.uniforms.get("u_surfaceDiffuse")!, input.surfaceDiffuse ?? 0.75);
    gl.uniform1f(transformProgram.uniforms.get("u_surfaceSpecular")!, input.surfaceSpecular ?? 0.4);
    gl.uniform1f(transformProgram.uniforms.get("u_surfaceShininess")!, input.surfaceShininess ?? 80);
    bindUniformTexture(transformProgram, "u_noiseSampler", 0, gl.TEXTURE_3D, noiseTex);
    gl.bindVertexArray(input.meshVAO);
    gl.drawElements(gl.TRIANGLES, input.meshIndexCount, input.meshIndexType, 0);
    gl.bindVertexArray(null);

    transformFBO.generateMipmaps(); // depth needs mipmaps for compose

    // ---------- Pass 2: Edge ----------
    edgeFBO.bind();
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.useProgram(edgeProgram.program);
    gl.uniform2f(edgeProgram.uniforms.get("u_viewportSize")!, transformFBO.width, transformFBO.height);
    bindUniformTexture(edgeProgram, "u_depthSampler", 0, gl.TEXTURE_2D, transformFBO.depthTexture);
    gl.bindVertexArray(screenQuadEdge);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
    edgeFBO.generateMipmaps();

    // ---------- Pass 3: Advect ----------
    advectFBO.bind();
    gl.useProgram(advectProgram.program);
    gl.uniform2f(advectProgram.uniforms.get("u_viewportSize")!, transformFBO.width, transformFBO.height);
    gl.uniform2f(advectProgram.uniforms.get("u_viewportScale")!, 1.0, 1.0);
    gl.uniform1f(advectProgram.uniforms.get("u_noiseRatio")!, 0.0);
    gl.uniform1i(advectProgram.uniforms.get("u_numIter")!, input.licIterations ?? 50);
    bindUniformTexture(advectProgram, "u_depthSampler", 0, gl.TEXTURE_2D, transformFBO.depthTexture);
    bindUniformTexture(advectProgram, "u_noiseSampler", 1, gl.TEXTURE_2D, transformFBO.colorTextures[2]);
    bindUniformTexture(advectProgram, "u_vecSampler", 2, gl.TEXTURE_2D, transformFBO.colorTextures[1]);
    bindUniformTexture(advectProgram, "u_edgeSampler", 3, gl.TEXTURE_2D, edgeFBO.colorTextures[0]);
    gl.bindVertexArray(screenQuadAdvect);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);

    // ---------- Pass 4: Compose to original target ----------
    gl.bindFramebuffer(gl.FRAMEBUFFER, targetFBO);
    gl.viewport(0, 0, vpW, vpH);
    gl.useProgram(composeProgram.program);
    gl.uniform1i(composeProgram.uniforms.get("u_useHighContrast")!, (input.useHighContrast ?? true) ? 1 : 0);
    gl.uniform1i(composeProgram.uniforms.get("u_showLIC")!, (input.showLIC ?? true) ? 1 : 0);
    gl.uniform1i(composeProgram.uniforms.get("u_showColor")!, (input.showColor ?? true) ? 1 : 0);
    gl.uniform1i(composeProgram.uniforms.get("u_emphasizeSingular")!, (input.emphasizeSingular ?? false) ? 1 : 0);
    bindUniformTexture(composeProgram, "u_colorSampler", 0, gl.TEXTURE_2D, transformFBO.colorTextures[0]);
    bindUniformTexture(composeProgram, "u_vecSampler", 1, gl.TEXTURE_2D, transformFBO.colorTextures[1]);
    bindUniformTexture(composeProgram, "u_depthSampler", 2, gl.TEXTURE_2D, transformFBO.depthTexture);
    bindUniformTexture(composeProgram, "u_edgeSampler", 3, gl.TEXTURE_2D, edgeFBO.colorTextures[0]);
    bindUniformTexture(composeProgram, "u_noiseSampler", 4, gl.TEXTURE_2D, transformFBO.colorTextures[2]);
    bindUniformTexture(composeProgram, "u_advectSampler", 5, gl.TEXTURE_2D, advectFBO.colorTextures[0]);
    gl.enable(gl.DEPTH_TEST);
    gl.bindVertexArray(screenQuadCompose);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
  }

  function resize(width: number, height: number): void {
    transformFBO.resize(width, height);
    edgeFBO.resize(width, height);
    advectFBO.resize(width, height);
  }

  return {
    render,
    resize,
    transformAttribs: transformProgram.attribs,
    getTransformDepthTexture: () => transformFBO.depthTexture,
    getColorTexture: () => transformFBO.colorTextures[0],
    getVecTexture: () => transformFBO.colorTextures[1],
    getNormalTexture: () => transformFBO.colorTextures[3],
    getPosTexture: () => transformFBO.colorTextures[4],
  };
}
