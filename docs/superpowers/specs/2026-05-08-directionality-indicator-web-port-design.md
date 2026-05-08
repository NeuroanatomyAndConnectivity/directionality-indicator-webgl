# Directionality Indicator — Web Port (Tier 1) Design

Date: 2026-05-08
Status: Approved (design); pending writing-plans

## Goal

Translate the Tier 1 visualization pipeline of the original C++/Qt/OpenGL 3.3 Core
DirectionalityIndicator into a browser-based web app whose visual output, on the
demo dataset (`example/label34.ply` + `label34.labels` + `label34.labelorder`),
matches the original closely enough to be recognizably the same visualization:
mesh-surface Line Integral Convolution (LIC) underlay with illustrative arrow
overlay following the per-vertex direction field. Tier 2 (volumetric AO,
Voxelize/GaussSmooth/Dilatate, LineAO) is explicitly out of scope.

## Stack

- TypeScript
- Vite (dev server + build)
- WebGL2 (no scene-graph framework; no regl)
- GLSL 300 ES (ported from the original GLSL 330)

Rationale: the user's constraint is "stay closest to the C code." The original
is raw OpenGL with a thin imperative C++ wrapper (`gfx/Buffer`, `Program`,
`Texture`, `View`). The closest port is raw WebGL2 with a thin imperative TS
wrapper. WebGPU would force a GLSL → WGSL rewrite that buys nothing for Tier 1
(LIC is fragment-shader ping-pong, identical work in either API). regl would
add a declarative abstraction the original doesn't have.

## Project layout

The C++ tree under `src/` stays in place as a reference (read-only; never
built). The web port lives under a sibling `web/` directory so the original
↔ port mapping is greppable.

```
DirectionalityIndicator/
├── src/                       (existing C++ — reference only, not built)
├── example/                   (existing demo data)
├── web/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── public/data/           (example/label34.* copied here for fetch)
│   └── src/
│       ├── main.ts            (boot)
│       ├── app.ts             (top-level: load → process → render loop)
│       ├── io/
│       │   ├── plyReader.ts
│       │   └── labelReader.ts
│       ├── algorithms/
│       │   ├── extractRegions.ts
│       │   ├── surfaceLIC.ts
│       │   ├── renderIllustrativeLines.ts
│       │   └── renderTriangles.ts
│       ├── gfx/
│       │   ├── buffer.ts
│       │   ├── program.ts
│       │   ├── texture.ts
│       │   ├── camera.ts
│       │   ├── framebuffer.ts
│       │   └── view.ts        (canvas + GL ctx + render loop)
│       └── shaders/           (.glsl files, imported via Vite ?raw)
```

## Original ↔ port mapping (Tier 1)

| Original (under `src/lib/di/`)                                | Port (under `src/`)                       |
|---------------------------------------------------------------|-----------------------------------------------|
| `io/PlyReader.{cpp,h}`                                        | `io/plyReader.ts`                             |
| `io/RegionLabelReader.{cpp,h}`                                | `io/labelReader.ts`                           |
| `algorithms/ExtractRegions.{cpp,h}`                           | `algorithms/extractRegions.ts`                |
| `algorithms/SurfaceLIC.{cpp,h}` + 8 LIC shaders               | `algorithms/surfaceLIC.ts` + ported GLSL      |
| `algorithms/RenderIllustrativeLines.{cpp,h}` + Arrows shaders | `algorithms/renderIllustrativeLines.ts` + ported GLSL + new instanced-quad arrow vertex shader |
| `algorithms/RenderTriangles.{cpp,h}` + 2 shaders              | `algorithms/renderTriangles.ts`               |
| `gfx/Buffer.{cpp,h}`                                          | `gfx/buffer.ts`                               |
| `gfx/Program.{cpp,h}` + `gfx/Shader.{cpp,h}`                  | `gfx/program.ts`                              |
| `gfx/Texture.{cpp,h}`                                         | `gfx/texture.ts`                              |
| `gfx/Camera.{cpp,h}`                                          | `gfx/camera.ts`                               |
| `gfx/PixelData.{cpp,h}`                                       | `gfx/framebuffer.ts`                          |
| `gfx/View.{cpp,h}` + `OffscreenView.{cpp,h}`                  | `gfx/view.ts`                                 |

