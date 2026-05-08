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

    // Probe: emit non-zero direction-vector statistics for M3 baseline comparison.
    const totalVerts = mesh.vertices.length / 3;
    const fraction = nonZero / totalVerts;
    // eslint-disable-next-line no-console
    console.log(
      `[extractRegions demo] verts=${totalVerts} nonZero=${nonZero} (${(fraction * 100).toFixed(2)}%)`,
    );
  }, 60000); // generous timeout — algorithm is O(verts × spread iterations).
});
