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
// Unused-but-kept scaffolding (parcel-border smoothing experiments parked in TODO):
// import { deindexMesh } from "./algorithms/deindexMesh";
// import { subdivideMixedTriangles } from "./algorithms/subdivideMesh";
// import { smoothLabels } from "./algorithms/smoothLabels";
// import { loopSubdivide } from "./algorithms/loopSubdivide";
import {
  createArrowRenderable,
  createCurvedArrowRenderable,
  type ArrowRenderable,
  type CurvedArrowRenderable,
} from "./algorithms/renderArrows";
import { buildCurvedArrowBuffers, DEFAULT_SEGMENTS_PER_ARROW } from "./algorithms/curvedArrows";
import { saveDataset, loadCachedDataset } from "./io/datasetCache";
import {
  sampleStreamlines,
  sampleGeodesicPoisson,
  rejectOverlappingArrows,
  computeBorderVertexMask,
} from "./algorithms/seedArrows";
import { createPanel, defaultParams, loadStoredParams, type Params, type ViewName } from "./ui/panel";
import { createSurfaceLIC } from "./algorithms/surfaceLIC";

import arrowVertSrc from "./shaders/arrow.vert.glsl?raw";
import arrowFragSrc from "./shaders/arrow.frag.glsl?raw";
import arrowCurvedVertSrc from "./shaders/arrow.curved.vert.glsl?raw";

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

  const surfaceLIC = createSurfaceLIC(gl, view.width || 1, view.height || 1);
  const arrowProgram = linkProgram(gl, arrowVertSrc, arrowFragSrc, "arrow");
  // Curved-arrow program shares the existing arrow.frag.glsl (which keys off
  // v_surfaceUV exactly the same way) but uses a different vertex shader that
  // expands a precomputed polyline ribbon instead of an instanced quad.
  const arrowCurvedProgram = linkProgram(gl, arrowCurvedVertSrc, arrowFragSrc, "arrow.curved");
  const camera = createTrackball();

  // Live-tunable parameters; mutated by the panel. Loaded from localStorage if
  // present (so panel state persists across reloads).
  const params: Params = loadStoredParams();

  // Per-dataset state — replaced on each loadDataset call.
  let meshData: ReturnType<typeof parsePly> | null = null;
  let meshDirections: Float32Array | null = null;
  let meshNormals: Float32Array | null = null;
  let meshColors: Uint8Array | null = null;
  let meshAdjacency: ReturnType<typeof buildMeshAdjacency> | null = null;
  let meshBorderMask: Uint8Array | null = null;
  let meshGL: ReturnType<typeof createMeshVAO> | null = null;
  let bounds: ReturnType<typeof meshBounds> | null = null;
  let arrows: ArrowRenderable | null = null;
  let curvedArrows: CurvedArrowRenderable | null = null;

  function rebuildArrows(p: typeof defaultParams): void {
    if (!meshData || !meshAdjacency || !meshDirections || !meshNormals || !meshColors || !bounds) return;
    const arrowLength = 2.0 * p.arrowHeight * p.arrowScale * bounds.radius;
    const arrowHalfWidth = 0.5 * p.arrowWidth * p.arrowScale * bounds.radius;

    let samples;
    if (p.arrowBorderMode && meshBorderMask) {
      // M2-style: arrows only at parcellation borders. Borders are curves, so
      // streamline walking doesn't apply; use geodesic Poisson restricted to the
      // border-vertex mask.
      const sliderRadius = bounds.radius * p.arrowDensity;
      // Borders are 1D, so the geometric floor is just arrow length (no lateral
      // crowding to worry about).
      const minDistance = Math.max(sliderRadius, arrowLength);
      samples = sampleGeodesicPoisson(
        meshData.vertices, meshAdjacency, meshDirections, meshNormals, meshColors,
        minDistance, 0.05, meshBorderMask,
      );
    } else {
      // Default: streamline placement on the whole surface.
      const stepDistance = arrowLength * 1.2;
      const sliderRadius = bounds.radius * p.arrowDensity;
      const laneRadius = Math.max(
        sliderRadius,
        Math.max(arrowHalfWidth * 1.5, arrowLength * 0.4),
      );
      samples = sampleStreamlines(
        meshData.vertices, meshAdjacency, meshDirections, meshNormals, meshColors,
        stepDistance, laneRadius, 0.05,
      );
    }

    const filtered = rejectOverlappingArrows(samples, arrowLength, 1.0);
    arrows = createArrowRenderable(gl, arrowProgram, {
      positions: filtered.positions,
      directions: filtered.directions,
      normals: filtered.normals,
      colors: filtered.colors,
    });

    // Build the curved-ribbon renderable too. We do it unconditionally so the
    // user's curved/straight toggle is instant (no rebuild on toggle); if
    // arrowCurved is on but vertexIDs are missing for some reason, we fall back
    // to the straight rendering.
    if (filtered.vertexIDs && meshData && meshAdjacency && meshDirections && meshNormals && meshColors) {
      const curvedBuffers = buildCurvedArrowBuffers(
        filtered.positions,
        Array.from(filtered.vertexIDs),
        meshData.vertices,
        meshAdjacency,
        meshDirections,
        meshNormals,
        meshColors,
        DEFAULT_SEGMENTS_PER_ARROW,
      );
      curvedArrows = createCurvedArrowRenderable(gl, arrowCurvedProgram, curvedBuffers);
    } else {
      curvedArrows = null;
    }
  }

  function loadDataset(plyText: string, labelsText: string, orderText: string): void {
    const mesh = parsePly(plyText);
    const labels = parseLabels(labelsText);
    const order = parseLabelOrder(orderText);
    if (labels.length !== mesh.vertices.length / 3) {
      throw new Error(
        `Vertex count mismatch: mesh has ${mesh.vertices.length / 3} vertices, labels has ${labels.length}`,
      );
    }
    const colors = buildVertexColors(labels, order);
    const normals = computeVertexNormals(mesh.vertices, mesh.indices);
    const adjacency = buildMeshAdjacency(mesh.indices, mesh.vertices.length / 3);
    const borderMask = computeBorderVertexMask(labels, adjacency);
    const directions = extractRegions({
      vertices: mesh.vertices,
      indices: mesh.indices,
      labels,
      labelOrder: order,
      adjacency,
      normals,
      switchDirection: true,
    });
    const newBounds = meshBounds(mesh.vertices);

    const tAttribs = surfaceLIC.transformAttribs;
    const newMeshGL = createMeshVAO(
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

    // Atomically swap in the new dataset.
    meshData = mesh;
    meshDirections = directions;
    meshNormals = normals;
    meshColors = colors;
    meshAdjacency = adjacency;
    meshBorderMask = borderMask;
    meshGL = newMeshGL;
    bounds = newBounds;

    rebuildArrows(params);

    // Re-fit camera to the new bounds. Restore saved view if present, else
    // default to lateral-left at 2.5×r framing.
    camera.fitSphere(newBounds.center, newBounds.radius);
    const saved = loadCameraState();
    if (saved) {
      camera.setLookAt(
        vec3.fromValues(saved.eye[0], saved.eye[1], saved.eye[2]),
        vec3.fromValues(saved.target[0], saved.target[1], saved.target[2]),
        vec3.fromValues(saved.up[0], saved.up[1], saved.up[2]),
      );
    } else {
      applyCanonicalView("lateral-left", newBounds.center, newBounds.radius);
    }
    view.requestRender();
  }

  // ---- Canonical-view definitions, shared by panel buttons + screenshot ----
  function canonicalViewParams(
    name: ViewName,
    center: vec3,
    radius: number,
    distanceFactor = 2.5,
  ): { eye: vec3; up: vec3 } {
    const D = radius * distanceFactor;
    switch (name) {
      case "lateral-left":  return { eye: vec3.fromValues(center[0] - D, center[1], center[2]), up: vec3.fromValues(0, 0, 1) };
      case "lateral-right": return { eye: vec3.fromValues(center[0] + D, center[1], center[2]), up: vec3.fromValues(0, 0, 1) };
      case "anterior":      return { eye: vec3.fromValues(center[0], center[1] + D, center[2]), up: vec3.fromValues(0, 0, 1) };
      case "posterior":     return { eye: vec3.fromValues(center[0], center[1] - D, center[2]), up: vec3.fromValues(0, 0, 1) };
      case "dorsal":        return { eye: vec3.fromValues(center[0], center[1], center[2] + D), up: vec3.fromValues(0, 1, 0) };
      case "ventral":       return { eye: vec3.fromValues(center[0], center[1], center[2] - D), up: vec3.fromValues(0, 1, 0) };
    }
  }
  function applyCanonicalView(name: ViewName, center: vec3, radius: number): void {
    const { eye, up } = canonicalViewParams(name, center, radius);
    camera.setLookAt(eye, center, up);
  }

  // ---- Camera state persistence ----
  const CAMERA_STORAGE_KEY = "di-camera-state-v1";
  type SavedCameraState = { eye: [number, number, number]; target: [number, number, number]; up: [number, number, number] };
  function loadCameraState(): SavedCameraState | null {
    try {
      const raw = window.localStorage.getItem(CAMERA_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as SavedCameraState;
      if (parsed && Array.isArray(parsed.eye) && Array.isArray(parsed.target) && Array.isArray(parsed.up)) return parsed;
      return null;
    } catch {
      return null;
    }
  }
  let cameraSaveTimer: number | null = null;
  function scheduleCameraSave(): void {
    if (cameraSaveTimer !== null) clearTimeout(cameraSaveTimer);
    cameraSaveTimer = window.setTimeout(() => {
      cameraSaveTimer = null;
      try {
        window.localStorage.setItem(CAMERA_STORAGE_KEY, JSON.stringify(camera.getViewState()));
      } catch { /* ignore quota */ }
    }, 350);
  }

  // Thin alias for clarity at the call sites. Was tracking dataset text for a
  // re-processing path (parcel-smoothing slider) that has since been reverted.
  const loadAndCache = loadDataset;

  // Initial dataset load. Try the IndexedDB cache first so a previously-loaded
  // dataset (including user uploads) auto-restores; fall back to the bundled
  // example/label34.* files on a cold start or cache miss.
  const cached = await loadCachedDataset();
  if (cached) {
    loadAndCache(cached.plyText, cached.labelsText, cached.orderText);
  } else {
    const [plyText0, labelsText0, orderText0] = await Promise.all([
      fetchText(`${import.meta.env.BASE_URL}data/label34.ply`),
      fetchText(`${import.meta.env.BASE_URL}data/label34.labels`),
      fetchText(`${import.meta.env.BASE_URL}data/label34.labelorder`),
    ]);
    loadAndCache(plyText0, labelsText0, orderText0);
    // Seed the cache with the default so subsequent reloads don't re-fetch.
    await saveDataset({
      name: "label34.ply",
      plyText: plyText0,
      labelsText: labelsText0,
      orderText: orderText0,
    });
  }

  view.onResize(() => {
    camera.resize(view.width, view.height);
    surfaceLIC.resize(view.width, view.height);
    view.requestRender();
  });
  camera.attach(view.canvas, () => {
    view.requestRender();
    scheduleCameraSave();
  });
  camera.resize(view.width, view.height);
  surfaceLIC.resize(view.width, view.height);

  // ---- Side panel: param change + dataset load callbacks ----
  const { element: panelElement } = createPanel(
    params,
    (p, isExpensive) => {
      if (isExpensive) rebuildArrows(p);
      view.requestRender();
    },
    async ({ ply, labels: labelsFile, labelorder: orderFile }) => {
      const [plyText, labelsText, orderText] = await Promise.all([
        ply.text(),
        labelsFile.text(),
        orderFile.text(),
      ]);
      loadAndCache(plyText, labelsText, orderText);
      // Persist for auto-restore on next page load.
      await saveDataset({ name: ply.name, plyText, labelsText, orderText });
    },
    {
      current: () => screenshotCurrent(),
      canonical: () => screenshotCanonical(),
    },
    {
      set: (name) => {
        if (!bounds) return;
        applyCanonicalView(name, bounds.center, bounds.radius);
        scheduleCameraSave();
        view.requestRender();
      },
    },
  );
  container.appendChild(panelElement);

  function drawFrame(bgAlpha: number): void {
    gl.clearColor(params.bgColorR, params.bgColorG, params.bgColorB, bgAlpha);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (!meshGL || !bounds) return;

    surfaceLIC.render(
      {
        meshVAO: meshGL.vao,
        meshIndexCount: meshGL.indexCount,
        meshIndexType: meshGL.indexType,
        meshBBMin: bounds.bbMin,
        meshBBMax: bounds.bbMax,
        licIterations: params.licIterations,
        useHighContrast: params.licHighContrast,
        showLIC: params.showLIC,
        showColor: params.showColor,
        emphasizeSingular: params.licEmphasizeSingular,
        surfaceAmbient: params.surfaceAmbient,
        surfaceDiffuse: params.surfaceDiffuse,
        surfaceSpecular: params.surfaceSpecular,
        surfaceShininess: params.surfaceShininess,
      },
      camera.view,
      camera.projection,
      view.width,
      view.height,
    );

    if (!params.showArrows) return;
    const useCurved = params.arrowCurved && curvedArrows !== null;
    const program = useCurved ? arrowCurvedProgram : arrowProgram;
    if (!useCurved && !arrows) return;

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(program.program);
    gl.uniformMatrix4fv(program.uniforms.get("u_view")!, false, camera.view);
    gl.uniformMatrix4fv(program.uniforms.get("u_projection")!, false, camera.projection);
    gl.uniform1f(program.uniforms.get("u_arrowWidth")!, params.arrowWidth);
    gl.uniform1f(program.uniforms.get("u_arrowDist")!, params.arrowDist);
    gl.uniform1f(program.uniforms.get("u_arrowScale")!, bounds.radius * params.arrowScale);
    gl.uniform1f(program.uniforms.get("u_directionSign")!, params.arrowFlipDirection ? -1.0 : 1.0);
    gl.uniform1f(program.uniforms.get("u_widthTails")!, params.arrowBodyWidth);
    gl.uniform4f(program.uniforms.get("u_arrowColor")!, params.arrowColorR, params.arrowColorG, params.arrowColorB, 1.0);
    gl.uniform1f(program.uniforms.get("u_arrowOpacity")!, params.arrowOpacity);
    if (!useCurved) {
      gl.uniform1f(program.uniforms.get("u_arrowHeight")!, params.arrowHeight);
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, surfaceLIC.getPosTexture());
    gl.uniform1i(program.uniforms.get("u_posSampler")!, 0);
    if (useCurved && curvedArrows) {
      curvedArrows.draw();
    } else if (arrows) {
      arrows.draw();
    }
    gl.disable(gl.BLEND);
  }

  view.onRender(() => drawFrame(1.0));

  // ---- Screenshot helpers ----

  // Cap on output PNG pixel area (50 MP). Beyond this, browsers/canvas APIs
  // start failing. 50 MP = 8000×6250 ≈ ~30 MB PNG.
  const MAX_SCREENSHOT_PIXELS = 50_000_000;

  /**
   * Render at an explicit pixel resolution so high-DPI screenshots can come
   * out at print-quality even when the live canvas is smaller. Resizes the
   * canvas + the LIC FBOs + the camera aspect, draws, and restores.
   */
  function withResolution<T>(targetW: number, targetH: number, fn: () => T): T {
    const canvas = view.canvas;
    const oldW = canvas.width;
    const oldH = canvas.height;
    canvas.width = targetW;
    canvas.height = targetH;
    gl.viewport(0, 0, targetW, targetH);
    camera.resize(targetW, targetH);
    surfaceLIC.resize(targetW, targetH);
    try {
      return fn();
    } finally {
      canvas.width = oldW;
      canvas.height = oldH;
      gl.viewport(0, 0, oldW, oldH);
      camera.resize(oldW, oldH);
      surfaceLIC.resize(oldW, oldH);
    }
  }

  function screenshotDimensions(): { w: number; h: number } {
    const scale = Math.max(0.5, params.screenshotDPI / 96);
    let w = Math.round(view.canvas.width * scale);
    let h = Math.round(view.canvas.height * scale);
    // Clamp to MAX_SCREENSHOT_PIXELS preserving aspect.
    if (w * h > MAX_SCREENSHOT_PIXELS) {
      const k = Math.sqrt(MAX_SCREENSHOT_PIXELS / (w * h));
      w = Math.round(w * k);
      h = Math.round(h * k);
      console.warn(`Screenshot pixel cap: clamped ${params.screenshotDPI} DPI to ${Math.round(96 * k * (params.screenshotDPI / 96))} effective DPI to stay under 50 MP`);
    }
    return { w, h };
  }

  async function screenshotCurrent(): Promise<void> {
    if (!bounds) return;
    const { w, h } = screenshotDimensions();
    await runCapture(w, h, "directionality-current.png");
    drawFrame(1.0);
  }

  /** Render at (w, h), pixel-copy into a 2D canvas, restore size, then crop+download async. */
  async function runCapture(w: number, h: number, filename: string): Promise<void> {
    let stageDataURL = "";
    withResolution(w, h, () => {
      drawFrame(0.0);
      // Synchronously grab the pixels into a data URL while the WebGL canvas is at high res.
      stageDataURL = view.canvas.toDataURL("image/png");
    });
    // Live canvas is restored. Now decode the data URL, find bbox, crop, save.
    await new Promise<void>((resolveLoad) => {
      const img = new Image();
      img.onload = async () => {
        const stage = document.createElement("canvas");
        stage.width = img.width;
        stage.height = img.height;
        const sctx = stage.getContext("2d");
        if (!sctx) { resolveLoad(); return; }
        sctx.drawImage(img, 0, 0);
        const data = sctx.getImageData(0, 0, img.width, img.height).data;
        let minX = img.width, minY = img.height, maxX = -1, maxY = -1;
        for (let y = 0; y < img.height; y++) {
          const row = y * img.width * 4;
          for (let x = 0; x < img.width; x++) {
            if (data[row + x * 4 + 3] > 0) {
              if (x < minX) minX = x; if (x > maxX) maxX = x;
              if (y < minY) minY = y; if (y > maxY) maxY = y;
            }
          }
        }
        if (maxX < 0) { resolveLoad(); return; }
        const cw = maxX - minX + 1;
        const ch = maxY - minY + 1;
        const out = document.createElement("canvas");
        out.width = cw;
        out.height = ch;
        const octx = out.getContext("2d");
        if (!octx) { resolveLoad(); return; }
        octx.drawImage(stage, minX, minY, cw, ch, 0, 0, cw, ch);
        await new Promise<void>((resolveBlob) => {
          out.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }
            resolveBlob();
          }, "image/png");
        });
        resolveLoad();
      };
      img.src = stageDataURL;
    });
  }

  async function screenshotCanonical(): Promise<void> {
    if (!bounds) return;
    const r = bounds.radius;
    const c = bounds.center;
    // Use the shared canonical-view definitions, but at a wider 3.2× framing
    // (vs 2.5× for the panel-button views) so the brain comfortably fits in
    // any aspect ratio before auto-crop trims the result.
    const names: ViewName[] = ["lateral-left", "lateral-right", "anterior", "posterior", "dorsal", "ventral"];
    const { w, h } = screenshotDimensions();
    for (const name of names) {
      const { eye, up } = canonicalViewParams(name, c, r, 3.2);
      camera.setLookAt(eye, c, up);
      await runCapture(w, h, `directionality-${name}.png`);
    }
    // Restore the default lateral-left view (or last saved).
    const saved = loadCameraState();
    if (saved) {
      camera.setLookAt(
        vec3.fromValues(saved.eye[0], saved.eye[1], saved.eye[2]),
        vec3.fromValues(saved.target[0], saved.target[1], saved.target[2]),
        vec3.fromValues(saved.up[0], saved.up[1], saved.up[2]),
      );
    } else {
      applyCanonicalView("lateral-left", c, r);
    }
    drawFrame(1.0);
  }

  view.requestRender();
}
