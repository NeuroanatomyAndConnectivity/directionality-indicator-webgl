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
