# M3: SurfaceLIC — Multi-Pass FBO Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the C++ SurfaceLIC pipeline (`src/lib/di/algorithms/SurfaceLIC.cpp`) and its 8 LIC shaders to a 4-pass WebGL2 FBO pipeline that produces a Line Integral Convolution (LIC) image of the per-vertex direction field on the brain mesh surface. M2's arrows are temporarily hidden during M3 to focus visual UAT on the LIC alone. M4 will combine LIC + arrows.

**Architecture:** Multi-pass render pipeline using FBOs and multiple render targets:
1. **Transform pass** — render mesh into an offscreen FBO with 3 color attachments (color, vec, noise) + depth. The vec texture stores the **view-space-projected** direction, so screen-space xy can drive LIC advection.
2. **Edge pass** — full-screen quad over the depth texture, applies a Laplacian filter to detect mesh silhouettes.
3. **Advect pass** — full-screen quad iteratively integrates noise samples along the screen-space vec field (50 forward + 50 backward steps, accumulate noise, average). Output: smeared streaklines.
4. **Compose pass** — full-screen quad combines color, advected noise, depth-based halo, and edge mask into the final visible image.

**Tech Stack:** Same as M2 — TypeScript 5.x, Vite 5.x, vitest 1.x, gl-matrix 3.x, WebGL2. Plus `EXT_color_buffer_float` extension (mandatory; bail with banner if absent — required for float-format vec/noise/advect textures).

**Reference spec:** `docs/superpowers/specs/2026-05-08-directionality-indicator-web-port-design.md`
**Reference C++:** `src/lib/di/algorithms/SurfaceLIC.cpp` (lines 116–310 for prepare/render; lines 312+ for FBO/texture setup) and the 8 LIC shaders + `Shading.glsl`.

**Carryover from M1/M2 retros:**
- `npx tsc --noEmit` before EVERY commit.
- Clamp/threshold values scale with input dimensions.
- Manual interactive UAT in milestone checkpoint.
- Workers do NOT commit; lead serializes commits to avoid git index races.

---

## File Structure (created in this milestone)

```
src/
├── gfx/
│   ├── framebuffer.ts                    (NEW — FBO + MRT helper)
│   ├── framebuffer.test.ts               (NEW)
│   └── screenQuad.ts                     (NEW — fullscreen-triangle VAO)
├── algorithms/
│   ├── whiteNoise.ts                     (NEW — procedural 3D noise generator)
│   ├── whiteNoise.test.ts                (NEW)
│   └── surfaceLIC.ts                     (NEW — 4-pass orchestrator)
├── shaders/
│   ├── shading.glsl                      (NEW — minimal Phong helper, just blinnPhongIlluminationIntensityFullDiffuse)
│   ├── lic.transform.vert.glsl           (NEW)
│   ├── lic.transform.frag.glsl           (NEW)
│   ├── lic.edge.vert.glsl                (NEW — generic full-screen vert)
│   ├── lic.edge.frag.glsl                (NEW)
│   ├── lic.advect.vert.glsl              (NEW)
│   ├── lic.advect.frag.glsl              (NEW)
│   ├── lic.compose.vert.glsl             (NEW)
│   └── lic.compose.frag.glsl             (NEW)
└── app.ts                                (MODIFIED — wire LIC into render loop, hide arrows)
```

---

## Task dependency graph

```
Round 1 (parallel, 8 workers, no inter-deps):
  Task 1 (framebuffer) ─┐
  Task 2 (screenQuad)   │
  Task 3 (whiteNoise)   ├──→  Task 9 (surfaceLIC orchestrator) ──→  Task 10 (app integration) ── M3 done
  Task 4 (shading helper)
  Task 5 (transform shaders) ─┘
  Task 6 (edge shaders) ──────┘
  Task 7 (advect shaders) ────┘
  Task 8 (compose shaders) ───┘
```

Tasks 1–8 are independent and parallelizable.
Task 9 is sequential; depends on all of 1–8.
Task 10 is the integration merge.

---

## Task 1: gfx/framebuffer — FBO + MRT helper

**Files:**
- Create: `src/gfx/framebuffer.ts`
- Create: `src/gfx/framebuffer.test.ts`

Generic FBO wrapper that supports N color attachments (each with its own format) plus a depth attachment. Used by all 4 LIC passes.

- [ ] **Step 1: Implement `src/gfx/framebuffer.ts`**

