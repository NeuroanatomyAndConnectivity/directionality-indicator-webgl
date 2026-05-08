# M1: Boot + Data Load + Textured Mesh Render — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Boot a TypeScript+Vite+WebGL2 project under `web/`, load the demo brain mesh from `example/label34.{ply,labels,labelorder}`, and render it on screen with per-region colors and an interactive trackball camera. No LIC, no arrows yet.

**Architecture:** Vite project under `web/` parallel to the existing C++ `src/` (which stays as a read-only reference). Raw WebGL2 with a thin imperative TS wrapper that mirrors the original `gfx/` layer. Imperative single-file pipeline in `app.ts`; no scene-graph framework, no observer/parameter scaffolding.

**Tech Stack:** TypeScript 5.x, Vite 5.x, vitest 1.x, gl-matrix 3.x, WebGL2.

**Reference spec:** `docs/superpowers/specs/2026-05-08-directionality-indicator-web-port-design.md`

---

## File Structure (created in this milestone)

```
web/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/data/
│   ├── label34.ply           (copied from ../example/)
│   ├── label34.labels
│   └── label34.labelorder
└── src/
    ├── main.ts                          (entry point)
    ├── app.ts                           (top-level pipeline orchestrator)
    ├── io/
    │   ├── plyReader.ts
    │   ├── plyReader.test.ts
    │   ├── labelReader.ts
    │   ├── labelReader.test.ts
    │   ├── labelOrderReader.ts
    │   └── labelOrderReader.test.ts
    ├── algorithms/
    │   ├── regionColors.ts              (build per-vertex RGBA from labels + labelorder)
    │   └── regionColors.test.ts
    ├── gfx/
    │   ├── view.ts                      (canvas + GL ctx + render loop)
    │   ├── buffer.ts                    (VBO/IBO/VAO wrappers)
    │   ├── program.ts                   (shader compile + link)
    │   └── camera.ts                    (trackball camera)
    └── shaders/
        ├── mesh.vert.glsl
        └── mesh.frag.glsl
```

**Each file has one responsibility.** Parsers do parsing; gfx wrappers wrap GL calls; algorithms transform data; `app.ts` orchestrates.

---

## Pre-Task: Branch + worktree (optional, skip if working on master)

If using a worktree per `superpowers:using-git-worktrees`, set it up now. Otherwise stay on master.

---

## Task 1: Bootstrap Vite project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `web/.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "directionality-indicator-web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "gl-matrix": "^3.4.3"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "vitest": "^1.5.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vite/client"]
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `vite.config.ts`**

```ts
import { defineConfig } from "vite";

export default defineConfig({
  assetsInclude: ["**/*.glsl"],
  server: { port: 5173, open: true },
  build: { target: "es2022", sourcemap: true },
});
```