### Components dropped intentionally

The C++ project includes substantial framework scaffolding that a single-pipeline
web app does not need. These are **not** ported:

- `core/ProcessingNetwork`, `core/Algorithm` (base class), `core/Connector`,
  `core/Connection`, `core/Observer`, `core/CommandQueue`, `core/Command`,
  `core/Parameter*`, `core/State`, `core/Visitor`
- `gui/*` (Qt UI)
- `commands/*` (project file load/save commands)
- `ext/*` (third-party: glew, glm, rply — replaced by browser APIs / hand-written
  PLY parser)

Replacement: a single ordered `app.ts` that calls each pipeline stage
imperatively. No observer pattern, no parameter framework, no command queue.

### Tier 2 components excluded

`Voxelize`, `GaussSmooth`, `Dilatate`, `SurfaceLIC`'s LineAO inputs, the
`LineAO.glsl` shader, and the volumetric portions of the Compose/Final passes
are out of scope. The Compose/Final passes still run, but with the LineAO term
fixed to a constant (no AO) so the structure is preserved for a future Tier 2
reactivation.

## Pipeline data flow (Tier 1)

1. **Boot.** Feature-detect WebGL2; if absent, render a banner explaining the
   requirement and exit. `fetch()` `data/label34.ply`, `label34.labels`,
   `label34.labelorder`.
2. **Parse.**
   - `plyReader` → `{vertices: Float32Array, normals: Float32Array | null,
     colors: Uint8Array | null, indices: Uint32Array}`. The demo
     `label34.ply` is verified ASCII (`format ascii 1.0`, 32,492 vertices,
     64,980 faces) with per-vertex RGB and no normals. Parser supports ASCII
     PLY with float xyz, optional uchar rgb, and `list uchar int vertex_indices`
     faces. Binary PLY only if a future dataset requires it.
   - `labelReader` → `{vertexLabels: Int32Array, regionTable: Array<{id,
     name, rgba}>}`.
3. **ExtractRegions.** Port from `ExtractRegions.cpp`: per-region vertex
   sets, per-region centers, region-boundary edges, per-vertex direction
   vector (the surface direction field that drives LIC and arrows). The
   exact derivation is lifted from the C++ source during implementation.
4. **SurfaceLIC.** Multi-pass FBO ping-pong:
   - `LICMeshTransform` — render mesh, write G-buffers (color, vec, normal,
     position) to an offscreen FBO with multiple render targets.
   - `LICAdvect` — iterated noise advection along the vector field. Two
     ping-pong textures.
   - `LICEdge` — edge detection on the advected texture.
   - `LICCompose` — composite into a single LIC color texture.
5. **RenderIllustrativeLines.**
   - `Transform` pass writes per-fragment color/vec/normal/position to G-buffers.
   - Spawn a sparse 2D point grid (one point per N screen pixels; N is a
     parameter ported from the original).
   - For each spawned point, render **one instance of a unit quad** (or a unit
     ribbon for curvature mode). Each instance gets a per-instance `vec2
     a_texLookup` attribute. The vertex shader does the same texture samples
     and the same tangent/binormal/scale math the original geometry shader
     does, then emits one of the four corners selected by `gl_VertexID`.
   - `Compose` + `Final` passes mix mesh + LIC + arrows. LineAO term is
     constant (Tier 2 placeholder).
6. **Camera.** Trackball: mouse-drag rotation, wheel zoom. Render loop redraws
   on a dirty flag (no continuous redraw when idle).

## The geometry-shader replacement, in detail

