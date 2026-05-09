import { clearDataset } from "../io/datasetCache";

/**
 * Side panel with controls for LIC + arrow parameters. Toggleable.
 *
 * Exposes a Params object whose fields are mutated as the user drags sliders /
 * picks colors. The host registers an onChange callback for live updates;
 * "expensive" changes (currently: arrow density) are flagged via the
 * `isExpensive` argument so the host can debounce work like re-sampling the
 * mesh surface.
 */

export interface Params {
  // Visibility toggles
  showLIC: boolean;            // gate the LIC streamline mixing in compose
  showColor: boolean;          // gate the parcellation color (when off, surface is gray)
  showArrows: boolean;         // gate the arrow draw pass
  useLabelColors: boolean;     // surface palette: false=PLY RGB (when present), true=label-order HSV
  // LIC
  licIterations: number;       // u_numIter (advection length)
  licHighContrast: boolean;    // u_useHighContrast
  licEmphasizeSingular: boolean; // highlight low-magnitude (saddle/vortex) regions in compose
  // Arrows
  arrowCurved: boolean;        // curved-ribbon arrows (vs straight quads)
  arrowBorderMode: boolean;    // if true, arrows are placed only on parcellation borders (M2-style)
  arrowDensity: number;        // geodesic Poisson minDistance, expressed as fraction of mesh radius (0..0.2)
  arrowScale: number;          // overall arrow size, fraction of mesh radius
  arrowHeight: number;         // u_arrowHeight (length scaling)
  arrowWidth: number;          // u_arrowWidth — head (max) width
  arrowBodyWidth: number;      // u_widthTails — body width as fraction of head width (0..1)
  arrowHeadFrac: number;       // u_arrowHeadFrac — fraction of total length occupied by the head (0..1); body fraction = 1 - this
  arrowDist: number;           // u_arrowDist (offset along normal)
  arrowOpacity: number;        // u_arrowOpacity
  arrowFlipDirection: boolean; // negate tangent in arrow shader
  arrowColorR: number;         // 0..1
  arrowColorG: number;
  arrowColorB: number;
  // Scene
  bgColorR: number;
  bgColorG: number;
  bgColorB: number;
  // Parcellation (TODO scaffolding — no UI control currently; see docs/TODO.md)
  parcelSmoothing: number;
  parcelRefinement: number;
  // Surface shading
  surfaceAmbient: number;      // 0..0.5
  surfaceDiffuse: number;      // 0..1.5
  surfaceSpecular: number;     // 0..1
  surfaceShininess: number;    // 1..400
  // Screenshot
  screenshotDPI: number;       // 72..1200; pixel scale = DPI / 96
  // Bookkeeping (no UI control)
  lastDatasetName: string | null; // name of the last user-uploaded dataset (display only)
  lastDatasetFiles: { ply: string; labels: string; labelorder: string } | null; // all three filenames (for status display)
}

export const defaultParams: Params = {
  showLIC: false,
  showColor: true,
  showArrows: true,
  useLabelColors: false,
  licIterations: 50,
  licHighContrast: true,
  licEmphasizeSingular: false,
  arrowCurved: false,
  arrowBorderMode: false,
  arrowDensity: 0.02,
  arrowScale: 0.008,
  arrowHeight: 1.3,
  arrowWidth: 0.9,
  arrowBodyWidth: 0.25,
  arrowHeadFrac: 0.25,
  arrowDist: 0.5,
  arrowOpacity: 0.72,
  arrowFlipDirection: true,
  arrowColorR: 0,
  arrowColorG: 0,
  arrowColorB: 0,
  bgColorR: 0.07,
  bgColorG: 0.07,
  bgColorB: 0.07,
  parcelSmoothing: 1,
  parcelRefinement: 0,
  surfaceAmbient: 0.04,
  surfaceDiffuse: 0.75,
  surfaceSpecular: 0.4,
  surfaceShininess: 80,
  screenshotDPI: 600,
  lastDatasetName: null,
  lastDatasetFiles: null,
};

export type OnChange = (params: Params, isExpensive: boolean) => void;
export type OnLoadDataset = (files: { ply: File; labels: File; labelorder: File }) => Promise<void>;
export type OnLoadBundled = (name: string) => Promise<void>;
export interface ScreenshotHooks {
  /** Capture the current view as a PNG with transparent background. */
  current: () => Promise<void>;
  /** Render and save the 6 canonical anatomical views (lateral L/R, dorsal, ventral, anterior, posterior). */
  canonical: () => Promise<void>;
}

export interface ViewHooks {
  set: (name: ViewName) => void;
}

