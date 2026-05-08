import type { MeshAdjacency } from "./meshAdjacency";

/**
 * Majority-vote label smoothing.
 *
 * For each vertex, count how many of its neighbours share each label. If the
 * majority neighbour-label is different from the vertex's own label, switch to
 * it. Iterating this rounds off the per-vertex zigzags in parcel boundaries:
 * isolated minority vertices get reassigned to the dominant surrounding region.
 *
 * Trade-off: small parcels (a few vertices each) can shrink or disappear at
 * higher iteration counts. For the brain mesh with the 34-region parcellation,
 * 1–2 iterations visibly smooth the borders without losing any region.
 *
 * Cost: O(N × avg_neighbours × iterations). Negligible on a 32k-vertex mesh.
 */
export function smoothLabels(
  labels: Int32Array,
  adjacency: MeshAdjacency,
  iterations: number,
): Int32Array {
  if (iterations <= 0) return new Int32Array(labels);
  let cur = new Int32Array(labels);
  let next = new Int32Array(labels.length);

  for (let it = 0; it < iterations; it++) {
    next.set(cur);
    for (let v = 0; v < cur.length; v++) {
      const ns = adjacency.neighbours(v);
      if (ns.length === 0) continue;

      // Tally neighbour labels.
      const counts = new Map<number, number>();
      let bestLabel = cur[v];
      let bestCount = 0;
      for (let k = 0; k < ns.length; k++) {
        const l = cur[ns[k]];
        const c = (counts.get(l) ?? 0) + 1;
        counts.set(l, c);
        if (c > bestCount) {
          bestCount = c;
          bestLabel = l;
        }
      }

      // Switch only if the majority is strictly bigger than current label's
      // neighbour count — avoids flipping back and forth on ties.
      const ownCount = counts.get(cur[v]) ?? 0;
      if (bestCount > ownCount) {
        next[v] = bestLabel;
      }
    }
    [cur, next] = [next, cur];
  }
  return cur;
}