```ts
export interface FramebufferAttachment {
  /** Internal format (e.g. gl.RGBA8, gl.RGBA16F, gl.RGBA32F). */
  internalFormat: number;
  /** Format (e.g. gl.RGBA). */
  format: number;
  /** Type (e.g. gl.UNSIGNED_BYTE, gl.FLOAT, gl.HALF_FLOAT). */
  type: number;
  /** Min filter (default: gl.LINEAR). */
  minFilter?: number;
  /** Mag filter (default: gl.LINEAR). */
  magFilter?: number;
  /** Wrap S (default: gl.CLAMP_TO_EDGE). */
  wrapS?: number;
  /** Wrap T (default: gl.CLAMP_TO_EDGE). */
  wrapT?: number;
  /** If true, generateMipmap will be called on the texture. */
  mipmap?: boolean;
}

export interface FramebufferSpec {
  width: number;
  height: number;
  /** Color attachments in order (gl.COLOR_ATTACHMENT0, _1, ...). */
  colors: FramebufferAttachment[];
  /** If true, attach a depth texture. */
  depth: boolean;
}

export interface Framebuffer {
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  colorTextures: WebGLTexture[];
  depthTexture: WebGLTexture | null;
  /** Bind for drawing. Sets viewport to (0, 0, width, height) and configures drawBuffers. */
  bind(): void;
  /** Resize all attachments. Re-allocates textures. */
  resize(w: number, h: number): void;
  /** Generate mipmaps on attachments that have mipmap=true. */
  generateMipmaps(): void;
}

export function createFramebuffer(
  gl: WebGL2RenderingContext,
  spec: FramebufferSpec,
): Framebuffer {
  // Verify EXT_color_buffer_float for float formats.
  const usesFloat = spec.colors.some((c) => c.type === gl.FLOAT || c.type === gl.HALF_FLOAT);
  if (usesFloat && !gl.getExtension("EXT_color_buffer_float")) {
    throw new Error("EXT_color_buffer_float not supported — cannot create float-format FBO");
  }

  const fbo = gl.createFramebuffer();
  if (!fbo) throw new Error("createFramebuffer failed");

  let colorTextures: WebGLTexture[] = [];
  let depthTexture: WebGLTexture | null = null;

  function allocate(width: number, height: number): void {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

    // Free old textures.
    for (const t of colorTextures) gl.deleteTexture(t);
    if (depthTexture) gl.deleteTexture(depthTexture);
    colorTextures = [];
    depthTexture = null;

    spec.colors.forEach((c, i) => {
      const tex = gl.createTexture();
      if (!tex) throw new Error(`createTexture failed for color attachment ${i}`);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, c.internalFormat, width, height, 0, c.format, c.type, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, c.minFilter ?? gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, c.magFilter ?? gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, c.wrapS ?? gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, c.wrapT ?? gl.CLAMP_TO_EDGE);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, tex, 0);
      colorTextures.push(tex);
    });

    if (spec.depth) {
      const dtex = gl.createTexture();
      if (!dtex) throw new Error("createTexture failed for depth attachment");
      gl.bindTexture(gl.TEXTURE_2D, dtex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT32F, width, height, 0, gl.DEPTH_COMPONENT, gl.FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, dtex, 0);
      depthTexture = dtex;
    }

    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error(`Framebuffer incomplete: 0x${status.toString(16)}`);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  allocate(spec.width, spec.height);

  const fb: Framebuffer = {
    fbo,
    get width() { return spec.width; },
    get height() { return spec.height; },
    get colorTextures() { return colorTextures; },
    get depthTexture() { return depthTexture; },
    bind() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, spec.width, spec.height);
      const draws = spec.colors.map((_, i) => gl.COLOR_ATTACHMENT0 + i);
      gl.drawBuffers(draws);
    },
    resize(w, h) {
      spec.width = w;
      spec.height = h;
      allocate(w, h);
    },
    generateMipmaps() {
      spec.colors.forEach((c, i) => {
        if (c.mipmap) {
          gl.bindTexture(gl.TEXTURE_2D, colorTextures[i]);
          gl.generateMipmap(gl.TEXTURE_2D);
        }
      });
      if (spec.depth && depthTexture) {
        gl.bindTexture(gl.TEXTURE_2D, depthTexture);
        gl.generateMipmap(gl.TEXTURE_2D);
      }
    },
  };

  return fb;
}
```