The original `RenderIllustrativeLines-Arrows-geometry.glsl` consumes a
`GL_POINTS` stream where each point's `gl_Position.xy` is a UV that indexes the
G-buffer textures. WebGL2 has no geometry shaders. Two modes to replace:

**Default mode (oriented quad per arrow).** Render `N` instances of a
4-vertex unit quad. Per-instance attribute: `vec2 a_texLookup`. Vertex shader
samples G-buffers at `a_texLookup`, computes tangent/binormal/scale exactly
as the GS does, and selects one of `{lv1, lv2, lv3, lv4}` by `gl_VertexID`.
~80 lines of new vertex shader replacing one geometry shader.

**Curvature/ribbon mode (`#ifdef d_curvatureEnable`).** The original GS
iterates segments, sampling the next position from textures along the
tangent. A vertex shader cannot share state across instances. Two paths:

- **(a)** CPU-flatten: each frame the camera moves, walk the tangent
  integration on CPU, fill an instance buffer with segment positions.
  Render one quad per segment per arrow.
- **(b)** WebGL2 transform feedback: precompute pass that emits segment
  vertices to a buffer.

**Decision:** start with (a). Profile. Move to (b) only if frame budget
demands it. The demo dataset has 34 regions and is small enough that (a)
will be fine.

## Error handling

- WebGL2 not supported → on-page banner, exit.
- `fetch()` failures → banner with file path; do not silently fall back.
- Shader compile/link failures → log `getShaderInfoLog` / `getProgramInfoLog`
  with shader name; throw with the same message.
- PLY/labels parse errors → throw with line number and reason; banner.
- No defensive try/catch around internal calls. Validate at file-load and
  shader-compile boundaries only.

## Phasing (commit checkpoints)

- **M1.** Boot + data load + textured mesh rendering with per-region colors.
  Trackball camera. No LIC, no arrows. Visual check: regions visible and
  correctly colored.
- **M2.** ExtractRegions + per-vertex direction vectors. Render arrows as
  simple flat quads (instanced quads from §"geometry-shader replacement",
  default mode). No LIC underneath. Visual check: arrows on regions, oriented
  along the direction field.
- **M3.** SurfaceLIC pass. Mesh + LIC visible, no arrows. Visual check:
  smeared streaklines visible following the direction field.
- **M4.** Combine — mesh + LIC underlay + arrow overlay + Compose/Final
  passes (with constant LineAO). Side-by-side compare against a screenshot
  of the original C++ binary on `label34`.

If a reference screenshot from the original binary on `label34` is not
already on hand, capturing one is a prerequisite to declaring M4 done.

## Testing

- **Unit tests** for the two parsers. Golden files: tiny synthetic PLY
  (cube, ~12 triangles) + tiny labels file (4 regions). Expected output
  hand-verified.
- **No unit tests** for the GPU pipeline. UAT is visual diff against the
  reference screenshot. Pixel-perfect equality is not required; "recognizably
  the same visualization" is the bar.
- **Manual smoke test** at each milestone: load demo, rotate, check render
  doesn't break.

## Out of scope (explicitly)

- Tier 2: voxelization, Gauss smooth, dilation, LineAO, volumetric Compose
  terms. The pipeline placeholders are kept so a future Tier 2 phase can
  drop them in without a structural change.
- Project file load/save (the `.project` files the C++ binary supports).
- Screenshot CLI mode and offscreen rendering for batch screenshots.
- GUI parameter controls for LIC step size, arrow density, etc.
  (Default values from the C++ source are baked in for Phase 1; expose later.)
- Drag-and-drop loading of user data; only the demo data is loaded.
- Mobile/touch input.

## Open questions

None blocking implementation. One item deferred to during-implementation
decisions:

1. **Reference screenshot.** If not already available, capture one from the
   original C++ binary on `label34` before M4. If the binary is not currently
   buildable on the user's system, document the visual approximation in M4.