(GLSL files import as raw text via Vite's built-in `?raw` query suffix.)

- [ ] **Step 4: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Directionality Indicator</title>
    <style>
      html, body { margin: 0; padding: 0; height: 100%; background: #111; color: #eee; font-family: sans-serif; }
      #app { position: fixed; inset: 0; }
      canvas { display: block; width: 100%; height: 100%; }
      #banner { position: fixed; top: 0; left: 0; right: 0; padding: 12px; background: #c33; color: #fff; display: none; }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <div id="banner"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 5: Create `web/.gitignore`**

```
node_modules
dist
.vite
.DS_Store
```

- [ ] **Step 6: Install dependencies**

Run from `web/`:
```bash
cd web && npm install
```
Expected: dependencies install without errors. `package-lock.json` is created.

- [ ] **Step 7: Verify dev server starts and serves blank page**

Run:
```bash
cd web && npm run dev
```
Expected: Vite serves on `http://localhost:5173`. The page loads with a dark-grey background. Browser console has no errors.

Stop the dev server (Ctrl-C).

- [ ] **Step 8: Commit**

```bash
git add package.json web/package-lock.json tsconfig.json vite.config.ts index.html web/.gitignore
git commit -m "[ADD] web/ Vite + TypeScript project bootstrap"
```

---

## Task 2: Copy demo data into public/

**Files:**
- Create: `public/data/label34.ply` (copy)
- Create: `public/data/label34.labels` (copy)
- Create: `public/data/label34.labelorder` (copy)

- [ ] **Step 1: Copy the three demo files**

```bash
mkdir -p public/data
cp example/label34.ply public/data/label34.ply
cp example/label34.labels public/data/label34.labels
cp example/label34.labelorder public/data/label34.labelorder
```

- [ ] **Step 2: Verify files**

```bash
ls -l public/data/
```
Expected: three files. `label34.ply` is ~2.3 MB, `label34.labels` ~85 KB, `label34.labelorder` ~93 bytes.

- [ ] **Step 3: Commit**

```bash
git add public/data/
git commit -m "[ADD] public/data: demo dataset for browser fetch"
```

---

## Task 3: PLY parser (TDD)

The demo PLY is verified ASCII format with float xyz, uchar rgb, and `list uchar int vertex_indices` faces.

**Files:**
- Create: `src/io/plyReader.ts`
- Create: `src/io/plyReader.test.ts`
- Create: `src/io/__fixtures__/cube.ply`

- [ ] **Step 1: Create golden-file fixture `src/io/__fixtures__/cube.ply`**

```
ply
format ascii 1.0
element vertex 8
property float x
property float y
property float z
property uchar red
property uchar green
property uchar blue
element face 12
property list uchar int vertex_indices
end_header
0 0 0 255 0 0
1 0 0 0 255 0
1 1 0 0 0 255
0 1 0 255 255 0
0 0 1 255 0 255
1 0 1 0 255 255
1 1 1 128 128 128
0 1 1 64 64 64
3 0 1 2
3 0 2 3
3 4 6 5
3 4 7 6
3 0 4 5
3 0 5 1
3 1 5 6
3 1 6 2
3 2 6 7
3 2 7 3
3 3 7 4
3 3 4 0
```

- [ ] **Step 2: Write the failing test `src/io/plyReader.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parsePly } from "./plyReader";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixture = (name: string) => readFileSync(join(__dirname, "__fixtures__", name), "utf-8");

describe("parsePly", () => {
  it("parses ASCII cube with rgb colors and triangle faces", () => {
    const mesh = parsePly(fixture("cube.ply"));
    expect(mesh.vertices.length).toBe(8 * 3);
    expect(mesh.colors).not.toBeNull();
    expect(mesh.colors!.length).toBe(8 * 3);
    expect(mesh.indices.length).toBe(12 * 3);
    // First vertex: (0,0,0) red
    expect(Array.from(mesh.vertices.slice(0, 3))).toEqual([0, 0, 0]);
    expect(Array.from(mesh.colors!.slice(0, 3))).toEqual([255, 0, 0]);
    // First face: 0,1,2
    expect(Array.from(mesh.indices.slice(0, 3))).toEqual([0, 1, 2]);
    expect(mesh.normals).toBeNull();
  });

  it("throws on missing magic", () => {
    expect(() => parsePly("not a ply file")).toThrow(/PLY/);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
cd web && npm test -- src/io/plyReader.test.ts
```
Expected: FAIL — `Cannot find module './plyReader'`.

- [ ] **Step 4: Implement `src/io/plyReader.ts`**

```ts
export interface ParsedMesh {
  vertices: Float32Array;
  normals: Float32Array | null;
  colors: Uint8Array | null;
  indices: Uint32Array;
}

interface PropertyDef {
  type: "float" | "uchar" | "int" | "uint" | "list";
  name: string;
  countType?: string;
  itemType?: string;
}

interface ElementDef {
  name: string;
  count: number;
  properties: PropertyDef[];
}

export function parsePly(text: string): ParsedMesh {
  const lines = text.split(/\r?\n/);
  if (lines[0] !== "ply") throw new Error("Not a PLY file (missing 'ply' magic)");
  if (!lines[1] || !lines[1].startsWith("format ascii"))
    throw new Error("Only ASCII PLY is supported in M1");

  const elements: ElementDef[] = [];
  let i = 2;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line === "end_header") { i++; break; }
    if (line.startsWith("comment") || line === "") { i++; continue; }
    if (line.startsWith("element ")) {
      const [, name, count] = line.split(/\s+/);
      elements.push({ name, count: parseInt(count, 10), properties: [] });
    } else if (line.startsWith("property ")) {
      const parts = line.split(/\s+/);
      if (parts[1] === "list") {
        elements[elements.length - 1].properties.push({
          type: "list", countType: parts[2], itemType: parts[3], name: parts[4],
        });
      } else {
        elements[elements.length - 1].properties.push({
          type: parts[1] as PropertyDef["type"], name: parts[2],
        });
      }
    }
    i++;
  }

  const vertexElement = elements.find((e) => e.name === "vertex");
  const faceElement = elements.find((e) => e.name === "face");
  if (!vertexElement) throw new Error("PLY: no vertex element");
  if (!faceElement) throw new Error("PLY: no face element");

  const vertices = new Float32Array(vertexElement.count * 3);
  const xIdx = vertexElement.properties.findIndex((p) => p.name === "x");
  const rIdx = vertexElement.properties.findIndex((p) => p.name === "red");
  const hasColor = rIdx >= 0;
  const colors = hasColor ? new Uint8Array(vertexElement.count * 3) : null;

  for (let v = 0; v < vertexElement.count; v++, i++) {
    const tokens = lines[i].trim().split(/\s+/);
    vertices[v * 3 + 0] = parseFloat(tokens[xIdx + 0]);
    vertices[v * 3 + 1] = parseFloat(tokens[xIdx + 1]);
    vertices[v * 3 + 2] = parseFloat(tokens[xIdx + 2]);
    if (colors) {
      colors[v * 3 + 0] = parseInt(tokens[rIdx + 0], 10);
      colors[v * 3 + 1] = parseInt(tokens[rIdx + 1], 10);
      colors[v * 3 + 2] = parseInt(tokens[rIdx + 2], 10);
    }
  }

  const indicesArr: number[] = [];
  for (let f = 0; f < faceElement.count; f++, i++) {
    const tokens = lines[i].trim().split(/\s+/);
    const n = parseInt(tokens[0], 10);
    if (n !== 3) throw new Error(`PLY: only triangle faces supported (got ${n}-gon at face ${f})`);
    indicesArr.push(parseInt(tokens[1], 10), parseInt(tokens[2], 10), parseInt(tokens[3], 10));
  }

  return {
    vertices,
    normals: null,
    colors,
    indices: new Uint32Array(indicesArr),
  };
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
cd web && npm test -- src/io/plyReader.test.ts
```
Expected: PASS, 2 tests.

- [ ] **Step 6: Smoke-test on real demo file**

Add a temporary one-off check (run, then revert):
```bash
cd web && node --experimental-vm-modules -e "
import('./node_modules/vitest/dist/index.js').then(async () => {
  const { parsePly } = await import('./src/io/plyReader.ts');
  const fs = await import('node:fs');
  const t = fs.readFileSync('public/data/label34.ply', 'utf-8');
  const m = parsePly(t);
  console.log('vertices:', m.vertices.length / 3, 'indices:', m.indices.length / 3, 'hasColor:', !!m.colors);
});" 2>/dev/null || true
```
A simpler manual check is to add a test that loads `public/data/label34.ply` and asserts `mesh.vertices.length === 32492 * 3 && mesh.indices.length === 64980 * 3`. Add it to the test file:

```ts
  it("parses real label34.ply demo file", () => {
    const text = readFileSync(join(__dirname, "../..", "public", "data", "label34.ply"), "utf-8");
    const mesh = parsePly(text);
    expect(mesh.vertices.length).toBe(32492 * 3);
    expect(mesh.indices.length).toBe(64980 * 3);
    expect(mesh.colors).not.toBeNull();
  });
```

Re-run:
```bash
cd web && npm test -- src/io/plyReader.test.ts
```
Expected: PASS, 3 tests.

- [ ] **Step 7: Commit**

```bash
git add src/io/plyReader.ts src/io/plyReader.test.ts src/io/__fixtures__/cube.ply
git commit -m "[ADD] ASCII PLY parser with golden-file + real-data tests"
```

---

## Task 4: Labels + LabelOrder parsers (TDD)

The original `RegionLabelReader.cpp` accepts both `.labels` and `.labelorder` as the same format: comma-or-whitespace-separated integers, one per line. We split into two TS files for clarity since they have different *meaning* (per-vertex region IDs vs region display order), even if format is identical.

**Files:**
- Create: `src/io/labelReader.ts` (per-vertex region IDs from `.labels`)
- Create: `src/io/labelReader.test.ts`
- Create: `src/io/labelOrderReader.ts` (region display order from `.labelorder`)
- Create: `src/io/labelOrderReader.test.ts`
- Create: `src/io/__fixtures__/tiny.labels`
- Create: `src/io/__fixtures__/tiny.labelorder`

- [ ] **Step 1: Create fixture `src/io/__fixtures__/tiny.labels`**

```
1
2
1
3
2
```

- [ ] **Step 2: Create fixture `src/io/__fixtures__/tiny.labelorder`**

```
3
1
2
```

- [ ] **Step 3: Write the failing tests**

`src/io/labelReader.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseLabels } from "./labelReader";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("parseLabels", () => {
  it("parses per-vertex region IDs", () => {
    const text = readFileSync(join(__dirname, "__fixtures__", "tiny.labels"), "utf-8");
    const result = parseLabels(text);
    expect(Array.from(result)).toEqual([1, 2, 1, 3, 2]);
  });

  it("parses real label34.labels demo file", () => {
    const text = readFileSync(join(__dirname, "../..", "public", "data", "label34.labels"), "utf-8");
    const result = parseLabels(text);
    expect(result.length).toBe(32492);
  });
});
```

`src/io/labelOrderReader.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseLabelOrder } from "./labelOrderReader";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("parseLabelOrder", () => {
  it("parses display-order region IDs", () => {
    const text = readFileSync(join(__dirname, "__fixtures__", "tiny.labelorder"), "utf-8");
    const result = parseLabelOrder(text);
    expect(Array.from(result)).toEqual([3, 1, 2]);
  });

  it("parses real label34.labelorder demo file (34 regions)", () => {
    const text = readFileSync(join(__dirname, "../..", "public", "data", "label34.labelorder"), "utf-8");
    const result = parseLabelOrder(text);
    expect(result.length).toBe(34);
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

```bash
cd web && npm test -- src/io/labelReader.test.ts src/io/labelOrderReader.test.ts
```
Expected: FAIL on both — modules not found.

- [ ] **Step 5: Implement `src/io/labelReader.ts`**

```ts
export function parseLabels(text: string): Int32Array {
  return parseIntList(text);
}

function parseIntList(text: string): Int32Array {
  const tokens = text.split(/[,\s]+/).filter((t) => t.length > 0);
  const out = new Int32Array(tokens.length);
  for (let i = 0; i < tokens.length; i++) {
    const n = parseInt(tokens[i], 10);
    if (Number.isNaN(n)) throw new Error(`labels: non-integer token at index ${i}: "${tokens[i]}"`);
    out[i] = n;
  }
  return out;
}

// Exported for reuse by labelOrderReader.
export const _parseIntList = parseIntList;
```

- [ ] **Step 6: Implement `src/io/labelOrderReader.ts`**

```ts
import { _parseIntList } from "./labelReader";

export function parseLabelOrder(text: string): Int32Array {
  return _parseIntList(text);
}
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
cd web && npm test -- src/io/labelReader.test.ts src/io/labelOrderReader.test.ts
```
Expected: PASS, 4 tests total.

- [ ] **Step 8: Commit**

```bash
git add src/io/labelReader.ts src/io/labelReader.test.ts \
        src/io/labelOrderReader.ts src/io/labelOrderReader.test.ts \
        src/io/__fixtures__/tiny.labels src/io/__fixtures__/tiny.labelorder
git commit -m "[ADD] labels + labelorder parsers with fixtures and demo-data tests"
```

---

## Task 5: Region color lookup (TDD)

Each region ID gets a deterministic RGBA color. The original C++ generates colors from a palette indexed by labelorder position so adjacent regions in display-order get visually distinct colors. Reproduce that.

**Files:**
- Create: `src/algorithms/regionColors.ts`
- Create: `src/algorithms/regionColors.test.ts`

- [ ] **Step 1: Write the failing test `src/algorithms/regionColors.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { buildVertexColors } from "./regionColors";

describe("buildVertexColors", () => {
  it("assigns distinct color per region ID", () => {
    // 5 vertices, regions [1,2,1,3,2], display order [3,1,2]
    const labels = new Int32Array([1, 2, 1, 3, 2]);
    const order = new Int32Array([3, 1, 2]);
    const colors = buildVertexColors(labels, order);
    expect(colors.length).toBe(5 * 4); // RGBA per vertex
    // Vertices 0 and 2 share region 1 → same color.
    expect(Array.from(colors.slice(0, 4))).toEqual(Array.from(colors.slice(8, 12)));
    // Vertices 1 and 4 share region 2 → same color.
    expect(Array.from(colors.slice(4, 8))).toEqual(Array.from(colors.slice(16, 20)));
    // Region 1 ≠ region 2.
    expect(Array.from(colors.slice(0, 3))).not.toEqual(Array.from(colors.slice(4, 7)));
  });

  it("alpha is always 255", () => {
    const colors = buildVertexColors(new Int32Array([1, 2, 3]), new Int32Array([1, 2, 3]));
    expect(colors[3]).toBe(255);
    expect(colors[7]).toBe(255);
    expect(colors[11]).toBe(255);
  });

  it("unmapped region IDs get grey fallback", () => {
    // Region 99 is not in labelorder → grey RGBA(128,128,128,255).
    const colors = buildVertexColors(new Int32Array([99]), new Int32Array([1, 2, 3]));
    expect(Array.from(colors)).toEqual([128, 128, 128, 255]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && npm test -- src/algorithms/regionColors.test.ts
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/algorithms/regionColors.ts`**

```ts
// HSV→RGB. h ∈ [0,1], s ∈ [0,1], v ∈ [0,1]. Returns 3 bytes.
function hsv2rgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Build a per-region RGBA palette from labelorder.
 * Region at orderIndex i gets hue i/N around the wheel.
 */
export function buildRegionPalette(labelOrder: Int32Array): Map<number, [number, number, number, number]> {
  const palette = new Map<number, [number, number, number, number]>();
  const n = labelOrder.length;
  for (let i = 0; i < n; i++) {
    const regionId = labelOrder[i];
    const [r, g, b] = hsv2rgb(i / n, 0.6, 0.95);
    palette.set(regionId, [r, g, b, 255]);
  }
  return palette;
}

/**
 * For each vertex, look up its region's RGBA. Unmapped → grey.
 */
export function buildVertexColors(labels: Int32Array, labelOrder: Int32Array): Uint8Array {
  const palette = buildRegionPalette(labelOrder);
  const out = new Uint8Array(labels.length * 4);
  const fallback: [number, number, number, number] = [128, 128, 128, 255];
  for (let v = 0; v < labels.length; v++) {
    const c = palette.get(labels[v]) ?? fallback;
    out[v * 4 + 0] = c[0];
    out[v * 4 + 1] = c[1];
    out[v * 4 + 2] = c[2];
    out[v * 4 + 3] = c[3];
  }
  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd web && npm test -- src/algorithms/regionColors.test.ts
```
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/algorithms/regionColors.ts src/algorithms/regionColors.test.ts
git commit -m "[ADD] regionColors: per-vertex RGBA from labels + labelorder"
```

---

## Task 6: GFX wrappers — shader program

**Files:**
- Create: `src/gfx/program.ts`

- [ ] **Step 1: Implement `src/gfx/program.ts`**

```ts
export interface ShaderProgram {
  program: WebGLProgram;
  uniforms: Map<string, WebGLUniformLocation>;
  attribs: Map<string, number>;
}

export function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
  name: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error(`createShader failed for ${name}`);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "(no log)";
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed [${name}]:\n${log}`);
  }
  return shader;
}

export function linkProgram(
  gl: WebGL2RenderingContext,
  vertexSrc: string,
  fragmentSrc: string,
  name: string,
): ShaderProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSrc, `${name}.vert`);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc, `${name}.frag`);
  const program = gl.createProgram();
  if (!program) throw new Error(`createProgram failed for ${name}`);
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? "(no log)";
    gl.deleteProgram(program);
    throw new Error(`Program link failed [${name}]:\n${log}`);
  }

  const uniforms = new Map<string, WebGLUniformLocation>();
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < numUniforms; i++) {
    const info = gl.getActiveUniform(program, i);
    if (!info) continue;
    const loc = gl.getUniformLocation(program, info.name);
    if (loc) uniforms.set(info.name, loc);
  }
  const attribs = new Map<string, number>();
  const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES) as number;
  for (let i = 0; i < numAttribs; i++) {
    const info = gl.getActiveAttrib(program, i);
    if (!info) continue;
    attribs.set(info.name, gl.getAttribLocation(program, info.name));
  }
  return { program, uniforms, attribs };
}
```

- [ ] **Step 2: Commit (no unit test — exercised by integration in Task 9)**

```bash
git add src/gfx/program.ts
git commit -m "[ADD] gfx/program: shader compile + link wrapper with info-log on errors"
```

---

## Task 7: GFX wrappers — buffer/VAO

**Files:**
- Create: `src/gfx/buffer.ts`

- [ ] **Step 1: Implement `src/gfx/buffer.ts`**

```ts
export interface AttribDef {
  name: string;
  /** Float32Array, Uint8Array, etc. */
  data: ArrayBufferView;
  /** Number of components per vertex (e.g. 3 for vec3). */
  size: number;
  /** GL type, e.g. gl.FLOAT, gl.UNSIGNED_BYTE. */
  type: number;
  /** Whether to normalize integer types into [0,1] / [-1,1]. */
  normalized: boolean;
}