- [ ] **Step 2: Implement `src/gfx/framebuffer.test.ts`**

A unit test for FBO creation requires a WebGL2 context. Browsers and node lack one without jsdom + headless GL bindings. Skip unit tests for this file — exercised by Task 9's integration. (Document the decision in the test file as a comment-only stub so future workers know it's intentional.)

```ts
// Intentionally empty — framebuffer.ts is exercised by integration in Task 9.
// Adding jsdom + headless-gl just for FBO creation tests would add ~50MB of
// dependencies for limited value. If a regression appears, add a focused
// integration test that boots a WebGL2 context and creates a sample FBO.
import { describe, it } from "vitest";

describe("framebuffer", () => {
  it.skip("FBO creation requires a WebGL2 context (covered by integration)", () => {});
});
```

- [ ] **Step 3: Type check**

```bash
cd web && npx tsc --noEmit
```
Expected: clean.

(No commit; lead serializes.)

---

## Task 2: gfx/screenQuad — full-screen triangle helper

**Files:**
- Create: `src/gfx/screenQuad.ts`

A single fullscreen triangle (covers the screen with one tri using `gl_VertexID`-style trickery; cheaper than two-tri quad).

- [ ] **Step 1: Implement `src/gfx/screenQuad.ts`**

```ts
/**
 * Create a VAO that draws a full-screen triangle with gl.drawArrays(gl.TRIANGLES, 0, 3).
 * The triangle's three corners are at (-1,-1), (3,-1), (-1,3) — covers the [-1,1]² screen
 * with one vertex per corner. Single tri is cheaper than a 2-tri quad and avoids the
 * diagonal seam that can introduce subtle interpolation artifacts.
 *
 * The vertex shader for full-screen passes should:
 *   in vec2 a_position;
 *   out vec2 v_texCoord;
 *   void main() { gl_Position = vec4(a_position, 0.0, 1.0); v_texCoord = a_position * 0.5 + 0.5; }
 */
export function createScreenQuad(
  gl: WebGL2RenderingContext,
  attribLocation: number,
): WebGLVertexArrayObject {
  if (attribLocation < 0) throw new Error("screenQuad: a_position attribute not found in program");
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("createVertexArray failed for screenQuad");
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  if (!vbo) throw new Error("createBuffer failed for screenQuad");
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(attribLocation);
  gl.vertexAttribPointer(attribLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  return vao;
}
```

(No commit.)

---

## Task 3: algorithms/whiteNoise — procedural 3D noise generator

**Files:**
- Create: `src/algorithms/whiteNoise.ts`
- Create: `src/algorithms/whiteNoise.test.ts`

The original C++ uses a 3D white-noise texture sampled by world-space position (normalized by mesh BB). Generate it on CPU with a deterministic seed, upload to a `gl.TEXTURE_3D`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { generateWhiteNoise3D } from "./whiteNoise";

describe("generateWhiteNoise3D", () => {
  it("produces deterministic output for the same seed", () => {
    const a = generateWhiteNoise3D(8, 8, 8, 42);
    const b = generateWhiteNoise3D(8, 8, 8, 42);
    expect(a.length).toBe(8 * 8 * 8);
    expect(Array.from(a)).toEqual(Array.from(b));
  });

  it("produces different output for different seeds", () => {
    const a = generateWhiteNoise3D(8, 8, 8, 42);
    const b = generateWhiteNoise3D(8, 8, 8, 43);
    let differences = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) differences++;
    expect(differences).toBeGreaterThan(a.length * 0.5);
  });

  it("output values span the full byte range", () => {
    const a = generateWhiteNoise3D(16, 16, 16, 1);
    let min = 255, max = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] < min) min = a[i];
      if (a[i] > max) max = a[i];
    }
    expect(min).toBeLessThan(20);
    expect(max).toBeGreaterThan(235);
  });
});
```

- [ ] **Step 2: Implement `src/algorithms/whiteNoise.ts`**

```ts
/**
 * Mulberry32: small, fast, deterministic seedable PRNG.
 * Returns a function that yields a 32-bit unsigned int per call.
 */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (t ^ (t >>> 14)) >>> 0;
  };
}

/**
 * Generate a 3D R8 (single-channel byte) noise volume.
 * Output length = width * height * depth, stored in row-major (x fastest, z slowest).
 */
