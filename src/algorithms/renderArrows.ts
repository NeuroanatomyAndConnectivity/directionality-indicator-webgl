import type { ShaderProgram } from "../gfx/program";
import type { CurvedArrowBuffers } from "./curvedArrows";

export interface ArrowInstanceBuffers {
  /** vec3 per arrow (world-space anchor). */
  positions: Float32Array;
  /** vec3 per arrow (unit world-space tangent direction). */
  directions: Float32Array;
  /** vec3 per arrow (unit world-space normal). */
  normals: Float32Array;
  /** RGBA bytes per arrow (region color). */
  colors: Uint8Array;
}

export interface ArrowRenderable {
  vao: WebGLVertexArrayObject;
  instanceCount: number;
  draw(): void;
}

/**
 * Build an instanced VAO for world-space-anchored arrow rendering.
 *
 * Per-vertex (4 corners as triangle strip):
 *   a_corner: vec2 — (-1,-1), (1,-1), (-1,1), (1,1)
 *
 * Per-instance:
 *   a_instance_position:  vec3 — world-space anchor on the mesh surface
 *   a_instance_direction: vec3 — unit world-space tangent
 *   a_instance_normal:    vec3 — unit world-space normal
 *   a_instance_color:     vec4 — RGBA (UNSIGNED_BYTE, normalized)
 *
 * The arrow vertex shader transforms instance data to view space at draw time
 * (via u_view). Anchors stay attached to specific mesh points across camera
 * rotations.
 */
export function createArrowRenderable(
  gl: WebGL2RenderingContext,
  program: ShaderProgram,
  instances: ArrowInstanceBuffers,
): ArrowRenderable {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("createVertexArray failed for arrow");
  gl.bindVertexArray(vao);

  const cornerLoc = program.attribs.get("a_corner") ?? -1;
  if (cornerLoc < 0) throw new Error("arrow vertex shader missing attribute a_corner");
  const cornerVBO = gl.createBuffer();
  if (!cornerVBO) throw new Error("createBuffer failed for a_corner");
  gl.bindBuffer(gl.ARRAY_BUFFER, cornerVBO);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(cornerLoc);
  gl.vertexAttribPointer(cornerLoc, 2, gl.FLOAT, false, 0, 0);

  function bindInstance(
    name: string,
    data: ArrayBufferView,
    size: number,
    type: number,
    normalized: boolean,
  ): void {
    const loc = program.attribs.get(name) ?? -1;
    if (loc < 0) throw new Error(`arrow shader missing attribute ${name}`);
    const vbo = gl.createBuffer();
    if (!vbo) throw new Error(`createBuffer failed for ${name}`);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, type, normalized, 0, 0);
    gl.vertexAttribDivisor(loc, 1);
  }

  bindInstance("a_instance_position", instances.positions, 3, gl.FLOAT, false);
  bindInstance("a_instance_direction", instances.directions, 3, gl.FLOAT, false);
  bindInstance("a_instance_normal", instances.normals, 3, gl.FLOAT, false);
  bindInstance("a_instance_color", instances.colors, 4, gl.UNSIGNED_BYTE, true);

  gl.bindVertexArray(null);

  const instanceCount = instances.positions.length / 3;

  return {
    vao,
    instanceCount,
    draw() {
      gl.bindVertexArray(vao);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, instanceCount);
      gl.bindVertexArray(null);
    },
  };
}

/**
 * Renderable for the curved-arrow path (one triangle-strip ribbon per arrow).
 *
 * Unlike `ArrowRenderable` (which is instanced — same 4-vertex quad replayed
 * with per-instance attributes), curved arrows have variable per-vertex data
 * along the ribbon. Each arrow gets its own draw call against a contiguous
 * slice of the same VAO, indexed via `firstIndices` and `counts`.
 */
export interface CurvedArrowRenderable {
  vao: WebGLVertexArrayObject;
  /** Per-arrow first-vertex offset (matches CurvedArrowBuffers.firstIndices). */
  firstIndices: Int32Array;
  /** Per-arrow vertex count (matches CurvedArrowBuffers.counts). */
  counts: Int32Array;
  draw(): void;
}

/**
 * Build a VAO for curved-arrow rendering. Six attributes are uploaded as one
 * STATIC_DRAW VBO each, matching the layout produced by
 * `buildCurvedArrowBuffers`.
 *
 * Drawing iterates over `firstIndices` / `counts`, issuing one
 * `gl.drawArrays(TRIANGLE_STRIP, first, count)` per arrow. Instanced rendering
 * is not used here because each ribbon has its own sequence of path points.
 */
export function createCurvedArrowRenderable(
  gl: WebGL2RenderingContext,
  program: ShaderProgram,
  buffers: CurvedArrowBuffers,
): CurvedArrowRenderable {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("createVertexArray failed for curved arrow");
  gl.bindVertexArray(vao);

  function bindAttribute(
    name: string,
    data: ArrayBufferView,
    size: number,
    type: number,
    normalized: boolean,
  ): void {
    const loc = program.attribs.get(name) ?? -1;
    if (loc < 0) throw new Error(`curved-arrow shader missing attribute ${name}`);
    const vbo = gl.createBuffer();
    if (!vbo) throw new Error(`createBuffer failed for ${name}`);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, type, normalized, 0, 0);
  }

  bindAttribute("a_position", buffers.positions, 3, gl.FLOAT, false);
  bindAttribute("a_tangent", buffers.tangents, 3, gl.FLOAT, false);
  bindAttribute("a_normal", buffers.normals, 3, gl.FLOAT, false);
  bindAttribute("a_color", buffers.colors, 4, gl.UNSIGNED_BYTE, true);
  bindAttribute("a_stripY", buffers.stripY, 1, gl.FLOAT, false);
  bindAttribute("a_stripSide", buffers.stripSide, 1, gl.FLOAT, false);

  gl.bindVertexArray(null);

  // Copy index/count arrays so the renderable owns its draw metadata
  // (decoupled from the source buffer object's lifetime).
  const firstIndices = new Int32Array(buffers.firstIndices);
  const counts = new Int32Array(buffers.counts);
  const arrowCount = firstIndices.length;

  return {
    vao,
    firstIndices,
    counts,
    draw() {
      gl.bindVertexArray(vao);
      for (let a = 0; a < arrowCount; a++) {
        gl.drawArrays(gl.TRIANGLE_STRIP, firstIndices[a], counts[a]);
      }
      gl.bindVertexArray(null);
    },
  };
}
