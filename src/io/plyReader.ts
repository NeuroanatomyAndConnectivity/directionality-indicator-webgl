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