export function generateWhiteNoise3D(width: number, height: number, depth: number, seed: number): Uint8Array {
  const rand = mulberry32(seed);
  const out = new Uint8Array(width * height * depth);
  for (let i = 0; i < out.length; i++) out[i] = rand() & 0xff;
  return out;
}
```

- [ ] **Step 3: Run test + typecheck**

```bash
cd web && npm test -- src/algorithms/whiteNoise.test.ts
cd web && npx tsc --noEmit
```
Expected: 3 tests pass; tsc clean.

---

## Task 4: shading.glsl helper (minimal Phong)

**Files:**
- Create: `src/shaders/shading.glsl`

Only needed function: `blinnPhongIlluminationIntensityFullDiffuse(vec3 normal)`. The original Shading.glsl is 230 lines; we port only what Transform actually calls.

- [ ] **Step 1: Create `src/shaders/shading.glsl`**

```glsl
// Minimal port of Shading.glsl from the original C++ project.
// Only blinnPhongIlluminationIntensityFullDiffuse is exposed — that is the only
// function the Transform fragment shader uses.

float blinnPhongIlluminationIntensityFullDiffuse(in vec3 normal) {
  // Default light: ambient=0, diffuse=1, specular=1, shininess=250.
  // Light direction: world +z (eye direction in view space).
  // Material: ambient=0, diffuse=1, specular=1.
  vec3 L = vec3(0.0, 0.0, 1.0);
  float diffuse = max(dot(normal, L), 0.0);
  // Halfway-vector specular (Blinn).
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);
  float specBase = max(dot(normal, H), 0.0);
  float specular = pow(specBase, 250.0);
  return diffuse + specular;
}
```

NOTE: this file is a chunk of GLSL meant to be string-concatenated with the Transform fragment source by the host code. It does NOT have a `#version` line — the Transform fragment will include it via `?raw` import and prepend it before its own body.

(No commit.)

---

## Task 5: lic.transform shaders

**Files:**
- Create: `src/shaders/lic.transform.vert.glsl`
- Create: `src/shaders/lic.transform.frag.glsl`

Vertex shader: project vertex to screen, project direction vector to view-space (so its xy can drive screen-space advection later), compute 3D noise lookup coord from world-space position normalized by mesh bounding box.

- [ ] **Step 1: Create `src/shaders/lic.transform.vert.glsl`**

```glsl
#version 300 es
precision highp float;

in vec3 a_position;
in vec3 a_normal;
in vec4 a_color;
in vec3 a_vector;

uniform mat4 u_view;
uniform mat4 u_projection;
uniform vec3 u_meshBBMin;
uniform vec3 u_meshBBMax;

out vec4 v_color;
out vec3 v_normalView;
out vec3 v_vectorView;
out vec3 v_noiseCoord;

void main() {
  v_color = a_color;
  v_vectorView = (u_view * vec4(a_vector, 0.0)).xyz;
  v_normalView = (u_view * vec4(a_normal, 0.0)).xyz;
  v_noiseCoord = 2.0 * (a_position - u_meshBBMin) / (u_meshBBMax - u_meshBBMin);
  gl_Position = u_projection * u_view * vec4(a_position, 1.0);
}
```

- [ ] **Step 2: Create `src/shaders/lic.transform.frag.glsl`**

```glsl
#version 300 es
precision highp float;
precision highp sampler3D;

in vec4 v_color;
in vec3 v_normalView;
in vec3 v_vectorView;
in vec3 v_noiseCoord;

uniform sampler3D u_noiseSampler;

layout(location = 0) out vec4 fragColor;
layout(location = 1) out vec4 fragVec;
layout(location = 2) out vec4 fragNoise;

// FN_PROVIDED_BY_HOST: blinnPhongIlluminationIntensityFullDiffuse
// (host code prepends shading.glsl before this body)
float blinnPhongIlluminationIntensityFullDiffuse(in vec3 normal);

void main() {
  float noise = texture(u_noiseSampler, v_noiseCoord).r;
  float light = blinnPhongIlluminationIntensityFullDiffuse(normalize(v_normalView));

  fragColor = vec4(light * v_color.rgb, 1.0);
  fragVec = vec4(v_vectorView, 1.0); // alpha=1 marks "inside mesh"; outside stays 0 from FBO clear
  fragNoise = vec4(vec3(noise), 1.0);
}
```

(No commit.)