export interface MeshGL {
  vao: WebGLVertexArrayObject;
  ebo: WebGLBuffer;
  indexCount: number;
  indexType: number;
}

export function createMeshVAO(
  gl: WebGL2RenderingContext,
  attribs: { def: AttribDef; location: number }[],
  indices: Uint32Array | Uint16Array,
): MeshGL {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("createVertexArray failed");
  gl.bindVertexArray(vao);

  for (const { def, location } of attribs) {
    if (location < 0) continue; // attribute not used by current program
    const vbo = gl.createBuffer();
    if (!vbo) throw new Error(`createBuffer failed for ${def.name}`);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, def.data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, def.size, def.type, def.normalized, 0, 0);
  }

  const ebo = gl.createBuffer();
  if (!ebo) throw new Error("createBuffer failed for EBO");
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  gl.bindVertexArray(null);

  return {
    vao,
    ebo,
    indexCount: indices.length,
    indexType: indices instanceof Uint32Array ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/gfx/buffer.ts
git commit -m "[ADD] gfx/buffer: VAO + per-attribute VBO + EBO helper"
```

---

## Task 8: GFX wrappers — view (canvas + GL ctx + render loop)

**Files:**
- Create: `src/gfx/view.ts`

- [ ] **Step 1: Implement `src/gfx/view.ts`**

```ts
export interface View {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  width: number;
  height: number;
  requestRender(): void;
  onRender(cb: () => void): void;
  onResize(cb: () => void): void;
}

export function createView(container: HTMLElement): View {
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  const gl = canvas.getContext("webgl2", { antialias: true, depth: true, alpha: false });
  if (!gl) throw new Error("WebGL2 not supported in this browser");

  let renderCb: () => void = () => {};
  let resizeCb: () => void = () => {};
  let dirty = true;

  const view: View = {
    canvas,
    gl,
    get width() { return canvas.width; },
    get height() { return canvas.height; },
    requestRender() { dirty = true; },
    onRender(cb) { renderCb = cb; },
    onResize(cb) { resizeCb = cb; },
  };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = Math.floor(container.clientWidth * dpr);
    const h = Math.floor(container.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      resizeCb();
      dirty = true;
    }
  }

  function loop() {
    resize();
    if (dirty) {
      dirty = false;
      renderCb();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener("resize", resize);

  return view;
}

export function showBanner(message: string): void {
  const el = document.getElementById("banner");
  if (!el) return;
  el.textContent = message;
  el.style.display = "block";
}
```

- [ ] **Step 2: Commit**

```bash
git add src/gfx/view.ts
git commit -m "[ADD] gfx/view: canvas + WebGL2 ctx + dirty-flag render loop"
```

---

## Task 9: GFX wrappers — trackball camera

**Files:**
- Create: `src/gfx/camera.ts`

- [ ] **Step 1: Implement `src/gfx/camera.ts`**

```ts
import { mat4, vec3 } from "gl-matrix";

export interface Camera {
  view: mat4;
  projection: mat4;
  attach(canvas: HTMLCanvasElement, onChange: () => void): void;
  fitSphere(center: vec3, radius: number): void;
  resize(width: number, height: number): void;
}

export function createTrackball(): Camera {
  const view = mat4.create();
  const projection = mat4.create();

  // Spherical params.
  let yaw = 0;
  let pitch = 0;
  let distance = 3;
  const target = vec3.fromValues(0, 0, 0);
  let aspect = 1;

  function rebuildView() {
    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const eye = vec3.fromValues(
      target[0] + distance * cp * sy,
      target[1] + distance * sp,
      target[2] + distance * cp * cy,
    );
    mat4.lookAt(view, eye, target, [0, 1, 0]);
  }
  function rebuildProjection() {
    mat4.perspective(projection, Math.PI / 4, aspect, 0.01, 1000);
  }
  rebuildView();
  rebuildProjection();

  return {
    view,
    projection,

    attach(canvas, onChange) {
      let dragging = false;
      let lastX = 0, lastY = 0;
      canvas.addEventListener("pointerdown", (e) => {
        dragging = true; lastX = e.clientX; lastY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
      });
      canvas.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX; lastY = e.clientY;
        yaw -= dx * 0.01;
        pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch + dy * 0.01));
        rebuildView(); onChange();
      });
      canvas.addEventListener("pointerup", (e) => {
        dragging = false;
        canvas.releasePointerCapture(e.pointerId);
      });
      canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        distance *= Math.exp(e.deltaY * 0.001);
        distance = Math.max(0.1, Math.min(100, distance));
        rebuildView(); onChange();
      }, { passive: false });
    },

    fitSphere(center, radius) {
      vec3.copy(target, center);
      distance = radius * 3;
      rebuildView();
    },

    resize(width, height) {
      aspect = width / Math.max(1, height);
      rebuildProjection();
    },
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/gfx/camera.ts
git commit -m "[ADD] gfx/camera: trackball with mouse + wheel input"
```

---

## Task 10: Mesh shaders

**Files:**
- Create: `src/shaders/mesh.vert.glsl`
- Create: `src/shaders/mesh.frag.glsl`

- [ ] **Step 1: Create `src/shaders/mesh.vert.glsl`**

```glsl
#version 300 es
precision highp float;

