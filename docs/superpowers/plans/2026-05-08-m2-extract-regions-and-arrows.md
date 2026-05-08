# M2: ExtractRegions + Per-Vertex Direction Field + Flat-Quad Arrows — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the C++ `ExtractRegions` algorithm (Case 2: labelOrder-driven) to derive a per-vertex 3D direction field on the brain mesh, then render that field as oriented flat-quad arrows on top of the existing M1 mesh render. No LIC underlay (deferred to M3).

**Architecture:** Three new pure-data modules (`meshAdjacency`, `computeNormals`, `extractRegions`) computed once at startup, plus a sparse `seedArrows` step that picks which vertices get arrows. Arrows are rendered as **instanced unit quads** with per-instance attributes (position, direction, normal, color); the vertex shader expands each instance into an oriented 3D quad using the same tangent/binormal/scale math the original C++ geometry shader uses. Fragment shader replicates the parametric arrow shape from `RenderIllustrativeLines-Arrows-fragment.glsl`. No FBO/G-buffer indirection in M2 — arrows read per-instance attributes directly. M3 will introduce FBO infrastructure when LIC needs it.

**Tech Stack:** Same as M1 — TypeScript 5.x, Vite 5.x, vitest 1.x, gl-matrix 3.x, WebGL2.

**Reference spec:** `docs/superpowers/specs/2026-05-08-directionality-indicator-web-port-design.md`
**Reference C++:**
- `src/lib/di/algorithms/ExtractRegions.cpp` (Case 2, lines ~224–620)
- `src/lib/di/algorithms/shaders/RenderIllustrativeLines-Arrows-geometry.glsl` (default-mode quad emission, lines 148–209)
- `src/lib/di/algorithms/shaders/RenderIllustrativeLines-Arrows-fragment.glsl` (parametric arrow shape)
- `src/lib/di/algorithms/RenderIllustrativeLines.cpp` (parameter defaults)

**Carryover from M1 retrospective** (`memory/project_m1_retro.md`):
- **Run `npx tsc --noEmit` before EVERY commit**, not just at the end. Vite's esbuild does not enforce strict TS.
- Any clamp/threshold values that depend on data dimensions (mesh size, viewport, etc.) must scale with input. No hardcoded constants like `100`.
- Document direction conventions for any input handling. Default to industry-standard 3D-viewer convention.
- For GPU/visualization code, include manual interactive UAT in the milestone checkpoint.

---

## File Structure (created in this milestone)

```
src/
├── algorithms/
│   ├── meshAdjacency.ts                  (NEW)
│   ├── meshAdjacency.test.ts             (NEW)
│   ├── computeNormals.ts                 (NEW)
│   ├── computeNormals.test.ts            (NEW)
│   ├── extractRegions.ts                 (NEW)
│   ├── extractRegions.test.ts            (NEW)
│   ├── seedArrows.ts                     (NEW)
│   ├── seedArrows.test.ts                (NEW)
│   └── renderArrows.ts                   (NEW; gfx-style host code, lives in algorithms/ to mirror C++ layout)
├── shaders/
│   ├── arrow.vert.glsl                   (NEW)
│   ├── arrow.frag.glsl                   (NEW)
│   ├── mesh.vert.glsl                    (MODIFIED — accept per-vertex normal attribute)
│   └── mesh.frag.glsl                    (MODIFIED — Lambert from real normal instead of dFdx/dFdy)
├── app.ts                                (MODIFIED — wire up extractRegions + arrow render)
└── shared/
    └── types.ts                          (NEW; shared types for algorithm outputs)
```

---

## Task dependency graph

```
Task 1 (meshAdjacency) ─┐
Task 2 (computeNormals) ┼─ both feed → Task 5 (extractRegions) ─┐
Task 3 (arrow shaders)  │                                       ├─ Task 7 (app integration) ── M2 done
Task 4 (renderArrows)   │              Task 6 (seedArrows) ─────┘
                        └── upgrade mesh shaders (Task 7a) ──────┘
```

Tasks 1–4 are independent and parallelizable (fan-out targets per `feedback_milestone_dispatch.md`).
Tasks 5–6 are sequential after 1–2 complete.
Task 7 is the integration merge.

---

## Task 1: Mesh adjacency (vertex → neighbours)

**Files:**
- Create: `src/algorithms/meshAdjacency.ts`
- Create: `src/algorithms/meshAdjacency.test.ts`

ExtractRegions repeatedly asks "for vertex V, what are its neighbour vertices?" — i.e., vertices sharing an edge with V. Build this lookup once from the index buffer.

- [ ] **Step 1: Write the failing test `src/algorithms/meshAdjacency.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { buildMeshAdjacency } from "./meshAdjacency";

describe("buildMeshAdjacency", () => {
  it("returns vertex neighbours for a single triangle", () => {
    // Triangle with vertices 0, 1, 2.
    const indices = new Uint32Array([0, 1, 2]);
    const adj = buildMeshAdjacency(indices, 3);
    expect(new Set(adj.neighbours(0))).toEqual(new Set([1, 2]));
    expect(new Set(adj.neighbours(1))).toEqual(new Set([0, 2]));
    expect(new Set(adj.neighbours(2))).toEqual(new Set([0, 1]));
  });

  it("merges shared edges across two triangles", () => {
    // Quad: triangles (0,1,2) and (0,2,3) — vertex 0 connects to 1, 2, 3.
    const indices = new Uint32Array([0, 1, 2, 0, 2, 3]);
    const adj = buildMeshAdjacency(indices, 4);
    expect(new Set(adj.neighbours(0))).toEqual(new Set([1, 2, 3]));
    expect(new Set(adj.neighbours(2))).toEqual(new Set([0, 1, 3]));
  });

  it("excludes the vertex itself from its neighbour list", () => {
    const indices = new Uint32Array([0, 1, 2]);
    const adj = buildMeshAdjacency(indices, 3);
    expect(adj.neighbours(0)).not.toContain(0);
  });

  it("isolated vertices have empty neighbour lists", () => {
    const indices = new Uint32Array([0, 1, 2]);
    const adj = buildMeshAdjacency(indices, 5); // verts 3, 4 unused
    expect(adj.neighbours(3)).toEqual([]);
    expect(adj.neighbours(4)).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && npm test -- src/algorithms/meshAdjacency.test.ts
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/algorithms/meshAdjacency.ts`**