---

## Task 6: lic.edge shaders

**Files:**
- Create: `src/shaders/lic.edge.vert.glsl`
- Create: `src/shaders/lic.edge.frag.glsl`

Generic full-screen vert + Laplacian on depth.

- [ ] **Step 1: Create `src/shaders/lic.edge.vert.glsl`**

```glsl
#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
```

- [ ] **Step 2: Create `src/shaders/lic.edge.frag.glsl`**

```glsl
#version 300 es
precision highp float;

uniform sampler2D u_depthSampler;
uniform vec2 u_viewportSize;

in vec2 v_texCoord;
out vec4 fragEdge;

void main() {
  ivec2 texel = ivec2(int(u_viewportSize.x * v_texCoord.x),
                      int(u_viewportSize.y * v_texCoord.y));
  float c = texelFetch(u_depthSampler, texel, 0).r;
  float l = texelFetch(u_depthSampler, texel + ivec2(-1, 0), 0).r;
  float r = texelFetch(u_depthSampler, texel + ivec2( 1, 0), 0).r;
  float t = texelFetch(u_depthSampler, texel + ivec2( 0, 1), 0).r;
  float b = texelFetch(u_depthSampler, texel + ivec2( 0,-1), 0).r;
  // Standard Laplacian on a cross-shaped 5-tap kernel; same as the C++ shader.
  float lap = 10.0 * abs(t + l - 4.0 * c + r + b);
  fragEdge = vec4(lap, c, 0.0, 1.0); // r=edge, g=depth-passthrough
}
```

(No commit.)

---

## Task 7: lic.advect shaders

**Files:**
- Create: `src/shaders/lic.advect.vert.glsl`
- Create: `src/shaders/lic.advect.frag.glsl`

Same generic full-screen vert. Fragment iteratively walks 50 steps forward + 50 backward along the screen-space vec field, sampling noise.

- [ ] **Step 1: Create `src/shaders/lic.advect.vert.glsl`**

```glsl
#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
```

- [ ] **Step 2: Create `src/shaders/lic.advect.frag.glsl`**

Direct port of `LICAdvect-fragment.glsl` (lines 27–189). Single-source vec lookup, forward + backward Euler integration, accumulate noise samples, average.

```glsl
#version 300 es
precision highp float;

uniform sampler2D u_depthSampler;
uniform sampler2D u_noiseSampler;
uniform sampler2D u_vecSampler;
uniform sampler2D u_edgeSampler;

uniform vec2 u_viewportSize;
uniform vec2 u_viewportScale;
uniform float u_noiseRatio;
uniform int u_numIter;

in vec2 v_texCoord;
out vec4 fragAdvect;

vec2 getVec(in vec2 pos, out float len) {
  vec2 vec = texture(u_vecSampler, pos).rg;
  len = length(vec);
  return len > 1e-6 ? vec / len : vec2(0.0);
}

float outside(in vec2 pos) {
  return 1.0 - texture(u_vecSampler, pos).a;
}

float getNoise(in vec2 pos) {
  return texture(u_noiseSampler, pos).r;
}

void main() {
  vec2 texel = v_texCoord;
  float offsetX = u_viewportScale.x * (1.0 / u_viewportSize.x);
  float offsetY = u_viewportScale.y * (1.0 / u_viewportSize.y);

  float vecLen = 0.0;
  vec2 vec = getVec(texel, vecLen);
  if (vecLen < 1e-4) {
    fragAdvect = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  // Forward and backward streamline integration.
  vec2 lastVec1 = vec;
  vec2 lastPos1 = texel;
  vec2 lastVec2 = vec;
  vec2 lastPos2 = texel;
  float sum = 0.0;
  int m = 0;
  float scaler1 = 1.0;
  float scaler2 = 1.0;

  for (int i = 0; i < u_numIter; ++i) {
    vec2 newPos1 = lastPos1 + vec2(lastVec1.x * offsetX, lastVec1.y * offsetY);
    vec2 newPos2 = lastPos2 - vec2(lastVec2.x * offsetX, lastVec2.y * offsetY);

    float vecLen1 = 0.0, vecLen2 = 0.0;
    vec2 newVec1 = getVec(newPos1, vecLen1);
    vec2 newVec2 = -getVec(newPos2, vecLen2);

    if (vecLen1 < 1e-4) break;
    if (vecLen2 < 1e-4) break;

    sum += scaler1 * getNoise(newPos1);
    sum += scaler2 * getNoise(newPos2);
    m += int(scaler1) + int(scaler2);

    if (outside(newPos1) > 0.0) scaler1 = 0.0;
    if (outside(newPos2) > 0.0) scaler2 = 0.0;

    lastPos1 = newPos1; lastVec1 = newVec1;
    lastPos2 = newPos2; lastVec2 = newVec2;
  }

  float n = m > 0 ? sum / float(m) : 0.0;
  fragAdvect = vec4(vec3(n * (1.0 - u_noiseRatio) + getNoise(texel) * u_noiseRatio), 1.0);
}
```