export type ViewName =
  | "lateral-left" | "lateral-right"
  | "anterior" | "posterior"
  | "dorsal" | "ventral";

const STORAGE_KEY = "di-panel-params-v1";

/** Load any previously-saved params from localStorage and merge with defaults. */
export function loadStoredParams(): Params {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultParams };
    const parsed = JSON.parse(raw) as Partial<Params>;
    return { ...defaultParams, ...parsed };
  } catch {
    return { ...defaultParams };
  }
}

function saveParamsToStorage(params: Params): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // ignore — quota errors etc; not worth bothering the user over.
  }
}

/** Public version of saveParamsToStorage so non-panel code can persist edits. */
export function saveParams(params: Params): void {
  saveParamsToStorage(params);
}

/**
 * Render the "Loaded:" status block. Prefers the three-filename form when
 * available (set after any successful load), falls back to the single-name
 * display, then to a placeholder when no dataset has been loaded yet.
 */
function renderLoadedStatus(status: HTMLElement, params: Params): void {
  status.replaceChildren();
  if (params.lastDatasetFiles) {
    const f = params.lastDatasetFiles;
    const head = document.createElement("div");
    head.textContent = "Loaded:";
    status.appendChild(head);
    const list = document.createElement("div");
    list.style.paddingLeft = "8px";
    list.style.opacity = "0.9";
    for (const name of [f.ply, f.labels, f.labelorder]) {
      const line = document.createElement("div");
      line.textContent = name;
      list.appendChild(line);
    }
    status.appendChild(list);
    status.style.color = "var(--ok)";
  } else if (params.lastDatasetName) {
    status.textContent = `Loaded: ${params.lastDatasetName}`;
    status.style.color = "var(--ok)";
  } else {
    status.textContent = "Pick a .ply + .labels + .labelorder triple";
    status.style.color = "";
  }
}

interface ControlSpec {
  key: keyof Params;
  label: string;
  type: "range" | "checkbox" | "color";
  min?: number;
  max?: number;
  step?: number;
  /** Mark this control's changes as expensive — host should debounce. */
  expensive?: boolean;
}

const VISIBILITY_CONTROLS: ControlSpec[] = [
  { key: "showLIC", label: "LIC streamlines", type: "checkbox" },
  { key: "showColor", label: "Parcellation colors", type: "checkbox" },
  { key: "useLabelColors", label: "Use label-order palette (override PLY RGB)", type: "checkbox" },
  { key: "showArrows", label: "Arrows", type: "checkbox" },
];

const LIC_CONTROLS: ControlSpec[] = [
  { key: "licIterations", label: "Streamline length (iterations)", type: "range", min: 5, max: 100, step: 1 },
  { key: "licHighContrast", label: "High contrast", type: "checkbox" },
  { key: "licEmphasizeSingular", label: "Emphasize singularities", type: "checkbox" },
];

// Section now split into two parts: layout-level placement (above the
// designer) and per-glyph shape (inside the designer with a live preview).
const GLYPH_LAYOUT_CONTROLS: ControlSpec[] = [
  { key: "arrowBorderMode", label: "Borders only (M2 mode)", type: "checkbox", expensive: true },
  { key: "arrowDensity", label: "Density (smaller = denser)", type: "range", min: 0.02, max: 0.18, step: 0.005, expensive: true },
  { key: "arrowScale", label: "Size", type: "range", min: 0.002, max: 0.025, step: 0.0005, expensive: true },
  { key: "arrowDist", label: "Distance from surface", type: "range", min: 0, max: 5, step: 0.1 },
];

const GLYPH_DESIGNER_CONTROLS: ControlSpec[] = [
  { key: "arrowHeight", label: "Length", type: "range", min: 0.5, max: 8, step: 0.1, expensive: true },
  { key: "arrowWidth", label: "Head width", type: "range", min: 0.5, max: 4, step: 0.1 },
  { key: "arrowBodyWidth", label: "Body width (fraction of head)", type: "range", min: 0.05, max: 1, step: 0.02 },
  { key: "arrowOpacity", label: "Opacity", type: "range", min: 0, max: 1, step: 0.02 },
  { key: "arrowFlipDirection", label: "Flip direction", type: "checkbox" },
  { key: "arrowColorR", label: "Color", type: "color" },
];

const SCENE_CONTROLS: ControlSpec[] = [
  { key: "bgColorR", label: "Background", type: "color" },
];

