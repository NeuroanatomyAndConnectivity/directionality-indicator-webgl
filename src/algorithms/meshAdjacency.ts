export interface MeshAdjacency {
  /** Returns the unique vertex IDs sharing an edge with `vertexID` (excluding `vertexID` itself). */
  neighbours(vertexID: number): number[];
  /** Total vertex count this adjacency was built for. */
  readonly vertexCount: number;
}

/**
 * Build vertex-to-neighbour adjacency from a triangle index buffer.
 * For each triangle (a, b, c), the three pairs (a,b), (a,c), (b,c) are recorded as edges.
 * Each vertex's neighbour list is deduplicated.
 *
 * Cost: O(triangles + edges). Memory: ~6 × triangles entries before dedup.
 */
export function buildMeshAdjacency(
  indices: Uint32Array | Uint16Array,
  vertexCount: number,
): MeshAdjacency {
  const neighbourSets: Set<number>[] = new Array(vertexCount);
  for (let i = 0; i < vertexCount; i++) neighbourSets[i] = new Set<number>();

  const triangleCount = indices.length / 3;
  for (let t = 0; t < triangleCount; t++) {
    const a = indices[t * 3 + 0];
    const b = indices[t * 3 + 1];
    const c = indices[t * 3 + 2];
    neighbourSets[a].add(b); neighbourSets[a].add(c);
    neighbourSets[b].add(a); neighbourSets[b].add(c);
    neighbourSets[c].add(a); neighbourSets[c].add(b);
  }

  // Materialize as plain arrays for fast iteration in hot paths.
  const neighbourArrays: number[][] = neighbourSets.map((s) => Array.from(s));

  return {
    vertexCount,
    neighbours(vertexID: number): number[] {
      return neighbourArrays[vertexID] ?? [];
    },
  };
}