```ts
export interface MeshAdjacency {
  /** Returns the unique vertex IDs sharing an edge with `vertexID` (excluding `vertexID` itself). */
  neighbours(vertexID: number): number[];
  /** Total vertex count this adjacency was built for. */
  readonly vertexCount: number;
}

/**
 * Build vertex-to-neighbour adjacency from a triangle index buffer.
 * For each triangle (a, b, c), the three pairs (a,b), (a,c), (b,c) are recorded as edges.
 * Each vertex's neighbour list is deduplicated.
 *
 * Cost: O(triangles + edges). Memory: ~6 × triangles entries before dedup.
 */
export function buildMeshAdjacency(
  indices: Uint32Array | Uint16Array,
  vertexCount: number,
): MeshAdjacency {
  const neighbourSets: Set<number>[] = new Array(vertexCount);
  for (let i = 0; i < vertexCount; i++) neighbourSets[i] = new Set<number>();

  const triangleCount = indices.length / 3;
  for (let t = 0; t < triangleCount; t++) {
    const a = indices[t * 3 + 0];
    const b = indices[t * 3 + 1];
    const c = indices[t * 3 + 2];
    neighbourSets[a].add(b); neighbourSets[a].add(c);
    neighbourSets[b].add(a); neighbourSets[b].add(c);
    neighbourSets[c].add(a); neighbourSets[c].add(b);
  }

  // Materialize as plain arrays for fast iteration in hot paths.
  const neighbourArrays: number[][] = neighbourSets.map((s) => Array.from(s));

  return {
    vertexCount,
    neighbours(vertexID: number): number[] {
      return neighbourArrays[vertexID] ?? [];
    },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd web && npm test -- src/algorithms/meshAdjacency.test.ts
```
Expected: PASS, 4 tests.

- [ ] **Step 5: Type check before commit**

```bash
cd web && npx tsc --noEmit
```
Expected: no output (clean).

- [ ] **Step 6: Commit**

```bash
git add src/algorithms/meshAdjacency.ts src/algorithms/meshAdjacency.test.ts
git commit -m "[ADD] meshAdjacency: vertex-to-neighbours lookup from triangle indices"
```

---

## Task 2: Per-vertex normals (area-weighted from face normals)

**Files:**
- Create: `src/algorithms/computeNormals.ts`
- Create: `src/algorithms/computeNormals.test.ts`

The PLY parser returns `normals: null` (the demo PLY has no normals). Derive per-vertex normals as the area-weighted sum of incident face normals, then normalize.

- [ ] **Step 1: Write the failing test `src/algorithms/computeNormals.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { computeVertexNormals } from "./computeNormals";

function approx(a: number, b: number, eps = 1e-5): boolean {
  return Math.abs(a - b) < eps;
}

describe("computeVertexNormals", () => {
  it("computes outward normals for a single XY-plane triangle (CCW winding)", () => {
    // Triangle in z=0 plane, CCW from +z view → normal should be (0, 0, 1).
    const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
    const indices = new Uint32Array([0, 1, 2]);
    const normals = computeVertexNormals(vertices, indices);
    expect(normals.length).toBe(9);
    for (let v = 0; v < 3; v++) {
      expect(approx(normals[v * 3 + 0], 0)).toBe(true);
      expect(approx(normals[v * 3 + 1], 0)).toBe(true);
      expect(approx(normals[v * 3 + 2], 1)).toBe(true);
    }
  });

  it("normalizes each vertex normal to unit length", () => {
    // Two triangles sharing an edge — vertex 0 belongs to both.
    const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0]);
    const indices = new Uint32Array([0, 1, 2, 1, 3, 2]);
    const normals = computeVertexNormals(vertices, indices);
    for (let v = 0; v < 4; v++) {
      const x = normals[v * 3 + 0], y = normals[v * 3 + 1], z = normals[v * 3 + 2];
      const len = Math.sqrt(x * x + y * y + z * z);
      expect(approx(len, 1)).toBe(true);
    }
  });

  it("isolated vertex receives a zero normal (no contributing triangles)", () => {
    const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 5, 5, 5]);
    const indices = new Uint32Array([0, 1, 2]); // vertex 3 unused
    const normals = computeVertexNormals(vertices, indices);
    expect(normals[9]).toBe(0);
    expect(normals[10]).toBe(0);
    expect(normals[11]).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && npm test -- src/algorithms/computeNormals.test.ts
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/algorithms/computeNormals.ts`**

```ts
/**
 * Compute per-vertex normals as the area-weighted sum of incident face normals.
 *
 * Triangle face normal = (b-a) × (c-a). Its magnitude is 2 × triangle area, so by
 * NOT normalizing the face normal before accumulating, larger triangles automatically
 * contribute proportionally more — this is the standard area-weighted formulation.
 * Final per-vertex normals are then normalized to unit length.
 *
 * Vertices with no incident triangles get (0, 0, 0).
 */
export function computeVertexNormals(
  vertices: Float32Array,
  indices: Uint32Array | Uint16Array,
): Float32Array {
  const vertexCount = vertices.length / 3;
  const out = new Float32Array(vertexCount * 3);

  const triangleCount = indices.length / 3;
  for (let t = 0; t < triangleCount; t++) {
    const ia = indices[t * 3 + 0];
    const ib = indices[t * 3 + 1];
    const ic = indices[t * 3 + 2];

    const ax = vertices[ia * 3 + 0], ay = vertices[ia * 3 + 1], az = vertices[ia * 3 + 2];
    const bx = vertices[ib * 3 + 0], by = vertices[ib * 3 + 1], bz = vertices[ib * 3 + 2];
    const cx = vertices[ic * 3 + 0], cy = vertices[ic * 3 + 1], cz = vertices[ic * 3 + 2];

    // Edge vectors.
    const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
    const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;

    // Cross product (NOT normalized — magnitude == 2 × triangle area).
    const nx = e1y * e2z - e1z * e2y;
    const ny = e1z * e2x - e1x * e2z;
    const nz = e1x * e2y - e1y * e2x;

    out[ia * 3 + 0] += nx; out[ia * 3 + 1] += ny; out[ia * 3 + 2] += nz;
    out[ib * 3 + 0] += nx; out[ib * 3 + 1] += ny; out[ib * 3 + 2] += nz;
    out[ic * 3 + 0] += nx; out[ic * 3 + 1] += ny; out[ic * 3 + 2] += nz;
  }

  // Normalize each vertex normal.
  for (let v = 0; v < vertexCount; v++) {
    const x = out[v * 3 + 0], y = out[v * 3 + 1], z = out[v * 3 + 2];
    const len = Math.sqrt(x * x + y * y + z * z);
    if (len > 0) {
      out[v * 3 + 0] = x / len;
      out[v * 3 + 1] = y / len;
      out[v * 3 + 2] = z / len;
    }
  }

  return out;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd web && npm test -- src/algorithms/computeNormals.test.ts
```
Expected: PASS, 3 tests.