const SURFACE_CONTROLS: ControlSpec[] = [
  { key: "surfaceAmbient", label: "Ambient", type: "range", min: 0, max: 0.5, step: 0.01 },
  { key: "surfaceDiffuse", label: "Diffuse", type: "range", min: 0, max: 1.5, step: 0.05 },
  { key: "surfaceSpecular", label: "Specular (glare)", type: "range", min: 0, max: 1, step: 0.02 },
  { key: "surfaceShininess", label: "Shininess (sharpness)", type: "range", min: 1, max: 400, step: 1 },
];

const COLLAPSE_STORAGE_KEY = "di-panel-collapsed-v1";

function loadCollapsedSections(): Set<string> {
  try {
    const raw = window.localStorage.getItem(COLLAPSE_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return new Set(parsed.filter((x): x is string => typeof x === "string"));
    return new Set();
  } catch {
    return new Set();
  }
}

function saveCollapsedSections(collapsed: Set<string>): void {
  try {
    window.localStorage.setItem(COLLAPSE_STORAGE_KEY, JSON.stringify(Array.from(collapsed)));
  } catch {
    // ignore storage errors
  }
}

function createControl(spec: ControlSpec, params: Params, onChange: () => void, expensive: boolean): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "panel-control";

  if (spec.type === "range") {
    const label = document.createElement("label");
    label.className = "panel-label";

    const labelText = document.createElement("span");
    labelText.className = "panel-label-text";
    labelText.textContent = spec.label;
    label.appendChild(labelText);

    const formatValue = (n: number): string =>
      spec.step !== undefined && String(spec.step).includes(".") ? n.toFixed(3) : String(n);

    // Editable value display: click to focus, type to override, Enter/blur to
    // commit, Escape to revert.
    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.className = "panel-value panel-value-input";
    valueInput.inputMode = "decimal";
    valueInput.spellcheck = false;
    valueInput.value = formatValue(params[spec.key] as unknown as number);
    valueInput.title = `Click to type a value (range: ${spec.min}–${spec.max})`;
    label.appendChild(valueInput);

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(spec.min);
    slider.max = String(spec.max);
    slider.step = String(spec.step);
    slider.value = String(params[spec.key]);

    const commit = (raw: number): void => {
      let v = raw;
      if (spec.min !== undefined && v < spec.min) v = spec.min;
      if (spec.max !== undefined && v > spec.max) v = spec.max;
      (params as unknown as Record<string, number>)[spec.key] = v;
      slider.value = String(v);
      valueInput.value = formatValue(v);
      onChange();
    };

    slider.addEventListener("input", () => commit(parseFloat(slider.value)));

    valueInput.addEventListener("focus", () => valueInput.select());
    valueInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const n = parseFloat(valueInput.value);
        if (Number.isFinite(n)) commit(n);
        else valueInput.value = formatValue(params[spec.key] as unknown as number);
        valueInput.blur();
      } else if (e.key === "Escape") {
        valueInput.value = formatValue(params[spec.key] as unknown as number);
        valueInput.blur();
      }
    });
    valueInput.addEventListener("blur", () => {
      const n = parseFloat(valueInput.value);
      if (Number.isFinite(n)) commit(n);
      else valueInput.value = formatValue(params[spec.key] as unknown as number);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(slider);
  } else if (spec.type === "checkbox") {
    // Inline row: checkbox + label on one line for tighter layout.
    wrapper.classList.add("checkbox-row");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = !!params[spec.key];
    input.id = `panel-cb-${String(spec.key)}`;
    input.addEventListener("change", () => {
      (params as unknown as Record<string, boolean>)[spec.key] = input.checked;
      onChange();
    });

    const label = document.createElement("label");
    label.className = "panel-label";
    label.htmlFor = input.id;
    const labelText = document.createElement("span");
    labelText.className = "panel-label-text";
    labelText.textContent = spec.label;
    label.appendChild(labelText);

    wrapper.appendChild(input);
    wrapper.appendChild(label);
  } else if (spec.type === "color") {
    const label = document.createElement("label");
    label.className = "panel-label";
    const labelText = document.createElement("span");
    labelText.className = "panel-label-text";
    labelText.textContent = spec.label;
    label.appendChild(labelText);

    // The key names the R component (e.g. "arrowColorR"); G and B are derived
    // by replacing the trailing R with G/B respectively.
    const baseKey = spec.key as string;
    const keyR = baseKey;
    const keyG = baseKey.replace(/R$/, "G");
    const keyB = baseKey.replace(/R$/, "B");
    const p = params as unknown as Record<string, number>;
    const input = document.createElement("input");
    input.type = "color";
    const rgb255 = (v: number): number => Math.max(0, Math.min(255, Math.round(v * 255)));
    const toHex = (r: number, g: number, b: number): string =>
      "#" + [r, g, b].map((x) => rgb255(x).toString(16).padStart(2, "0")).join("");
    input.value = toHex(p[keyR], p[keyG], p[keyB]);
    input.addEventListener("input", () => {
      const hex = input.value.slice(1);
      p[keyR] = parseInt(hex.slice(0, 2), 16) / 255;
      p[keyG] = parseInt(hex.slice(2, 4), 16) / 255;
      p[keyB] = parseInt(hex.slice(4, 6), 16) / 255;
      onChange();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
  }

  if (expensive) {
    const note = document.createElement("div");
    note.className = "panel-note";
    note.textContent = "Recomputed on release (~200 ms)";
    wrapper.appendChild(note);
  }

  return wrapper;
}

export function createPanel(
  params: Params,
  onChange: OnChange,
  onLoadDataset?: OnLoadDataset,
  screenshot?: ScreenshotHooks,
  views?: ViewHooks,
  onLoadBundled?: OnLoadBundled,
): { element: HTMLElement; toggle: () => void } {
  const root = document.createElement("div");
  root.id = "panel-root";

  const toggleBtn = document.createElement("button");
  toggleBtn.id = "panel-toggle";
  toggleBtn.title = "Toggle controls";
  toggleBtn.setAttribute("aria-label", "Toggle controls");
  // SVG chevron — points right (panel open: collapse to right). Rotates 180 when closed.
  toggleBtn.innerHTML =
    '<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M2.5 2L7.5 7L2.5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  const panel = document.createElement("div");
  panel.id = "panel";

  // Sticky header inside the panel: title + an explicit collapse button.
  // Provides an obvious affordance for hiding the whole panel; the edge
  // toggle stays as a redundant control.
  const titlebar = document.createElement("div");
  titlebar.id = "panel-titlebar";
  const titleText = document.createElement("span");
  titleText.id = "panel-title";
  titleText.textContent = "Controls";
  const collapseBtn = document.createElement("button");
  collapseBtn.id = "panel-collapse-btn";
  collapseBtn.type = "button";
  collapseBtn.title = "Hide controls";
  collapseBtn.setAttribute("aria-label", "Hide controls");
  collapseBtn.innerHTML =
    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";
  titlebar.appendChild(titleText);
  titlebar.appendChild(collapseBtn);
  panel.appendChild(titlebar);

  // Track collapse state across sessions.
  const collapsedSections = loadCollapsedSections();

  /**
   * Build a collapsible section: clickable heading + body wrapper.
   * Returns the body element so callers can append controls into it.
   */
  const makeSection = (id: string, title: string): HTMLElement => {
    const section = document.createElement("section");
    section.className = "panel-section";
    section.dataset.section = id;

    const heading = document.createElement("button");
    heading.type = "button";
    heading.className = "panel-heading";
    heading.setAttribute("aria-expanded", "true");

    const caret = document.createElement("span");
    caret.className = "panel-heading-caret";
    caret.textContent = "▾";

    const titleEl = document.createElement("span");
    titleEl.className = "panel-heading-title";
    titleEl.textContent = title;

    heading.appendChild(caret);
    heading.appendChild(titleEl);

    const bodyWrap = document.createElement("div");
    bodyWrap.className = "panel-section-body";
    const bodyInner = document.createElement("div");
    bodyInner.className = "panel-section-inner";
    bodyWrap.appendChild(bodyInner);

    const applyCollapsed = (collapsed: boolean): void => {
      section.classList.toggle("collapsed", collapsed);
      caret.textContent = collapsed ? "▸" : "▾";
      heading.setAttribute("aria-expanded", collapsed ? "false" : "true");
    };
    applyCollapsed(collapsedSections.has(id));

    heading.addEventListener("click", () => {
      const nowCollapsed = !section.classList.contains("collapsed");
      applyCollapsed(nowCollapsed);
      if (nowCollapsed) collapsedSections.add(id);
      else collapsedSections.delete(id);
      saveCollapsedSections(collapsedSections);
    });

    section.appendChild(heading);
    section.appendChild(bodyWrap);
    panel.appendChild(section);
    return bodyInner;
  };

  // ---- Data section (optional) ----
  if (onLoadDataset) {
    const body = makeSection("data", "Data");

    const status = document.createElement("div");
    status.className = "panel-note";
    renderLoadedStatus(status, params);
    body.appendChild(status);

    // Bundled-datasets selector (cloud-side files in public/data/). The
    // manifest is generated at build time by scripts/build-data-manifest.mjs;
    // we fetch it lazily so the panel still renders if it's missing.
    if (onLoadBundled) {
      const bundledRow = document.createElement("div");
      bundledRow.className = "panel-control";
      const bundledLabel = document.createElement("div");
      bundledLabel.className = "panel-label-text";
      bundledLabel.textContent = "Bundled datasets";
      const select = document.createElement("select");
      select.className = "panel-select";
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Loading…";
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
      bundledRow.appendChild(bundledLabel);
      bundledRow.appendChild(select);
      body.appendChild(bundledRow);

      // Track current selection so we can restore it after a failed load.
      let lastSelected = "";
      void (async () => {
        try {
          const r = await fetch(`${import.meta.env.BASE_URL}data/manifest.json`);
          if (!r.ok) throw new Error(`manifest ${r.status}`);
          const j = (await r.json()) as { datasets: string[] };
          select.replaceChildren();
          const ph = document.createElement("option");
          ph.value = "";
          ph.textContent = "Pick a bundled dataset…";
          ph.disabled = true;
          ph.selected = true;
          select.appendChild(ph);
          for (const name of j.datasets) {
            const opt = document.createElement("option");
            opt.value = name;
            opt.textContent = name;
            select.appendChild(opt);
          }
        } catch {
          select.replaceChildren();
          const ph = document.createElement("option");
          ph.textContent = "(no manifest)";
          ph.disabled = true;
          ph.selected = true;
          select.appendChild(ph);
        }
      })();

      select.addEventListener("change", async () => {
        const name = select.value;
        if (!name || name === lastSelected) return;
        status.textContent = `Loading ${name}…`;
        status.style.color = "var(--text-mute)";
        try {
          await onLoadBundled(name);
          params.lastDatasetName = `${name}.ply`;
          params.lastDatasetFiles = {
            ply: `${name}.ply`,
            labels: `${name}.labels`,
            labelorder: `${name}.labelorder`,
          };
          saveParamsToStorage(params);
          renderLoadedStatus(status, params);
          lastSelected = name;
        } catch (e) {
          status.textContent = "Error: " + (e instanceof Error ? e.message : String(e));
          status.style.color = "var(--danger)";
          select.value = lastSelected;
        }
      });
    }

    const row = document.createElement("div");
    row.className = "panel-file-row";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = ".ply,.labels,.labelorder";
    fileInput.id = "panel-file-input";
    fileInput.className = "panel-file-input";

    const fileLabel = document.createElement("label");
    fileLabel.htmlFor = fileInput.id;
    fileLabel.className = "panel-file-label";
    fileLabel.innerHTML = '<span class="icon" aria-hidden="true">⬆</span><span>Or upload local files…</span>';

    fileInput.addEventListener("change", async () => {
      if (!fileInput.files) return;
      const files = Array.from(fileInput.files);
      const ply = files.find((f) => f.name.toLowerCase().endsWith(".ply"));
      const labelsFile = files.find((f) => f.name.toLowerCase().endsWith(".labels"));
      const labelorderFile = files.find((f) => f.name.toLowerCase().endsWith(".labelorder"));
      if (!ply || !labelsFile || !labelorderFile) {
        status.textContent = "Need exactly one .ply, .labels, and .labelorder";
        status.style.color = "var(--danger)";
        return;
      }
      status.textContent = "Loading…";
      status.style.color = "var(--text-mute)";
      try {
        await onLoadDataset({ ply, labels: labelsFile, labelorder: labelorderFile });
        params.lastDatasetName = ply.name;
        params.lastDatasetFiles = {
          ply: ply.name,
          labels: labelsFile.name,
          labelorder: labelorderFile.name,
        };
        saveParamsToStorage(params);
        renderLoadedStatus(status, params);
      } catch (e) {
        status.textContent = "Error: " + (e instanceof Error ? e.message : String(e));
        status.style.color = "var(--danger)";
      }
    });

    row.appendChild(fileInput);
    row.appendChild(fileLabel);
    body.appendChild(row);
  }

  let dirtyExpensive = false;
  let debounceTimer: number | null = null;
  const fire = (): void => {
    saveParamsToStorage(params);
    if (dirtyExpensive) {
      if (debounceTimer !== null) clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        debounceTimer = null;
        const wasExpensive = dirtyExpensive;
        dirtyExpensive = false;
        onChange(params, wasExpensive);
      }, 250);
      onChange(params, false);
    } else {
      onChange(params, false);
    }
  };

  if (views) {
    const viewBody = makeSection("view", "View");
    const viewGrid = document.createElement("div");
    viewGrid.className = "panel-view-grid";
    const presets: { name: ViewName; label: string }[] = [
      { name: "lateral-left", label: "Lateral L" },
      { name: "lateral-right", label: "Lateral R" },
      { name: "anterior", label: "Anterior" },
      { name: "posterior", label: "Posterior" },
      { name: "dorsal", label: "Dorsal" },
      { name: "ventral", label: "Ventral" },
    ];
    for (const p of presets) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "panel-view-btn";
      btn.textContent = p.label;
      btn.addEventListener("click", () => views.set(p.name));
      viewGrid.appendChild(btn);
    }
    viewBody.appendChild(viewGrid);
    const note = document.createElement("div");
    note.className = "panel-note";
    note.textContent = "Or rotate freely with mouse drag. Position auto-saves.";
    viewBody.appendChild(note);
  }

  const visibilityBody = makeSection("visibility", "Visibility");
  for (const c of VISIBILITY_CONTROLS) {
    visibilityBody.appendChild(createControl(c, params, fire, false));
  }

  const licBody = makeSection("lic", "LIC");
  for (const c of LIC_CONTROLS) {
    licBody.appendChild(createControl(c, params, fire, false));
  }

  const sceneBody = makeSection("scene", "Scene");
  for (const c of SCENE_CONTROLS) {
    sceneBody.appendChild(createControl(c, params, fire, false));
  }

  const surfaceBody = makeSection("surface", "Surface shading");
  for (const c of SURFACE_CONTROLS) {
    surfaceBody.appendChild(createControl(c, params, fire, false));
  }

  // ---- Glyphs section ----
  // Top of the section: layout-level placement controls (where & how dense).
  // Below them: a "Glyph designer" sub-block with a live SVG preview and the
  // shape-shaping controls (length, head width, body width, opacity, flip,
  // color). The preview re-renders on every shape-control change so users can
  // see the glyph evolve before scrolling back up to the brain.
  const glyphsBody = makeSection("arrows", "Glyphs");

  for (const c of GLYPH_LAYOUT_CONTROLS) {
    const isExpensive = !!c.expensive;
    glyphsBody.appendChild(
      createControl(c, params, () => {
        if (isExpensive) dirtyExpensive = true;
        fire();
      }, isExpensive),
    );
  }

  // ---- Glyph designer (sub-block with preview) ----
  const designer = document.createElement("div");
  designer.className = "glyph-designer";

  const designerHeading = document.createElement("div");
  designerHeading.className = "glyph-designer-heading";
  designerHeading.textContent = "Glyph designer";
  designer.appendChild(designerHeading);

  const previewWrap = document.createElement("div");
  previewWrap.className = "glyph-preview-wrap";
  const SVG_NS = "http://www.w3.org/2000/svg";
  const previewSvg = document.createElementNS(SVG_NS, "svg");
  // Wide viewBox so the horizontal glyph (head pointing right) uses the space
  // efficiently, leaving comfortable margins for the longest configurations.
  previewSvg.setAttribute("viewBox", "-80 -45 160 90");
  previewSvg.setAttribute("class", "glyph-preview");
  previewSvg.setAttribute("aria-label", "Glyph preview");
  // Inner group that we transform: rotate -90° (head points right) by default,
  // additional 180° when flip-direction is on (head points left).
  const previewGroup = document.createElementNS(SVG_NS, "g");
  previewGroup.setAttribute("class", "glyph-preview-group");
  // Horizontal centerline so users can see the glyph's flow axis.
  const baseline = document.createElementNS(SVG_NS, "line");
  baseline.setAttribute("x1", "-76");
  baseline.setAttribute("x2", "76");
  baseline.setAttribute("y1", "0");
  baseline.setAttribute("y2", "0");
  baseline.setAttribute("stroke", "rgba(128,128,128,0.25)");
  baseline.setAttribute("stroke-dasharray", "2 3");
  previewSvg.appendChild(baseline);
  previewSvg.appendChild(previewGroup);
  // Polygon (body + head) drawn as a single closed path so opacity blends
  // correctly without a seam at the body/head boundary.
  const glyphPath = document.createElementNS(SVG_NS, "path");
  glyphPath.setAttribute("stroke-linejoin", "round");
  previewGroup.appendChild(glyphPath);
  previewWrap.appendChild(previewSvg);
  designer.appendChild(previewWrap);

  const renderPreview = (): void => {
    // Map slider values into SVG units. Scales chosen so defaults sit
    // comfortably inside the 160×90 viewBox and the slider maxes only clip
    // slightly at extremes. Drawing internally treats the arrow as
    // up-pointing; the previewGroup rotation re-orients it horizontally.
    const lengthFactor = 12;
    const widthFactor = 12;
    const fullLength = 2 * params.arrowHeight * lengthFactor;
    const headWidth = params.arrowWidth * widthFactor;
    const bodyWidth = headWidth * params.arrowBodyWidth;
    const halfL = fullLength / 2;
    const headHeight = fullLength * params.arrowHeadFrac;
    const headBaseY = -halfL + headHeight;
    const bodyBottomY = halfL;
    const halfBW = bodyWidth / 2;
    const halfHW = headWidth / 2;
    const d =
      `M ${-halfBW} ${bodyBottomY} ` +
      `L ${-halfBW} ${headBaseY} ` +
      `L ${-halfHW} ${headBaseY} ` +
      `L 0 ${-halfL} ` +
      `L ${halfHW} ${headBaseY} ` +
      `L ${halfBW} ${headBaseY} ` +
      `L ${halfBW} ${bodyBottomY} Z`;
    glyphPath.setAttribute("d", d);
    const r = Math.round(params.arrowColorR * 255);
    const g = Math.round(params.arrowColorG * 255);
    const b = Math.round(params.arrowColorB * 255);
    glyphPath.setAttribute("fill", `rgb(${r}, ${g}, ${b})`);
    glyphPath.setAttribute("fill-opacity", String(params.arrowOpacity));
    // Stroke contrasts mildly with the glyph for definition.
    glyphPath.setAttribute("stroke", "rgba(128,128,128,0.45)");
    glyphPath.setAttribute("stroke-width", "0.6");
    // Default rotation -90° (head points right); flip toggles +180°.
    const rot = params.arrowFlipDirection ? 90 : -90;
    previewGroup.setAttribute("transform", `rotate(${rot})`);
    // Contrast background: dark glyph → light bg, light glyph → dark bg.
    // Rec. 601 luminance approximation in the linear-ish slider RGB space.
    const lum = 0.299 * params.arrowColorR + 0.587 * params.arrowColorG + 0.114 * params.arrowColorB;
    const bg = lum > 0.5 ? "rgba(28, 28, 28, 0.92)" : "rgba(238, 238, 238, 0.95)";
    previewWrap.style.backgroundColor = bg;
    // Flip the centerline color to keep it visible against either bg.
    baseline.setAttribute("stroke", lum > 0.5 ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)");
  };

  // Coupled body/head fraction sliders. They share `arrowHeadFrac`: body =
  // 1 - head, head = head. Slider min/max clamps avoid degenerate (zero-
  // length) head or body, which would also divide-by-zero in the shader.
  const buildFractionPair = (): DocumentFragment => {
    const frag = document.createDocumentFragment();
    const minFrac = 0.05;
    const maxFrac = 0.95;
    const stepFrac = 0.01;

    const formatFrac = (n: number): string => n.toFixed(2);
    const clamp = (v: number): number => Math.max(minFrac, Math.min(maxFrac, v));

    interface FractionSlider {
      wrap: HTMLElement;
      slider: HTMLInputElement;
      input: HTMLInputElement;
    }
    const makeSlider = (label: string): FractionSlider => {
      const wrap = document.createElement("div");
      wrap.className = "panel-control";
      const lbl = document.createElement("label");
      lbl.className = "panel-label";
      const txt = document.createElement("span");
      txt.className = "panel-label-text";
      txt.textContent = label;
      lbl.appendChild(txt);

      // Editable value input — same pattern as createControl's range type so
      // typed numbers commit via Enter/blur and Escape reverts.
      const input = document.createElement("input");
      input.type = "text";
      input.className = "panel-value panel-value-input";
      input.inputMode = "decimal";
      input.spellcheck = false;
      input.title = `Click to type a value (range: ${minFrac}–${maxFrac})`;
      lbl.appendChild(input);

      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = String(minFrac);
      slider.max = String(maxFrac);
      slider.step = String(stepFrac);
      wrap.appendChild(lbl);
      wrap.appendChild(slider);
      return { wrap, slider, input };
    };

    const bodyControl = makeSlider("Body length (fraction)");
    const headControl = makeSlider("Head length (fraction)");

    const sync = (): void => {
      const body = 1 - params.arrowHeadFrac;
      const head = params.arrowHeadFrac;
      bodyControl.slider.value = String(body);
      bodyControl.input.value = formatFrac(body);
      headControl.slider.value = String(head);
      headControl.input.value = formatFrac(head);
    };
    sync();

    // Single commit point for either slider perspective. `isHead` distinguishes
    // which raw value was supplied: the head fraction directly, or the body
    // fraction (1 - head).
    const commit = (raw: number, isHead: boolean): void => {
      const headFrac = clamp(isHead ? raw : 1 - raw);
      params.arrowHeadFrac = headFrac;
      sync();
      fire();
      renderPreview();
    };

    // Wire slider drag inputs.
    bodyControl.slider.addEventListener("input", () =>
      commit(parseFloat(bodyControl.slider.value), false),
    );
    headControl.slider.addEventListener("input", () =>
      commit(parseFloat(headControl.slider.value), true),
    );

    // Wire editable text inputs (Enter/blur commit, Escape revert, focus selects).
    const wireTextInput = (input: HTMLInputElement, isHead: boolean): void => {
      input.addEventListener("focus", () => input.select());
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const n = parseFloat(input.value);
          if (Number.isFinite(n)) commit(n, isHead);
          else sync();
          input.blur();
        } else if (e.key === "Escape") {
          sync();
          input.blur();
        }
      });
      input.addEventListener("blur", () => {
        const n = parseFloat(input.value);
        if (Number.isFinite(n)) commit(n, isHead);
        else sync();
      });
    };
    wireTextInput(bodyControl.input, false);
    wireTextInput(headControl.input, true);

    frag.appendChild(bodyControl.wrap);
    frag.appendChild(headControl.wrap);
    return frag;
  };

  // Render the existing ControlSpec controls, splicing the body/head
  // fraction pair in right after Length so it reads as a length-related set.
  for (const c of GLYPH_DESIGNER_CONTROLS) {
    const isExpensive = !!c.expensive;
    designer.appendChild(
      createControl(c, params, () => {
        if (isExpensive) dirtyExpensive = true;
        fire();
        renderPreview();
      }, isExpensive),
    );
    if (c.key === "arrowHeight") {
      designer.appendChild(buildFractionPair());
    }
  }
  // Initial paint.
  renderPreview();
  glyphsBody.appendChild(designer);

  // ---- Screenshot section (optional) ----
  if (screenshot) {
    const screenshotBody = makeSection("screenshot", "Screenshot");

    const note = document.createElement("div");
    note.className = "panel-note";
    note.textContent = "Saves PNG with transparent background";
    screenshotBody.appendChild(note);

    const dpiSpec: ControlSpec = {
      key: "screenshotDPI",
      label: "Resolution (DPI)",
      type: "range",
      min: 72,
      max: 1200,
      step: 6,
    };
    screenshotBody.appendChild(createControl(dpiSpec, params, fire, false));

    const captureBtn = document.createElement("button");
    captureBtn.type = "button";
    captureBtn.className = "panel-btn";
    captureBtn.innerHTML = '<span class="icon" aria-hidden="true">⤓</span><span>Current view</span>';
    captureBtn.addEventListener("click", async () => {
      captureBtn.disabled = true;
      try { await screenshot.current(); } finally { captureBtn.disabled = false; }
    });
    screenshotBody.appendChild(captureBtn);

    const allBtn = document.createElement("button");
    allBtn.type = "button";
    allBtn.className = "panel-btn";
    allBtn.style.marginTop = "8px";
    allBtn.innerHTML = '<span class="icon" aria-hidden="true">▦</span><span>All canonical views</span>';
    allBtn.addEventListener("click", async () => {
      allBtn.disabled = true;
      try { await screenshot.canonical(); } finally { allBtn.disabled = false; }
    });
    screenshotBody.appendChild(allBtn);
  }

  // Reset button at the bottom — clears localStorage and reloads.
  const resetWrapper = document.createElement("div");
  resetWrapper.className = "panel-control";
  resetWrapper.style.marginTop = "22px";
  const resetBtn = document.createElement("button");
  resetBtn.id = "panel-reset";
  resetBtn.type = "button";
  resetBtn.innerHTML = '<span class="icon" aria-hidden="true">↻</span><span>Reset to defaults</span>';
  resetBtn.addEventListener("click", async () => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    try { window.localStorage.removeItem(COLLAPSE_STORAGE_KEY); } catch { /* ignore */ }
    try { window.localStorage.removeItem("di-camera-state-v1"); } catch { /* ignore */ }
    await clearDataset(); // wipe the cached PLY/labels/labelorder so default re-seeds
    window.location.reload();
  });
  resetWrapper.appendChild(resetBtn);
  panel.appendChild(resetWrapper);

  let open = true;
  const setOpen = (next: boolean): void => {
    open = next;
    panel.classList.toggle("closed", !open);
    toggleBtn.classList.toggle("closed", !open);
    toggleBtn.title = open ? "Hide controls" : "Show controls";
    toggleBtn.setAttribute("aria-label", open ? "Hide controls" : "Show controls");
  };
  toggleBtn.addEventListener("click", () => setOpen(!open));
  collapseBtn.addEventListener("click", () => setOpen(false));
  setOpen(true);

  root.appendChild(toggleBtn);
  root.appendChild(panel);

  return { element: root, toggle: () => setOpen(!open) };
}
