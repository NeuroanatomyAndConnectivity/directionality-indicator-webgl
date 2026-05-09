# Directionality Indicator (Web)

**🔗 Live demo: https://neuroanatomyandconnectivity.github.io/directionality-indicator-webgl/**

Browser-based visualization of directional information on anatomical surfaces.
A WebGL2 / TypeScript port of the C++/Qt/OpenGL 3.3 [DirectionalityIndicator](https://github.com/NeuroanatomyAndConnectivity/DirectionalityIndicator)
by Sebastian Eichelbaum and the Max Planck Research Group "Neuroanatomy and
Connectivity". See [NOTICE.md](NOTICE.md) for credits and license.

The visualization pipeline is the original's Tier-1 behaviour: a Line
Integral Convolution (LIC) flow rendered on the cortical surface, with
directionality arrows overlaid following the parcellation-derived vector
field.

---

## Quick start

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:5173`. The bundled demo dataset (`label34.ply`,
`label34.labels`, `label34.labelorder`) loads automatically.

### Browser requirements

- **WebGL2** with the `EXT_color_buffer_float` extension. The app
  detects the extension at boot and shows a banner if it's missing.
  Chromium-based browsers, Firefox, and Safari 16+ all support this.
- A modern JS engine (ES2022 features used).

---

## Panel overview

The right-side panel is fully collapsible (click the chevron at its
left edge or the corner button when closed). Sections collapse
individually by clicking their headings; collapse state persists.

### Data
Pick a dataset triple — one `.ply` mesh, one `.labels` file, one
`.labelorder` file — via the file picker. The triple is parsed,
processed, and rendered. The dataset is cached in IndexedDB and
auto-restored on the next page load. Cache is cleared by the **Reset
to defaults** button at the bottom of the panel.

### View
Six canonical anatomical view buttons: Lateral L/R, Anterior /
Posterior, Dorsal / Ventral. Click to snap. Free rotation/pan/zoom
with the mouse is also available; the camera position auto-saves
350 ms after each change and restores on next load.

### Visibility
Independent toggles for the three layers:
- **LIC streamlines** — the smeared noise pattern showing the
  directional field on the surface.
- **Parcellation colors** — the per-region colored shading. When off,
  the surface goes black so the LIC streaks read more clearly.
- **Arrows** — the overlay glyphs.

### LIC
- **Streamline length (iterations)** — how far each LIC noise sample
  is advected along the field. Longer = more visible streaks.
- **High contrast** — boosts the LIC contribution to the composite.
- **Emphasize singularities** — paints weak-magnitude regions
  (saddles, vortex centres) with white/black bands so field topology
  reads at a glance. Mirrors the original C++ `m_emphasizeSingularPointsEnable`.

### Scene
- **Background** — canvas clear color (used for both the page
  background and PNG screenshot transparency reference).

### Surface shading
Phong parameters for the underlying parcellation surface:
- **Ambient / Diffuse / Specular** — standard material weights.
- **Shininess** — specular sharpness. Higher = smaller, sharper
  highlights. Defaults are softened from the original C++ to reduce
  glare.

### Arrows
- **Borders only (M2 mode)** — restrict arrow placement to
  parcellation-border vertices instead of the whole surface.
- **Density (smaller = denser)** — Poisson minimum spacing as a
  fraction of mesh radius. Coupled to arrow length so arrows can't
  visually overlap regardless of size.
- **Size / Length / Head width / Body width** — arrow geometry.
  Length and Size trigger a re-sample on release (debounced).
- **Distance from surface** — how far above the surface the arrow
  bodies float (in mesh units relative to arrow scale).
- **Opacity** — alpha-blend strength of the arrow over the LIC.
- **Flip direction** — instant uniform-side flip of all arrows.
- **Color** — picker; default black.

### Screenshot
- **Resolution (DPI)** — output pixel scale. 72 → 1 × current canvas;
  150 → ~1.5 ×; 1200 → ~12.5 ×. Hard-capped at 50 megapixels (a
  console warning fires if the requested resolution would exceed
  this).
- **Current view** — saves the current camera angle as a transparent-
  background PNG, auto-cropped to the brain extent.
- **All canonical views** — saves six PNGs (one per anatomical
  direction), each auto-cropped.

### Reset to defaults
At the bottom of the panel. Clears all panel parameters, the camera
state, the section-collapse state, and the IndexedDB dataset cache,
then reloads.

---

## Mouse / keyboard

| Gesture                | Action                              |
|------------------------|-------------------------------------|
| Drag                   | Rotate (trackball, around target)   |
| Shift + drag           | Pan (translate target on screen)    |
| Wheel                  | Zoom (exponential, distance-clamped)|

Camera state (rotation, target, distance) persists 350 ms after each
change.

---

## Data format

The app expects three files per dataset, all referring to the same
mesh by vertex order.

**`.ply`** — ASCII PLY 1.0. The current parser supports:
```
ply
format ascii 1.0
element vertex N
property float x
property float y
property float z
[property uchar red]      (optional; alternative source of color)
[property uchar green]
[property uchar blue]
element face M
property list uchar int vertex_indices
end_header
...vertex data, one line per vertex...
...face data, one line per triangle...
```
Triangle faces only. **Per-vertex colors in the PLY (the optional
`red` / `green` / `blue` columns) are used directly as the surface
palette when present.** When the PLY has no color columns, the
surface falls back to a label-derived HSV-wheel palette keyed by
`labelorder` index. The labels file is always used to compute the
directionality field that the arrows follow, regardless of where
the surface colors come from.

> **TODO:** decouple surface colors entirely from the PLY by
> reading a separate colormap file, so the PLY can be pure
> geometry.

**`.labels`** — one integer per line, one line per mesh vertex. The
integer is the region ID for that vertex.

**`.labelorder`** — one integer per line listing the region IDs in
display order. The number of entries determines how many regions
there are. Region IDs in `.labels` that are not in `.labelorder`
are treated as "ignored" / non-mesh (excluded from the directionality
field).

The bundled demo `label34.*` is the FreeSurfer 34-region cortical
parcellation on a single cortical hemisphere mesh (32,492 vertices,
64,980 triangles).

---

## How it works (short version)

1. **Parse** the three input files.
2. **`extractRegions`** — port of the original `ExtractRegions`
   Case 2 algorithm. Computes a per-vertex unit direction vector from
   the parcellation: at parcel borders, the direction follows the
   `labelorder` (from later-in-order to earlier-in-order); the field
   is then iteratively spread inward across each parcel by Laplacian-
   style propagation projected onto the surface tangent plane.
3. **SurfaceLIC** — four-pass FBO pipeline:
   - **Transform** — render the mesh into G-buffers (color, view-space
     vec, noise sampled from a 3D noise volume by world position,
     normal, position).
   - **Edge** — Laplacian on the depth buffer.
   - **Advect** — iterated noise advection along the screen-space
     vec field (50 forward + 50 backward Euler steps), accumulating
     and averaging.
   - **Compose** — combine color + LIC + edge mask + multi-LOD depth
     halo into the canvas.
4. **Arrows** — streamline-based seeding (or border-restricted
   Poisson-disk in M2 mode), then instanced quad rendering with the
   parametric arrow shape from the original C++ `Arrows-fragment`
   shader. Occlusion uses the LIC G-buffer position texture.

For deeper architectural notes see `docs/superpowers/specs/` and
`docs/superpowers/plans/`.

---

## Layout

```
web/
├── README.md                        — this file
├── NOTICE.md                        — credits and license info
├── index.html                       — entry HTML + panel CSS
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/data/                     — bundled demo dataset
└── src/
    ├── main.ts                      — boot
    ├── app.ts                       — top-level pipeline orchestrator
    ├── io/                          — PLY / labels / labelorder parsers + IndexedDB cache
    ├── algorithms/                  — extractRegions, sampling, surfaceLIC, etc.
    ├── gfx/                         — view, camera, framebuffer, screen quad, program, buffer
    ├── ui/                          — panel
    └── shaders/                     — all GLSL
```

---

## Development

```bash
npm test            # vitest run
npm run build       # tsc + vite build
npm run dev         # vite dev server with HMR
```

Tests cover the IO parsers (`plyReader`, `labelReader`, `labelOrderReader`),
the `regionColors` palette, `meshAdjacency`, `computeNormals`,
`extractRegions`, `seedArrows`, and the `Camera` view math. GPU code
paths (the LIC pipeline, arrow rendering) are exercised by the dev
server's interactive UAT.