- [ ] **Step 5: Type check + commit**

```bash
cd web && npx tsc --noEmit
git add src/algorithms/computeNormals.ts src/algorithms/computeNormals.test.ts
git commit -m "[ADD] computeNormals: area-weighted per-vertex normals from face normals"
```

---

## Task 3: Arrow shaders

**Files:**
- Create: `src/shaders/arrow.vert.glsl`
- Create: `src/shaders/arrow.frag.glsl`

The vertex shader replicates the C++ geometry shader's default-mode (oriented quad) math, but reads per-instance attributes directly instead of texture-sampling. The fragment shader replicates the parametric arrow shape from `RenderIllustrativeLines-Arrows-fragment.glsl`.

- [ ] **Step 1: Create `src/shaders/arrow.vert.glsl`**

```glsl
#version 300 es
precision highp float;

// Per-vertex (4 corners of unit quad).
in vec2 a_corner; // (-1,-1), (1,-1), (-1,1), (1,1) for triangle strip; v_surfaceUV passes through

// Per-instance.
in vec3 a_instance_position; // world-space anchor point
in vec3 a_instance_direction; // unit direction (tangent on surface)
in vec3 a_instance_normal; // unit surface normal at anchor
in vec4 a_instance_color; // underlying region color

uniform mat4 u_view;
uniform mat4 u_projection;
uniform float u_arrowWidth; // world-units; matches u_width=1.5 from original
uniform float u_arrowHeight; // world-units; matches u_height=5.0 from original
uniform float u_arrowDist; // world-units offset along normal; matches u_dist=2.0 from original
uniform float u_arrowScale; // global scale; matches the GS magic 0.005 × mesh-scale

out vec4 v_color;
out vec3 v_normal;
out vec2 v_surfaceUV;

void main() {
  vec3 normal = normalize(a_instance_normal);
  vec3 tangent = normalize(a_instance_direction);
  vec3 binormal = normalize(cross(tangent, normal));

  float lscale = u_arrowScale * 2.0 * u_arrowHeight;
  float wscale = u_arrowScale * u_arrowWidth;

  // Anchor offset slightly above the surface so arrows don't z-fight with the mesh.
  vec3 p = a_instance_position + u_arrowScale * normal * u_arrowDist;

  // Quad corners in world space:
  //   (-1,-1) → p - binormal*wscale
  //   ( 1,-1) → p + binormal*wscale
  //   (-1, 1) → p - binormal*wscale + tangent*lscale
  //   ( 1, 1) → p + binormal*wscale + tangent*lscale
  vec3 worldPos = p + a_corner.x * binormal * wscale
                    + ((a_corner.y + 1.0) * 0.5) * tangent * lscale;

  gl_Position = u_projection * u_view * vec4(worldPos, 1.0);

  v_color = a_instance_color;
  v_normal = normal;
  // Match the geometry-shader convention from the original: y goes -1 (tail) to +1 (tip).
  v_surfaceUV = a_corner;
}
```

- [ ] **Step 2: Create `src/shaders/arrow.frag.glsl`**

Ported from `RenderIllustrativeLines-Arrows-fragment.glsl`. Same arrow shape (head as triangle, body as rectangle of width `u_widthTails`).

```glsl
#version 300 es
precision highp float;

uniform float u_widthTails;   // matches original default 0.25
uniform vec4 u_arrowColor;    // matches original default vec4(1.0)

in vec4 v_color;
in vec3 v_normal;
in vec2 v_surfaceUV;

out vec4 fragColor;

void main() {
  float shade;

  if (v_surfaceUV.y >= 0.5) {
    // Arrow head: triangle.
    float arrowHeadY = 1.0 - 2.0 * (v_surfaceUV.y - 0.5);
    float leftEdge = -arrowHeadY;
    float rightEdge = arrowHeadY;
    float leftStep = 1.0 - smoothstep(leftEdge - 0.15, leftEdge, v_surfaceUV.x);
    float rightStep = smoothstep(rightEdge - 0.15, rightEdge, v_surfaceUV.x);
    shade = 1.0 - (rightStep + leftStep);
  } else {
    // Arrow body: rectangle of width u_widthTails.
    float body = abs(v_surfaceUV.x);
    float skip = step(u_widthTails, body);
    shade = 1.0 - skip;
  }

  if (shade < 0.01) discard;

  // Cheap view-direction Lambert (matches the original arrow fragment's lighting).
  float light = clamp(0.1 + pow(abs(dot(v_normal, vec3(0.0, 0.0, 1.0))), 2.0), 0.0, 1.0);

  vec3 mixed = mix(v_color.rgb, u_arrowColor.rgb, u_arrowColor.a);
  fragColor = vec4(mixed * light, 1.0);
}
```

- [ ] **Step 3: Type check + commit**

(No unit tests for shaders — exercised by the integration in Task 7.)

```bash
cd web && npx tsc --noEmit
git add src/shaders/arrow.vert.glsl src/shaders/arrow.frag.glsl
git commit -m "[ADD] arrow shaders: instanced oriented quad + parametric arrow shape"
```

---

## Task 4: renderArrows — instanced VAO + draw helper

**Files:**
- Create: `src/algorithms/renderArrows.ts`

This is the host-side draw helper for the arrow shaders. It builds an instanced VAO with the unit quad's 4 corners as a per-vertex attribute, plus four per-instance attributes for position/direction/normal/color.