(No commit.)

---

## Task 8: lic.compose shaders

**Files:**
- Create: `src/shaders/lic.compose.vert.glsl`
- Create: `src/shaders/lic.compose.frag.glsl`

Final composite. Color + advect (high-contrast) + depth halo + edge mask → screen.

- [ ] **Step 1: Create `src/shaders/lic.compose.vert.glsl`**

```glsl
#version 300 es
precision highp float;

in vec2 a_position;
out vec2 v_texCoord;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_texCoord = a_position * 0.5 + 0.5;
}
```

- [ ] **Step 2: Create `src/shaders/lic.compose.frag.glsl`**

```glsl
#version 300 es
precision highp float;

uniform sampler2D u_colorSampler;
uniform sampler2D u_vecSampler;
uniform sampler2D u_depthSampler;
uniform sampler2D u_edgeSampler;
uniform sampler2D u_advectSampler;
uniform bool u_useHighContrast;

in vec2 v_texCoord;
out vec4 fragColor;

void main() {
  vec4 color = texture(u_colorSampler, v_texCoord);
  float edge = texture(u_edgeSampler, v_texCoord).r;
  float advect = texture(u_advectSampler, v_texCoord).r;

  // Depth halo from multi-LOD depth difference (matches the C++ Compose).
  float depthLodMost = textureLod(u_depthSampler, v_texCoord, 5.0).r;
  float depthLodMore = textureLod(u_depthSampler, v_texCoord, 3.0).r;
  float depthLodLess = texture(u_depthSampler, v_texCoord).r;

  float depthHalo2 = 5.0 * (depthLodLess - depthLodMost);
  depthHalo2 = 1.0 - depthHalo2;
  depthHalo2 = depthHalo2 * depthHalo2 * depthHalo2 * depthHalo2 * depthHalo2;
  depthHalo2 = min(1.0, depthHalo2);
  float depthHalo = smoothstep(0.2, 1.0, depthHalo2) * smoothstep(0.5, 1.0, depthHalo2);

  float contrastingS = u_useHighContrast ? 9.0 : 2.5;
  float contrastingP = u_useHighContrast ? 4.0 : 2.5;
  vec3 plainColor = mix(color.rgb, vec3(contrastingS * pow(advect, contrastingP)), 0.4);

  vec4 col = vec4(
    depthHalo * mix(plainColor, vec3(0.5), edge),
    color.a
  );

  fragColor = col;
  gl_FragDepth = texture(u_depthSampler, v_texCoord).r;
}
```

(No commit.)

---

## Task 9: surfaceLIC orchestrator

**Files:**
- Create: `src/algorithms/surfaceLIC.ts`

Builds the FBOs, programs, and exposes a single `render(view, mesh, camera)` function that runs the 4 passes.

- [ ] **Step 1: Implement `src/algorithms/surfaceLIC.ts`**

```ts
import { mat4, vec3 } from "gl-matrix";
import { linkProgram, type ShaderProgram } from "../gfx/program";
import { createFramebuffer, type Framebuffer } from "../gfx/framebuffer";
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
}

export interface SurfaceLIC {
  /** Run all 4 passes. Final pass writes to whichever FB is bound on entry. */
  render(input: SurfaceLICInput, view: mat4, projection: mat4, viewportW: number, viewportH: number): void;
  /** Resize internal FBOs to match a new viewport. */
  resize(width: number, height: number): void;
  /** Attribute locations of the transform program — needed to build the mesh VAO. */
  transformAttribs: Map<string, number>;
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
  // Transform: 3 color attachments (color RGBA8, vec RGBA16F, noise R8) + depth.
  let transformFBO = createFramebuffer(gl, {
    width: initialWidth, height: initialHeight,
    colors: [
      { internalFormat: gl.RGBA8, format: gl.RGBA, type: gl.UNSIGNED_BYTE },
      { internalFormat: gl.RGBA16F, format: gl.RGBA, type: gl.HALF_FLOAT },
      { internalFormat: gl.R8, format: gl.RED, type: gl.UNSIGNED_BYTE },
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

  // 3D noise texture (16³ R8). Sampled by world-space pos → seamless across mesh.
  const noiseSize = 16;
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
    gl.uniform1i(advectProgram.uniforms.get("u_numIter")!, 50);
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
    gl.uniform1i(composeProgram.uniforms.get("u_useHighContrast")!, 1);
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

  return { render, resize, transformAttribs: transformProgram.attribs };
}
```