in vec3 a_position;
in vec4 a_color;

uniform mat4 u_view;
uniform mat4 u_projection;

out vec4 v_color;
out vec3 v_normal_view;

void main() {
  // M1 has no per-vertex normals from PLY; approximate a normal in fragment shader
  // using screen-space derivatives. For the vertex stage, just transform position.
  vec4 vp = u_view * vec4(a_position, 1.0);
  gl_Position = u_projection * vp;
  v_color = a_color;
  v_normal_view = vec3(0.0); // unused; placeholder for symmetry
}
```

- [ ] **Step 2: Create `src/shaders/mesh.frag.glsl`**

```glsl
#version 300 es
precision highp float;

in vec4 v_color;
out vec4 out_color;

void main() {
  // Cheap face-normal shading using screen-space derivatives.
  vec3 dx = dFdx(gl_FragCoord.xyz);
  vec3 dy = dFdy(gl_FragCoord.xyz);
  vec3 n = normalize(cross(dx, dy));
  float lambert = clamp(0.4 + 0.6 * abs(n.z), 0.0, 1.0);
  out_color = vec4(v_color.rgb * lambert, v_color.a);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/shaders/mesh.vert.glsl src/shaders/mesh.frag.glsl
git commit -m "[ADD] mesh shaders: position+color+screen-space-normal shading"
```

---

## Task 11: app.ts — wire it all together

**Files:**
- Create: `src/main.ts`
- Create: `src/app.ts`

- [ ] **Step 1: Create `src/main.ts`**

```ts
import { runApp } from "./app";
import { showBanner } from "./gfx/view";

const container = document.getElementById("app");
if (!container) {
  showBanner("Internal error: #app container missing");
} else {
  runApp(container).catch((err: unknown) => {
    console.error(err);
    showBanner(err instanceof Error ? err.message : String(err));
  });
}
```

- [ ] **Step 2: Create `src/app.ts`**

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

import meshVertSrc from "./shaders/mesh.vert.glsl?raw";
import meshFragSrc from "./shaders/mesh.frag.glsl?raw";

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
      `Vertex count mismatch: mesh has ${mesh.vertices.length / 3} vertices, ` +
        `labels has ${labels.length}`,
    );
  }

  const colors = buildVertexColors(labels, order);

  const program = linkProgram(gl, meshVertSrc, meshFragSrc, "mesh");

  const aPosition = program.attribs.get("a_position") ?? -1;
  const aColor = program.attribs.get("a_color") ?? -1;

  const meshGL = createMeshVAO(
    gl,
    [
      {
        def: { name: "a_position", data: mesh.vertices, size: 3, type: gl.FLOAT, normalized: false } as AttribDef,
        location: aPosition,
      },
      {
        def: { name: "a_color", data: colors, size: 4, type: gl.UNSIGNED_BYTE, normalized: true } as AttribDef,
        location: aColor,
      },
    ],
    mesh.indices,
  );

  const camera = createTrackball();
  const sphere = meshBoundingSphere(mesh.vertices);
  camera.fitSphere(sphere.center, sphere.radius);

  view.onResize(() => {
    camera.resize(view.width, view.height);
    view.requestRender();
  });
  camera.attach(view.canvas, () => view.requestRender());
  camera.resize(view.width, view.height);

  view.onRender(() => {
    gl.clearColor(0.07, 0.07, 0.07, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    gl.useProgram(program.program);
    gl.uniformMatrix4fv(program.uniforms.get("u_view")!, false, camera.view);
    gl.uniformMatrix4fv(program.uniforms.get("u_projection")!, false, camera.projection);

    gl.bindVertexArray(meshGL.vao);
    gl.drawElements(gl.TRIANGLES, meshGL.indexCount, meshGL.indexType, 0);
    gl.bindVertexArray(null);
  });

  view.requestRender();
}
```

- [ ] **Step 3: Run dev server and verify**

```bash
cd web && npm run dev
```

Open http://localhost:5173. Expected:
- Cortical brain mesh visible, centered, with distinct colored regions.
- Drag mouse → rotates around the mesh.
- Mouse wheel → zooms in/out.
- No console errors.

If the mesh appears black or mis-shaped, check:
- Browser console for shader compile/link errors (would have thrown).
- Whether `gl.UNSIGNED_INT` is supported (it is, in WebGL2).
- Front/back face culling — try commenting out `gl.enable(gl.CULL_FACE)` to see if it's a winding-order issue.

Stop dev server (Ctrl-C).

- [ ] **Step 4: Run all unit tests once more to confirm nothing broke**

```bash
cd web && npm test
```
Expected: all tests pass (cube + label34 PLY tests, label tests, regionColors tests).

- [ ] **Step 5: Commit M1**

```bash
git add src/main.ts src/app.ts
git commit -m "[ADD] M1: end-to-end mesh render with per-region colors and trackball camera"
```

---

## Done

M1 ships when the dev server renders the colored brain mesh and you can rotate/zoom it. Visual smoke test passes.

**What is NOT in M1 and arrives in later milestones:**
- M2: ExtractRegions + per-vertex direction vectors + flat-quad arrows.
- M3: SurfaceLIC pass.
- M4: combine — LIC underlay + arrow overlay + Compose/Final.

After M1 ships, write the M2 plan as a separate document in `docs/superpowers/plans/`.