- [ ] **Step 1: Implement `src/algorithms/renderArrows.ts`**

```ts
import type { ShaderProgram } from "../gfx/program";

export interface ArrowInstanceBuffers {
  /** vec3 per arrow (world-space anchor). */
  positions: Float32Array;
  /** vec3 per arrow (unit direction). */
  directions: Float32Array;
  /** vec3 per arrow (unit normal). */
  normals: Float32Array;
  /** vec4 per arrow (RGBA bytes converted to floats; or normalized Uint8Array). */
  colors: Uint8Array;
}

export interface ArrowRenderable {
  vao: WebGLVertexArrayObject;
  instanceCount: number;
  draw(): void;
}

/**
 * Build an instanced VAO for arrow rendering.
 *
 * Per-vertex attribute (4 vertices in a triangle strip):
 *   a_corner: vec2 — quad corners (-1,-1), (1,-1), (-1,1), (1,1)
 *
 * Per-instance attributes:
 *   a_instance_position:  vec3
 *   a_instance_direction: vec3
 *   a_instance_normal:    vec3
 *   a_instance_color:     vec4 (uchar normalized)
 */
export function createArrowRenderable(
  gl: WebGL2RenderingContext,
  program: ShaderProgram,
  instances: ArrowInstanceBuffers,
): ArrowRenderable {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("createVertexArray failed for arrow");
  gl.bindVertexArray(vao);

  // Per-vertex: 4 corners of unit quad as triangle strip.
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

  // Per-instance attributes. Each gets its own VBO and divisor=1.
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
```

- [ ] **Step 2: Type check + commit**

```bash
cd web && npx tsc --noEmit
git add src/algorithms/renderArrows.ts
git commit -m "[ADD] renderArrows: instanced VAO + draw helper for arrow primitives"
```

---

## Task 5: ExtractRegions — port of Case 2 (labelOrder-driven)

**Files:**
- Create: `src/algorithms/extractRegions.ts`
- Create: `src/algorithms/extractRegions.test.ts`

Port `ExtractRegions::process()` Case 2 from `src/lib/di/algorithms/ExtractRegions.cpp` lines 224–620. Three sub-stages, in order:

1. **Region segmentation** — flood-fill same-label connected components → `vertexRegion[]`, `regionLabels[]`.
2. **Border vector calculation** — for each unignored vertex, examine neighbours; for cross-region neighbours, derive a signed direction using `labelOrder` position. Average over all neighbour-region vectors to get the vertex's initial direction.
3. **Iterative spread** — propagate values from set vertices to unset vertices, projecting onto the local surface tangent plane via vertex normals. Stop when converged or stuck.

Output: `Float32Array` of length `vertexCount * 3` containing the unit (or zero) direction vector per vertex.

The C++ `marchRegion` is **recursive** — for a 32k-vertex mesh that risks JS call-stack overflow. The TS port replaces it with an explicit BFS queue.

- [ ] **Step 1: Write the failing test `src/algorithms/extractRegions.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { extractRegions } from "./extractRegions";
import { buildMeshAdjacency } from "./meshAdjacency";
import { computeVertexNormals } from "./computeNormals";

describe("extractRegions", () => {
  it("ignores vertices whose labels are not in the labelOrder list", () => {
    // 3 vertices, labels [1, 2, 99]. labelOrder lists [1, 2] only.
    // Vertex 2 (label 99) should get a zero direction vector.
    const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
    const indices = new Uint32Array([0, 1, 2]);
    const labels = new Int32Array([1, 2, 99]);
    const labelOrder = new Int32Array([1, 2]);
    const adj = buildMeshAdjacency(indices, 3);
    const normals = computeVertexNormals(vertices, indices);

    const dirs = extractRegions({
      vertices, indices, labels, labelOrder,
      adjacency: adj, normals,
      switchDirection: false,
    });

    expect(dirs[6]).toBe(0); // vertex 2 x
    expect(dirs[7]).toBe(0);
    expect(dirs[8]).toBe(0);
  });

  it("computes a non-zero direction at a region border", () => {
    // Two adjacent vertices in different regions get a non-zero direction.
    // Vertices: (0) label 1, (1) label 2.
    // Triangle (0, 1, 2) where vertex 2 is also label 2 (so 0 has cross-region neighbours).
    const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
    const indices = new Uint32Array([0, 1, 2]);
    const labels = new Int32Array([1, 2, 2]);
    const labelOrder = new Int32Array([1, 2]);
    const adj = buildMeshAdjacency(indices, 3);
    const normals = computeVertexNormals(vertices, indices);

    const dirs = extractRegions({
      vertices, indices, labels, labelOrder,
      adjacency: adj, normals,
      switchDirection: false,
    });

    const len0 = Math.hypot(dirs[0], dirs[1], dirs[2]);
    expect(len0).toBeGreaterThan(0);
  });

  it("switchDirection inverts the resulting border vectors", () => {
    const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
    const indices = new Uint32Array([0, 1, 2]);
    const labels = new Int32Array([1, 2, 2]);
    const labelOrder = new Int32Array([1, 2]);
    const adj = buildMeshAdjacency(indices, 3);
    const normals = computeVertexNormals(vertices, indices);

    const dirsA = extractRegions({
      vertices, indices, labels, labelOrder,
      adjacency: adj, normals,
      switchDirection: false,
    });
    const dirsB = extractRegions({
      vertices, indices, labels, labelOrder,
      adjacency: adj, normals,
      switchDirection: true,
    });

    // Border vertex 0 should have flipped direction.
    expect(dirsA[0]).toBeCloseTo(-dirsB[0], 5);
    expect(dirsA[1]).toBeCloseTo(-dirsB[1], 5);
    expect(dirsA[2]).toBeCloseTo(-dirsB[2], 5);
  });

  it("runs end-to-end on the demo brain mesh without throwing or producing NaN", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const url = await import("node:url");
    const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

    const { parsePly } = await import("../io/plyReader");
    const { parseLabels } = await import("../io/labelReader");
    const { parseLabelOrder } = await import("../io/labelOrderReader");

    const plyText = fs.readFileSync(path.join(__dirname, "../../public/data/label34.ply"), "utf-8");
    const labelsText = fs.readFileSync(path.join(__dirname, "../../public/data/label34.labels"), "utf-8");
    const orderText = fs.readFileSync(path.join(__dirname, "../../public/data/label34.labelorder"), "utf-8");

    const mesh = parsePly(plyText);
    const labels = parseLabels(labelsText);
    const labelOrder = parseLabelOrder(orderText);
    const adj = buildMeshAdjacency(mesh.indices, mesh.vertices.length / 3);
    const normals = computeVertexNormals(mesh.vertices, mesh.indices);

    const dirs = extractRegions({
      vertices: mesh.vertices,
      indices: mesh.indices,
      labels,
      labelOrder,
      adjacency: adj,
      normals,
      switchDirection: false,
    });

    expect(dirs.length).toBe((mesh.vertices.length / 3) * 3);
    // Sanity: at least 10% of vertices should have non-zero direction (most are inside regions but spread reaches them).
    let nonZero = 0;
    for (let i = 0; i < dirs.length; i += 3) {
      if (dirs[i] !== 0 || dirs[i + 1] !== 0 || dirs[i + 2] !== 0) nonZero++;
    }
    expect(nonZero).toBeGreaterThan((mesh.vertices.length / 3) * 0.1);

    // No NaN.
    for (let i = 0; i < dirs.length; i++) {
      expect(Number.isFinite(dirs[i])).toBe(true);
    }
  }, 60000); // generous timeout — algorithm is O(verts × spread iterations).
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && npm test -- src/algorithms/extractRegions.test.ts
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/algorithms/extractRegions.ts`**