(No commit.)

---

## Task 10: app.ts integration

**Files:**
- Modify: `src/app.ts`
- Modify: `src/shaders/mesh.vert.glsl` (add `a_vector` attribute, pass-through)
- Modify: `src/shaders/mesh.frag.glsl` (no change — but the mesh program is replaced by the LIC pipeline in the render loop)

The LIC pipeline replaces the simple mesh draw. The mesh VAO needs an additional attribute (`a_vector` per-vertex direction, an input that LIC's Transform pass requires).

Since the existing mesh shader doesn't use `a_vector`, the cleanest path is to **build a separate mesh VAO for the LIC pipeline** that includes the vector attribute. The M2 mesh VAO can be left in place or removed — for M3, it's removed and replaced by the LIC render. Arrows are temporarily disabled (commented out, not deleted — M4 reactivates them).

- [ ] **Step 1: Replace `src/app.ts` with the M3 version**

```ts
import { vec3 } from "gl-matrix";
import { createView, showBanner } from "./gfx/view";
import { createTrackball } from "./gfx/camera";
import { createMeshVAO, type AttribDef } from "./gfx/buffer";
import { parsePly } from "./io/plyReader";
import { parseLabels } from "./io/labelReader";
import { parseLabelOrder } from "./io/labelOrderReader";
import { buildVertexColors } from "./algorithms/regionColors";
import { buildMeshAdjacency } from "./algorithms/meshAdjacency";
import { computeVertexNormals } from "./algorithms/computeNormals";
import { extractRegions } from "./algorithms/extractRegions";
import { createSurfaceLIC } from "./algorithms/surfaceLIC";
// M2 arrow imports kept commented out — M4 reactivates.
// import { seedArrows } from "./algorithms/seedArrows";
// import { createArrowRenderable } from "./algorithms/renderArrows";

async function fetchText(url: string): Promise<string> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Fetch failed ${url}: ${r.status} ${r.statusText}`);
  return r.text();
}

function meshBounds(vertices: Float32Array): { center: vec3; radius: number; bbMin: vec3; bbMax: vec3 } {
  const bbMin = vec3.fromValues(Infinity, Infinity, Infinity);
  const bbMax = vec3.fromValues(-Infinity, -Infinity, -Infinity);
  const center = vec3.fromValues(0, 0, 0);
  const n = vertices.length / 3;
  for (let i = 0; i < n; i++) {
    const x = vertices[i * 3 + 0], y = vertices[i * 3 + 1], z = vertices[i * 3 + 2];
    if (x < bbMin[0]) bbMin[0] = x; if (x > bbMax[0]) bbMax[0] = x;
    if (y < bbMin[1]) bbMin[1] = y; if (y > bbMax[1]) bbMax[1] = y;
    if (z < bbMin[2]) bbMin[2] = z; if (z > bbMax[2]) bbMax[2] = z;
    center[0] += x; center[1] += y; center[2] += z;
  }
  vec3.scale(center, center, 1 / n);
  let r2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = vertices[i * 3 + 0] - center[0];
    const dy = vertices[i * 3 + 1] - center[1];
    const dz = vertices[i * 3 + 2] - center[2];
    r2 = Math.max(r2, dx * dx + dy * dy + dz * dz);
  }
  return { center, radius: Math.sqrt(r2), bbMin, bbMax };
}

