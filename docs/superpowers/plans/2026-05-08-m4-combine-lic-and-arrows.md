# M4: Combine LIC + Arrows — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the M2 directionality arrows on top of the M3 SurfaceLIC composite — final visual: brain mesh with LIC streaklines underneath and directional arrows on top.

**Architecture:** After `surfaceLIC.render()` writes the final composite to the canvas (with `gl_FragDepth = depth` so the depth buffer is correct), draw the M2 arrows in a single instanced pass on top. No FBO indirection for arrows in M4 — same simplification used in M2. The original C++ uses a more elaborate G-buffer-driven arrow pipeline; if visual fidelity gap is too large, M5 (out of Tier 1 scope) could revisit.

**Tech Stack:** Same as M3.

**Reference spec:** `docs/superpowers/specs/2026-05-08-directionality-indicator-web-port-design.md` — M4 milestone.

**Carryover:**
- `npx tsc --noEmit` before commit.
- Manual interactive UAT.

---

## File Structure (modified in this milestone)

```
src/
└── app.ts                                (MODIFIED — re-enable arrow rendering after LIC compose)
```

That's it. All arrow infrastructure was built and committed in M2; M4 just turns it back on.

---

## Task 1: app.ts — re-enable arrows on top of LIC

**Files:**
- Modify: `src/app.ts`

The M3 app.ts has the M2 arrow imports kept as comments. M4 uncomments them, builds the arrow renderable, and adds an arrow draw call after `surfaceLIC.render()`.

Critical detail: after `surfaceLIC.render()` finishes, the canvas FBO is bound (compose pass restored it via `gl.bindFramebuffer(gl.FRAMEBUFFER, targetFBO)` where `targetFBO` was null = canvas) and the depth buffer holds valid mesh depth values (compose writes `gl_FragDepth = depth`). Arrows can therefore depth-test against the LIC composite naturally.

GL state after compose: `gl.DEPTH_TEST` is enabled (enabled in compose render). Arrow draw needs `gl.DEPTH_TEST` for proper occlusion against the brain surface, but `gl.CULL_FACE` should be disabled (arrows are flat quads, both sides visible).

- [ ] **Step 1: Read the current `src/app.ts`** to understand its structure.

```bash
cat /Users/dmargulies/Dropbox/01_code/ClaudeProjects/DirectionalityIndicator/src/app.ts
```

- [ ] **Step 2: Replace `src/app.ts` with the M4 version**

```ts
import { vec3 } from "gl-matrix";
import { createView, showBanner } from "./gfx/view";
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
import { createSurfaceLIC } from "./algorithms/surfaceLIC";

import arrowVertSrc from "./shaders/arrow.vert.glsl?raw";
import arrowFragSrc from "./shaders/arrow.frag.glsl?raw";

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

  // ---- Arrow setup (M2 → reactivated for M4) ----
  const arrowProgram = linkProgram(gl, arrowVertSrc, arrowFragSrc, "arrow");
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
  const arrowScale = bounds.radius * 0.01;

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

    // Pass 1: LIC (mesh + streaklines + edge halo) → canvas.
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

    // Pass 2: arrows on top, depth-tested against the LIC's reconstructed depth.
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE); // flat quads — both sides visible
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

- [ ] **Step 3: Run unit tests**

```bash
cd web && npm test
```
Expected: 30 passed + 1 skipped (no regression).

- [ ] **Step 4: Type check**

```bash
cd web && npx tsc --noEmit
```
Expected: clean.

- [ ] **Step 5: Manual UAT**

The lead has the dev server running on port 5173 with HMR. Refresh the browser. Expected:
- Brain mesh with LIC streaklines (from M3) underneath.
- Sparse white arrows visible on top, oriented along the directionality field.
- Arrows occlude properly against the mesh surface (no z-fighting, no arrows showing through the back of the brain).
- Camera rotate/zoom works.
- No console errors.

If arrows don't appear: most likely either (a) `gl.DEPTH_TEST` not enabled in arrow pass, or (b) arrow scale is too small relative to mesh — check `arrowScale = bounds.radius * 0.01`.

If arrows are barely visible against the LIC noise: bump `u_arrowColor` alpha higher to make them more solid white, or lower the LIC's `u_useHighContrast` to make the underlay subtler.

(No commit; lead serializes.)

---

## Done

M4 ships when refresh shows brain + LIC streaklines + arrows on top, all interactive.

**Tier 1 is then complete.** Tier 2 (volumetric AO, Voxelize/GaussSmooth/Dilatate/LineAO) is explicitly out of scope per the spec.