```ts
import type { MeshAdjacency } from "./meshAdjacency";

export interface ExtractRegionsInput {
  vertices: Float32Array;          // length = N * 3
  indices: Uint32Array | Uint16Array;
  labels: Int32Array;              // length = N
  labelOrder: Int32Array;          // length = number of regions in display order
  adjacency: MeshAdjacency;
  normals: Float32Array;           // length = N * 3 (unit normals)
  /** Flip the direction sign across the whole mesh. Matches the C++ enableDirectionSwitch parameter (default true in the C++). */
  switchDirection: boolean;
}

/**
 * Port of ExtractRegions::process() Case 2 (labelOrder given) from
 * src/lib/di/algorithms/ExtractRegions.cpp lines 224–620.
 *
 * Returns a per-vertex 3-component direction vector packed as a Float32Array of
 * length N*3. Vertices whose label is not in `labelOrder` get (0,0,0).
 *
 * Algorithm (verbatim from C++):
 *   1. Flood-fill connected same-label components → regionLabels[regionID].
 *   2. For each non-ignored vertex, look at neighbours. Cross-region neighbours
 *      contribute a signed direction (sign decided by labelOrder ordering).
 *      Vertex direction is the mean of those contributions.
 *   3. Iterative spread: propagate values from set vertices to unset vertices
 *      using a distance-weighted mean of neighbours, projecting each contributed
 *      vector onto the receiver's local tangent plane. Stops on convergence or
 *      stuck-but-not-fully-set state.
 */
export function extractRegions(input: ExtractRegionsInput): Float32Array {
  const { vertices, labels, labelOrder, adjacency, normals, switchDirection } = input;
  const N = adjacency.vertexCount;
  const out = new Float32Array(N * 3);

  // ---- Stage 1: flood-fill region segmentation ----

  const visited = new Uint8Array(N);
  const vertexRegion = new Int32Array(N).fill(-1);
  const regionLabels: number[] = [];

  for (let seed = 0; seed < N; seed++) {
    if (visited[seed]) continue;
    const seedLabel = labels[seed];
    const regionID = regionLabels.length;
    regionLabels.push(seedLabel);

    // BFS (NOT recursive — JS call stack would blow up at 32k vertices).
    const queue: number[] = [seed];
    visited[seed] = 1;
    while (queue.length > 0) {
      const v = queue.shift()!;
      vertexRegion[v] = regionID;
      const ns = adjacency.neighbours(v);
      for (let k = 0; k < ns.length; k++) {
        const n = ns[k];
        if (!visited[n] && labels[n] === seedLabel) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  // ---- Stage 2: border vectors ----

  // labelOrder lookup: label → position in order array. Position is 0-based and
  // unknown labels get -1.
  const orderPos = new Map<number, number>();
  for (let i = 0; i < labelOrder.length; i++) orderPos.set(labelOrder[i], i);

  const ignore = new Uint8Array(N);
  for (let v = 0; v < N; v++) {
    if (!orderPos.has(labels[v])) ignore[v] = 1;
  }

  const valueSet = new Uint8Array(N);
  for (let v = 0; v < N; v++) {
    if (ignore[v]) {
      // Pre-set to zero (matches C++ vectorAttributeSet[v] = true with zero value).
      valueSet[v] = 1;
    }
  }

  const flipGlobal = switchDirection ? -1 : 1;

  for (let v = 0; v < N; v++) {
    if (ignore[v]) continue;
    const vx = vertices[v * 3 + 0], vy = vertices[v * 3 + 1], vz = vertices[v * 3 + 2];
    const myRegion = vertexRegion[v];
    const myLabel = labels[v];
    const myOrderPos = orderPos.get(myLabel)!;

    let sumX = 0, sumY = 0, sumZ = 0, count = 0;

    const ns = adjacency.neighbours(v);
    for (let k = 0; k < ns.length; k++) {
      const n = ns[k];
      if (ignore[n]) continue;
      const nRegion = vertexRegion[n];
      if (nRegion === myRegion) continue; // not a border edge

      const nLabel = regionLabels[nRegion];
      const nOrderPos = orderPos.get(nLabel);
      if (nOrderPos === undefined) continue;

      // Default direction: FROM v TO n. Sign convention from the C++:
      //   if vertexPos > neighbourPos → invert.
      // Then global switch applies.
      const localFlip = myOrderPos > nOrderPos ? -1 : 1;
      const sign = localFlip * flipGlobal;

      const nx = vertices[n * 3 + 0], ny = vertices[n * 3 + 1], nz = vertices[n * 3 + 2];
      let dx = nx - vx, dy = ny - vy, dz = nz - vz;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (len < 1e-9) continue;
      dx = (dx / len) * sign; dy = (dy / len) * sign; dz = (dz / len) * sign;

      sumX += dx; sumY += dy; sumZ += dz;
      count++;
    }

    if (count > 0) {
      out[v * 3 + 0] = sumX / count;
      out[v * 3 + 1] = sumY / count;
      out[v * 3 + 2] = sumZ / count;
      valueSet[v] = 1;
    }
  }

  // ---- Stage 3: iterative spread ----

  // Cap iterations defensively. The C++ relies on convergence; we do the same
  // but with an explicit ceiling so a pathological mesh can't hang.
  const MAX_ITERATIONS = 200;
  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    let changed = false;
    let allSet = true;

    // Copy of valueSet for "use values from previous iteration only".
    const prevSet = new Uint8Array(valueSet);
    const prev = new Float32Array(out);

    for (let v = 0; v < N; v++) {
      if (valueSet[v]) continue;
      allSet = false;

      const ns = adjacency.neighbours(v);
      let includedNeighbours = 0;
      let longestDist = 0;
      for (let k = 0; k < ns.length; k++) {
        const n = ns[k];
        if (n === v) continue;
        if (ignore[n]) continue;
        if (!prevSet[n]) continue;
        includedNeighbours++;
        const dx = vertices[n * 3 + 0] - vertices[v * 3 + 0];
        const dy = vertices[n * 3 + 1] - vertices[v * 3 + 1];
        const dz = vertices[n * 3 + 2] - vertices[v * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d > longestDist) longestDist = d;
      }

      if (includedNeighbours < 2) continue;

      // Vertex normal at v (local tangent plane definition).
      const Nx = normals[v * 3 + 0], Ny = normals[v * 3 + 1], Nz = normals[v * 3 + 2];

      let meanX = 0, meanY = 0, meanZ = 0, factor = 0;

      for (let k = 0; k < ns.length; k++) {
        const n = ns[k];
        if (n === v) continue;
        if (ignore[n]) continue;
        if (!prevSet[n]) continue;

        const dx = vertices[n * 3 + 0] - vertices[v * 3 + 0];
        const dy = vertices[n * 3 + 1] - vertices[v * 3 + 1];
        const dz = vertices[n * 3 + 2] - vertices[v * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        let sx = prev[n * 3 + 0], sy = prev[n * 3 + 1], sz = prev[n * 3 + 2];
        const sLen = Math.sqrt(sx * sx + sy * sy + sz * sz);

        // Project onto the tangent plane of v:
        //   binormal = normalize(cross(N, normalize(srcVec)))
        //   vec      = normalize(cross(binormal, N)) * |srcVec|
        // Skip when srcVec is too short or too aligned with N.
        let projX = 0, projY = 0, projZ = 0;
        if (sLen > 0.001) {
          const ux = sx / sLen, uy = sy / sLen, uz = sz / sLen;
          const cosAngle = Math.abs(ux * Nx + uy * Ny + uz * Nz);
          if (cosAngle < 0.98) {
            // binormal = N × u
            const bx = Ny * uz - Nz * uy;
            const by = Nz * ux - Nx * uz;
            const bz = Nx * uy - Ny * ux;
            const bLen = Math.sqrt(bx * bx + by * by + bz * bz);
            if (bLen > 1e-9) {
              const nbx = bx / bLen, nby = by / bLen, nbz = bz / bLen;
              // tangent in plane = binormal × N
              let px = nby * Nz - nbz * Ny;
              let py = nbz * Nx - nbx * Nz;
              let pz = nbx * Ny - nby * Nx;
              const pLen = Math.sqrt(px * px + py * py + pz * pz);
              if (pLen > 1e-9) {
                px /= pLen; py /= pLen; pz /= pLen;
                projX = px * sLen; projY = py * sLen; projZ = pz * sLen;
              }
            }
          }
        }

        const w = d / longestDist;
        meanX += w * projX; meanY += w * projY; meanZ += w * projZ;
        factor += w;
      }

      if (factor > 0) {
        out[v * 3 + 0] = meanX / factor;
        out[v * 3 + 1] = meanY / factor;
        out[v * 3 + 2] = meanZ / factor;
        valueSet[v] = 1;
        changed = true;
      }
    }

    if (allSet) break;
    if (!changed) {
      // Stuck: matches the C++ "areas where propagation is stuck. Aborting".
      break;
    }
  }

  return out;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd web && npm test -- src/algorithms/extractRegions.test.ts
```
Expected: PASS, 4 tests including the demo-data run.

