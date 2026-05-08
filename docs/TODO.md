# Deferred features

Tracking work that's been started or considered but not yet shipping in the active UI.

---

## Curved arrows (`arrowCurved` mode)

**Status:** Implemented but visually broken. Toggle pulled from the panel
on 2026-05-08; backing code retained.

**What's in place:**
- `src/algorithms/curvedArrows.ts` — `buildCurvedArrowBuffers` walks
  the field forward + backward from each anchor for `DEFAULT_SEGMENTS_PER_ARROW = 8`
  segments, producing a triangle-strip ribbon per arrow.
- `src/shaders/arrow.curved.vert.glsl` — vertex shader that expands
  the precomputed polyline laterally by `a_stripSide × wscale` and
  forwards `v_surfaceUV` so the existing `arrow.frag.glsl` head/body
  shape works unchanged.
- `src/algorithms/renderArrows.ts` — `createCurvedArrowRenderable`
  uses one `gl.drawArrays(TRIANGLE_STRIP, …)` per arrow.
- `src/app.ts` — `rebuildArrows` builds both straight and curved
  renderables; the render lambda branches on `params.arrowCurved`.
- `src/ui/panel.ts` — `arrowCurved: boolean` param + default exist;
  the panel control is commented out.

**Suspected issues to investigate:**
- Field-walk fall-back: when the walker can't find a sufficiently
  aligned neighbour, it falls back to the anchor's position/data. This
  creates degenerate vertex piles in the strip (visible as small
  bright clumps at end-of-walk points). Worker C noted this; recommended
  fix is to record per-arrow actual sample counts and use them as
  `counts[]` so the strip just ends instead of folding back.
- StripY mapping: the head shape lives at `v_surfaceUV.y >= 0.5` in the
  fragment shader. The curved path emits stripY in [-1, +1] across the
  full polyline. If the head should occupy only the top quarter of the
  ribbon (matching straight arrows where `(corner.y + 1) * 0.5 → [0, 1]`
  and head is at y ≥ 0.5 = top half of the longitudinal axis), the
  current mapping may be putting the head at the geometric midpoint of
  the ribbon instead.
- Anchor centering: straight arrows now anchor at the middle (the
  earlier flip-direction fix). Curved-arrow stripY likely needs the same
  treatment so the field-walk's "anchor" sample sits at stripY = 0,
  with head at stripY = +1 and tail at stripY = -1, head shape at
  stripY ≥ +0.5 instead of the original >= 0.5.
- Width scaling: curved-arrow vertex shader uses `u_arrowScale × u_arrowWidth`
  for half-width; straight-arrow uses the same. With the larger ribbon
  surface area (each arrow renders multiple times the area of a straight
  quad), the visual density / opacity may need rebalancing.

**Reactivation:** uncomment the `arrowCurved` entry in
`ARROW_CONTROLS` (see TODO comment) and verify the issues above.

---

## Singularity-aware arrow placement (beyond the visual emphasis)

**Status:** Visual emphasis (white/black banding) is shipped via
`licEmphasizeSingular`. The original C++ also offers an option to
explicitly avoid placing arrows at singularities; we currently skip
near-zero-magnitude vertices via the `minDirectionLength: 0.05`
threshold in `sampleStreamlines` / `sampleGeodesicPoisson`. The
threshold is hardcoded; could be exposed as a panel slider for finer
"give singularities more breathing room" control.

---

## Camera presets / saved views

Not yet implemented. Useful future work: save the current camera
orientation as a named preset (lateral, medial, dorsal, ventral),
recall via panel buttons.

---

## Parcel-border smoothness experiments (parked)

A series of approaches to reduce visible jaggedness at parcel borders
were tried and reverted on 2026-05-08 in favour of the original
interpolated-color baseline. Code modules retained in tree as
scaffolding (unused but kept for future revisits):

- `algorithms/deindexMesh.ts` — expand each triangle to 3 unique
  vertices carrying the triangle's three colors, enabling per-fragment
  region selection in the LIC transform shader.
- `algorithms/subdivideMesh.ts` — subdivide every mixed-region triangle
  into uniform sub-triangles so the boundary follows the actual
  mid-edge polyline rather than the interpolated color gradient.
- `algorithms/smoothLabels.ts` — majority-vote label smoothing on the
  mesh adjacency to round per-vertex zigzags off the boundary.
- `algorithms/loopSubdivide.ts` — global 1→4 mesh refinement (loop
  subdivision without smoothing) so subsequent label-smoothing passes
  can refine boundaries at sub-triangle resolution.

Lessons:
- Per-fragment region selection with fwidth-based AA produces
  pixel-resolution smoothness within each mixed triangle, but the
  global boundary chain still kinks at every triangle edge.
- Mixed-triangle subdivision moves the boundary onto the mid-edge
  polyline, twice the resolution of vertex-edge but still visibly
  jagged at moderate viewing distance.
- Majority-vote label smoothing rounds per-vertex zigzags but at high
  iterations can shrink small parcels.
- Loop subdivision refines mesh resolution but doesn't smooth labels
  by itself; would need to be combined with label smoothing per
  iteration to genuinely refine the boundary curve.

Reactivation path: any of the above can be re-imported into
`app.ts` `loadDataset`. Backwards-compatible — `parcelSmoothing` and
`parcelRefinement` Params fields are still present (defaulted) for a
future panel control.