export async function runApp(container: HTMLElement): Promise<void> {
  const view = createView(container);
  const gl = view.gl;

  // Fail fast if EXT_color_buffer_float is unavailable — surfaceLIC needs float FBO attachments.
  if (!gl.getExtension("EXT_color_buffer_float")) {
    showBanner("Your browser does not support EXT_color_buffer_float; LIC requires it.");
    return;
  }

  const [plyText, labelsText, orderText] = await Promise.all([
    fetchText("/data/label34.ply"),
    fetchText("/data/label34.labels"),
    fetchText("/data/label34.labelorder"),
  ]);

  const mesh = parsePly(plyText);
  const labels = parseLabels(labelsText);
  const order = parseLabelOrder(orderText);
  if (labels.length !== mesh.vertices.length / 3) {
    throw new Error(
      `Vertex count mismatch: mesh ${mesh.vertices.length / 3} vs labels ${labels.length}`,
    );
  }

  const colors = buildVertexColors(labels, order);
  const normals = computeVertexNormals(mesh.vertices, mesh.indices);
  const adjacency = buildMeshAdjacency(mesh.indices, mesh.vertices.length / 3);
  const directions = extractRegions({
    vertices: mesh.vertices,
    indices: mesh.indices,
    labels,
    labelOrder: order,
    adjacency,
    normals,
    switchDirection: true,
  });

  const bounds = meshBounds(mesh.vertices);

  const surfaceLIC = createSurfaceLIC(gl, view.width || 1, view.height || 1);

  // Build the mesh VAO using attribute locations exposed by the LIC transform program.
  // Names match lic.transform.vert.glsl: a_position, a_normal, a_color, a_vector.
  const tAttribs = surfaceLIC.transformAttribs;
  const meshGL = createMeshVAO(
    gl,
    [
      { def: { name: "a_position", data: mesh.vertices, size: 3, type: gl.FLOAT, normalized: false } as AttribDef,
        location: tAttribs.get("a_position") ?? -1 },
      { def: { name: "a_normal", data: normals, size: 3, type: gl.FLOAT, normalized: false } as AttribDef,
        location: tAttribs.get("a_normal") ?? -1 },
      { def: { name: "a_color", data: colors, size: 4, type: gl.UNSIGNED_BYTE, normalized: true } as AttribDef,
        location: tAttribs.get("a_color") ?? -1 },
      { def: { name: "a_vector", data: directions, size: 3, type: gl.FLOAT, normalized: false } as AttribDef,
        location: tAttribs.get("a_vector") ?? -1 },
    ],
    mesh.indices,
  );

  const camera = createTrackball();
  camera.fitSphere(bounds.center, bounds.radius);

  view.onResize(() => {
    camera.resize(view.width, view.height);
    surfaceLIC.resize(view.width, view.height);
    view.requestRender();
  });
  camera.attach(view.canvas, () => view.requestRender());
  camera.resize(view.width, view.height);
  surfaceLIC.resize(view.width, view.height);

  view.onRender(() => {
    gl.clearColor(0.07, 0.07, 0.07, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    surfaceLIC.render(
      {
        meshVAO: meshGL.vao,
        meshIndexCount: meshGL.indexCount,
        meshIndexType: meshGL.indexType,
        meshBBMin: bounds.bbMin,
        meshBBMax: bounds.bbMax,
      },
      camera.view,
      camera.projection,
      view.width,
      view.height,
    );
  });

  view.requestRender();
}
```

NOTE: Task 9's `createSurfaceLIC` returns `transformAttribs: Map<string, number>` — use those locations when building the mesh VAO. This sidesteps any attribute-location mismatch between the program and the VAO.

- [ ] **Step 2: Verify**

```bash
cd web && npm test
cd web && npx tsc --noEmit
```
Expected: tests pass; tsc clean.

- [ ] **Step 3: Manual UAT**

Refresh `http://localhost:5173`. Expected:
- Brain mesh visible.
- LIC streaklines smeared across the surface, following the per-region directionality field.
- Edge silhouettes darker than interior.
- Arrows NOT visible (M3 hides them; M4 brings them back).
- Camera rotate/zoom works.
- No console errors.

If the EXT_color_buffer_float extension is missing, you should see an explicit error banner — that's expected behavior, not a bug.

(No commit; lead serializes.)

---

## Done

M3 ships when refresh shows the brain mesh with visible LIC streaklines following the directionality field, with all M1/M2 camera interaction intact and no arrows showing yet.

**What is NOT in M3 and arrives in M4:**
- Reintroduce arrows on top of the LIC.
- Tune the Compose pass for the final mixed look.
- Side-by-side compare against the original C++ output.