- [ ] **Step 5: Type check + commit**

```bash
cd web && npx tsc --noEmit
git add src/algorithms/extractRegions.ts src/algorithms/extractRegions.test.ts
git commit -m "[ADD] extractRegions: port of ExtractRegions Case 2 (labelOrder-driven directionality)"
```

---

## Task 6: seedArrows — sparse arrow placement

**Files:**
- Create: `src/algorithms/seedArrows.ts`
- Create: `src/algorithms/seedArrows.test.ts`

Drawing one arrow per vertex (32k arrows) is too dense to be readable. Pick a sparse subset. M2 strategy: skip vertices with near-zero direction, then sample every Nth remaining vertex (deterministic stride). The stride is configurable.

Future M3+ may pick by screen-space density; M2 keeps it CPU-stride.

- [ ] **Step 1: Write the failing test `src/algorithms/seedArrows.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { seedArrows } from "./seedArrows";

describe("seedArrows", () => {
  it("skips vertices with zero direction", () => {
    const dirs = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]);
    const seeded = seedArrows(dirs, { stride: 1, minLength: 0.001 });
    expect(seeded).toEqual([1, 2]);
  });

  it("respects stride: stride=2 keeps every other valid vertex", () => {
    const dirs = new Float32Array([
      1, 0, 0,  // 0
      1, 0, 0,  // 1
      1, 0, 0,  // 2
      1, 0, 0,  // 3
      1, 0, 0,  // 4
    ]);
    const seeded = seedArrows(dirs, { stride: 2, minLength: 0.001 });
    expect(seeded).toEqual([0, 2, 4]);
  });

  it("always includes the first valid vertex even with very large stride", () => {
    const dirs = new Float32Array([1, 0, 0]);
    const seeded = seedArrows(dirs, { stride: 100, minLength: 0.001 });
    expect(seeded).toEqual([0]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && npm test -- src/algorithms/seedArrows.test.ts
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/algorithms/seedArrows.ts`**

```ts
export interface SeedArrowsOptions {
  /** Take every Nth valid vertex. Larger = sparser. */
  stride: number;
  /** Vertices whose direction has length below this are skipped. */
  minLength: number;
}

/**
 * Pick a sparse subset of vertex IDs to draw arrows for.
 * Skips zero/short-direction vertices, then samples every `stride`-th remaining vertex.
 */
export function seedArrows(
  directions: Float32Array,
  options: SeedArrowsOptions,
): number[] {
  const { stride, minLength } = options;
  const minLen2 = minLength * minLength;
  const seeded: number[] = [];
  let validIndex = 0;
  const count = directions.length / 3;
  for (let v = 0; v < count; v++) {
    const x = directions[v * 3 + 0];
    const y = directions[v * 3 + 1];
    const z = directions[v * 3 + 2];
    if (x * x + y * y + z * z < minLen2) continue;
    if (validIndex % stride === 0) seeded.push(v);
    validIndex++;
  }
  return seeded;
}
```

- [ ] **Step 4: Run tests + type check + commit**

```bash
cd web && npm test -- src/algorithms/seedArrows.test.ts
cd web && npx tsc --noEmit
git add src/algorithms/seedArrows.ts src/algorithms/seedArrows.test.ts
git commit -m "[ADD] seedArrows: stride-based sparse arrow seeding from direction field"
```

---

## Task 7: Integration — upgrade mesh shader, wire arrows in app.ts, manual UAT

**Files:**
- Modify: `src/shaders/mesh.vert.glsl` (accept `a_normal`)
- Modify: `src/shaders/mesh.frag.glsl` (Lambert from real normal)
- Modify: `src/app.ts` (build adjacency + normals + extractRegions + seedArrows + arrow render)

This integrates everything. The mesh shader is upgraded from "screen-space derivative normal" to "real per-vertex normal," and the arrow render pass is added on top.

- [ ] **Step 1: Update `src/shaders/mesh.vert.glsl`**

```glsl
#version 300 es
precision highp float;

in vec3 a_position;
in vec3 a_normal;
in vec4 a_color;

uniform mat4 u_view;
uniform mat4 u_projection;

out vec4 v_color;
out vec3 v_normal_world;

void main() {
  gl_Position = u_projection * u_view * vec4(a_position, 1.0);
  v_color = a_color;
  v_normal_world = a_normal;
}
```

- [ ] **Step 2: Update `src/shaders/mesh.frag.glsl`**

```glsl
#version 300 es
precision highp float;

in vec4 v_color;
in vec3 v_normal_world;

out vec4 out_color;

void main() {
  vec3 n = normalize(v_normal_world);
  // Cheap view-space-z lighting; matches the original arrow fragment shader's
  // light approximation so mesh + arrows share aesthetic.
  float light = clamp(0.4 + 0.6 * abs(n.z), 0.0, 1.0);
  out_color = vec4(v_color.rgb * light, v_color.a);
}
```

- [ ] **Step 3: Update `src/app.ts`**

Replace the entire file with the integrated version:

```ts
import { vec3 } from "gl-matrix";
import { createView } from "./gfx/view";
import { createTrackball } from "./gfx/camera";
import { linkProgram } from "./gfx/program";
import { createMeshVAO, type AttribDef } from "./gfx/buffer";
import { parsePly } from "./io/plyReader";
import { parseLabels } from "./io/labelReader";
import { parseLabelOrder } from "./io/labelOrderReader";
import { buildVertexColors } from "./algorithms/regionColors";
import { buildMeshAdjacency } from "./algorithms/meshAdjacency";
import { computeVertexNormals } from "./algorithms/computeNormals";
import { extractRegions } from "./algorithms/extractRegions";
import { seedArrows } from "./algorithms/seedArrows";
import { createArrowRenderable } from "./algorithms/renderArrows";

import meshVertSrc from "./shaders/mesh.vert.glsl?raw";
import meshFragSrc from "./shaders/mesh.frag.glsl?raw";
import arrowVertSrc from "./shaders/arrow.vert.glsl?raw";
import arrowFragSrc from "./shaders/arrow.frag.glsl?raw";

async function fetchText(url: string): Promise<string> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Fetch failed ${url}: ${r.status} ${r.statusText}`);
  return r.text();
}

function meshBoundingSphere(vertices: Float32Array): { center: vec3; radius: number } {
  const center = vec3.fromValues(0, 0, 0);
  const n = vertices.length / 3;
  for (let i = 0; i < n; i++) {
    center[0] += vertices[i * 3 + 0];
    center[1] += vertices[i * 3 + 1];
    center[2] += vertices[i * 3 + 2];
  }
  vec3.scale(center, center, 1 / n);
  let r2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = vertices[i * 3 + 0] - center[0];
    const dy = vertices[i * 3 + 1] - center[1];
    const dz = vertices[i * 3 + 2] - center[2];
    r2 = Math.max(r2, dx * dx + dy * dy + dz * dz);
  }
  return { center, radius: Math.sqrt(r2) };
}

export async function runApp(container: HTMLElement): Promise<void> {
  const view = createView(container);
  const gl = view.gl;

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

  // ---- Pre-render compute ----
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
    switchDirection: true, // matches C++ default (enableDirectionSwitch defaults to true)
  });

  // Sphere for camera framing + arrow scale.
  const sphere = meshBoundingSphere(mesh.vertices);
  // Arrow size: in mesh units. The original used a magic 0.005 with a u_height=5,
  // u_width=1.5, u_dist=2. On a brain ~200 mesh units across, 0.005 × radius gives
  // an arrow about 1mm long — too small. Scale with mesh radius.
  const arrowScale = sphere.radius * 0.01;

  // ---- Programs ----
  const meshProgram = linkProgram(gl, meshVertSrc, meshFragSrc, "mesh");
  const arrowProgram = linkProgram(gl, arrowVertSrc, arrowFragSrc, "arrow");

  // ---- Mesh VAO ----
  const meshGL = createMeshVAO(
    gl,
    [
      { def: { name: "a_position", data: mesh.vertices, size: 3, type: gl.FLOAT, normalized: false } as AttribDef,
        location: meshProgram.attribs.get("a_position") ?? -1 },
      { def: { name: "a_normal", data: normals, size: 3, type: gl.FLOAT, normalized: false } as AttribDef,
        location: meshProgram.attribs.get("a_normal") ?? -1 },
      { def: { name: "a_color", data: colors, size: 4, type: gl.UNSIGNED_BYTE, normalized: true } as AttribDef,
        location: meshProgram.attribs.get("a_color") ?? -1 },
    ],
    mesh.indices,
  );

  // ---- Arrow instances ----
  const arrowVertexIDs = seedArrows(directions, { stride: 25, minLength: 0.05 });
  const instanceCount = arrowVertexIDs.length;
  const aPos = new Float32Array(instanceCount * 3);
  const aDir = new Float32Array(instanceCount * 3);
  const aNor = new Float32Array(instanceCount * 3);
  const aCol = new Uint8Array(instanceCount * 4);
  for (let i = 0; i < instanceCount; i++) {
    const v = arrowVertexIDs[i];
    aPos[i * 3 + 0] = mesh.vertices[v * 3 + 0];
    aPos[i * 3 + 1] = mesh.vertices[v * 3 + 1];
    aPos[i * 3 + 2] = mesh.vertices[v * 3 + 2];
    // Normalize direction here so the shader can assume unit length.
    const dx = directions[v * 3 + 0], dy = directions[v * 3 + 1], dz = directions[v * 3 + 2];
    const dl = Math.hypot(dx, dy, dz) || 1;
    aDir[i * 3 + 0] = dx / dl;
    aDir[i * 3 + 1] = dy / dl;
    aDir[i * 3 + 2] = dz / dl;
    aNor[i * 3 + 0] = normals[v * 3 + 0];
    aNor[i * 3 + 1] = normals[v * 3 + 1];
    aNor[i * 3 + 2] = normals[v * 3 + 2];
    aCol[i * 4 + 0] = colors[v * 4 + 0];
    aCol[i * 4 + 1] = colors[v * 4 + 1];
    aCol[i * 4 + 2] = colors[v * 4 + 2];
    aCol[i * 4 + 3] = colors[v * 4 + 3];
  }
  const arrows = createArrowRenderable(gl, arrowProgram, {
    positions: aPos, directions: aDir, normals: aNor, colors: aCol,
  });

  // ---- Camera ----
  const camera = createTrackball();
  camera.fitSphere(sphere.center, sphere.radius);

  view.onResize(() => {
    camera.resize(view.width, view.height);
    view.requestRender();
  });
  camera.attach(view.canvas, () => view.requestRender());
  camera.resize(view.width, view.height);

  // ---- Render ----
  view.onRender(() => {
    gl.clearColor(0.07, 0.07, 0.07, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // Mesh.
    gl.useProgram(meshProgram.program);
    gl.uniformMatrix4fv(meshProgram.uniforms.get("u_view")!, false, camera.view);
    gl.uniformMatrix4fv(meshProgram.uniforms.get("u_projection")!, false, camera.projection);
    gl.bindVertexArray(meshGL.vao);
    gl.drawElements(gl.TRIANGLES, meshGL.indexCount, meshGL.indexType, 0);
    gl.bindVertexArray(null);

    // Arrows.
    gl.disable(gl.CULL_FACE); // arrows are flat quads — both sides visible.
    gl.useProgram(arrowProgram.program);
    gl.uniformMatrix4fv(arrowProgram.uniforms.get("u_view")!, false, camera.view);
    gl.uniformMatrix4fv(arrowProgram.uniforms.get("u_projection")!, false, camera.projection);
    gl.uniform1f(arrowProgram.uniforms.get("u_arrowWidth")!, 1.5);
    gl.uniform1f(arrowProgram.uniforms.get("u_arrowHeight")!, 5.0);
    gl.uniform1f(arrowProgram.uniforms.get("u_arrowDist")!, 2.0);
    gl.uniform1f(arrowProgram.uniforms.get("u_arrowScale")!, arrowScale);
    gl.uniform1f(arrowProgram.uniforms.get("u_widthTails")!, 0.25);
    gl.uniform4f(arrowProgram.uniforms.get("u_arrowColor")!, 1.0, 1.0, 1.0, 1.0);
    arrows.draw();
  });

  view.requestRender();
}
```

- [ ] **Step 4: Update `src/main.ts`** (no change needed — `runApp` signature is unchanged).

- [ ] **Step 5: Run all unit tests**

```bash
cd web && npm test
```
Expected: all tests pass (M1's 13 + M2's new tests, ~22 tests total across 9 files).

- [ ] **Step 6: Type check**

```bash
cd web && npx tsc --noEmit
```
Expected: no output (clean).

- [ ] **Step 7: Manual interactive UAT**

The lead manages the dev server. From the user's perspective, refresh `http://localhost:5173` and verify:

- Mesh still renders with per-region colors (M1 regression check).
- White arrows visible on the surface, oriented along the directionality field.
- Arrows on adjacent regions point along the labelOrder direction (verifiable by spot-check against the labelorder file).
- Drag rotates, wheel zooms — all M1 camera behavior intact.
- No console errors.

If arrows are too dense or too sparse, adjust `stride` in `app.ts` (current 25; lower = denser).
If arrows are the wrong size, adjust the `arrowScale` constant (currently `radius * 0.01`).
If arrows point the wrong way (away from labelOrder direction), flip the `switchDirection` argument to `extractRegions`.

- [ ] **Step 8: Commit M2**

```bash
git add src/shaders/mesh.vert.glsl src/shaders/mesh.frag.glsl src/app.ts
git commit -m "[ADD] M2: extractRegions-driven directionality field rendered as flat-quad arrows"
```

---

## Done

M2 ships when refresh shows the brain mesh with per-region colors and a sparse field of white arrows pointing along the cross-region directionality, with all M1 interaction (rotate/zoom) still working.

**What is NOT in M2 and arrives in M3:**
- SurfaceLIC pass (LIC underlay).
- FBO/G-buffer infrastructure.
- Arrows reading from G-buffers (currently they read per-instance attributes directly).

After M2 ships, write the M3 plan as a separate document.
