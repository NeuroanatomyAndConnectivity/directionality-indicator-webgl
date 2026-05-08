import type { MeshAdjacency } from "./meshAdjacency";

/**
 * Compute a mask of vertices that lie on a region (parcel) border — i.e., have
 * at least one neighbour with a different label. Used to restrict arrow
 * placement to inter-parcel boundaries (the M2-style visualization).
 */
export function computeBorderVertexMask(
  labels: Int32Array,
  adjacency: MeshAdjacency,
): Uint8Array {
  const N = labels.length;
  const out = new Uint8Array(N);
  for (let v = 0; v < N; v++) {
    const myLabel = labels[v];
    const ns = adjacency.neighbours(v);
    for (let k = 0; k < ns.length; k++) {
      if (labels[ns[k]] !== myLabel) {
        out[v] = 1;
        break;
      }
    }
  }
  return out;
}

export interface MeshSurfaceSamples {
  /** vec3 per sample, world-space. */
  positions: Float32Array;
  /** vec3 per sample, normalized world-space tangent. */
  directions: Float32Array;
  /** vec3 per sample, normalized world-space normal. */
  normals: Float32Array;
  /** RGBA bytes per sample. */
  colors: Uint8Array;
  /** Mesh vertex ID for each sample, or null when not vertex-aligned (e.g. Monte Carlo
   * surface sampling). Vertex-aligned samplers (streamlines, geodesic Poisson) populate
   * this so curved-arrow rendering can walk the field from each anchor. */
  vertexIDs?: Int32Array | null;
}

/**
 * Triangle-area-weighted Monte Carlo sampling on the mesh surface.
 * Picks `targetCount` random points, each on a triangle drawn with probability
 * proportional to its area, with random barycentric coordinates within the
 * triangle. Per-vertex direction/normal/color are barycentrically interpolated.
 *
 * Gives ~uniform spatial density across the surface independent of mesh-density
 * variation. Roughly equivalent to a screen-space grid but anchored in world
 * coordinates, so arrows stay attached as the camera rotates.
 *
 * Vertices whose interpolated direction is shorter than `minDirectionLength` are
 * skipped (rejected and re-sampled). targetCount is the desired final count;
 * actual count may be slightly lower if rejection runs out of attempts.
 */
export function sampleMeshSurface(
  vertices: Float32Array,
  indices: Uint32Array | Uint16Array,
  normals: Float32Array,
  directions: Float32Array,
  colors: Uint8Array,
  targetCount: number,
  minDirectionLength = 0.05,
): MeshSurfaceSamples {
  const triangleCount = indices.length / 3;

  const areas = new Float64Array(triangleCount);
  let totalArea = 0;
  for (let t = 0; t < triangleCount; t++) {
    const ia = indices[t * 3], ib = indices[t * 3 + 1], ic = indices[t * 3 + 2];
    const ax = vertices[ia * 3], ay = vertices[ia * 3 + 1], az = vertices[ia * 3 + 2];
    const bx = vertices[ib * 3], by = vertices[ib * 3 + 1], bz = vertices[ib * 3 + 2];
    const cx = vertices[ic * 3], cy = vertices[ic * 3 + 1], cz = vertices[ic * 3 + 2];
    const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
    const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
    const nx = e1y * e2z - e1z * e2y;
    const ny = e1z * e2x - e1x * e2z;
    const nz = e1x * e2y - e1y * e2x;
    areas[t] = 0.5 * Math.sqrt(nx * nx + ny * ny + nz * nz);
    totalArea += areas[t];
  }

  const cdf = new Float64Array(triangleCount);
  let cumul = 0;
  for (let t = 0; t < triangleCount; t++) {
    cumul += areas[t];
    cdf[t] = cumul / totalArea;
  }

  const positions = new Float32Array(targetCount * 3);
  const dirs = new Float32Array(targetCount * 3);
  const norms = new Float32Array(targetCount * 3);
  const cols = new Uint8Array(targetCount * 4);

  let s = 0xC0FFEE >>> 0;
  const rand = (): number => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return (s & 0xffffffff) / 0xffffffff;
  };

  const minLen2 = minDirectionLength * minDirectionLength;
  let writeIdx = 0;
  let attempts = 0;
  const maxAttempts = targetCount * 5;

  while (writeIdx < targetCount && attempts < maxAttempts) {
    attempts++;
    const r = rand();
    let lo = 0, hi = triangleCount - 1;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (cdf[mid] < r) lo = mid + 1;
      else hi = mid;
    }
    const t = lo;
    let u = rand(), v = rand();
    if (u + v > 1) { u = 1 - u; v = 1 - v; }
    const w = 1 - u - v;

    const ia = indices[t * 3], ib = indices[t * 3 + 1], ic = indices[t * 3 + 2];

    const dx = u * directions[ia * 3] + v * directions[ib * 3] + w * directions[ic * 3];
    const dy = u * directions[ia * 3 + 1] + v * directions[ib * 3 + 1] + w * directions[ic * 3 + 1];
    const dz = u * directions[ia * 3 + 2] + v * directions[ib * 3 + 2] + w * directions[ic * 3 + 2];
    const dl2 = dx * dx + dy * dy + dz * dz;
    if (dl2 < minLen2) continue;

    positions[writeIdx * 3 + 0] = u * vertices[ia * 3 + 0] + v * vertices[ib * 3 + 0] + w * vertices[ic * 3 + 0];
    positions[writeIdx * 3 + 1] = u * vertices[ia * 3 + 1] + v * vertices[ib * 3 + 1] + w * vertices[ic * 3 + 1];
    positions[writeIdx * 3 + 2] = u * vertices[ia * 3 + 2] + v * vertices[ib * 3 + 2] + w * vertices[ic * 3 + 2];

    const dl = Math.sqrt(dl2);
    dirs[writeIdx * 3 + 0] = dx / dl;
    dirs[writeIdx * 3 + 1] = dy / dl;
    dirs[writeIdx * 3 + 2] = dz / dl;

    const nx = u * normals[ia * 3 + 0] + v * normals[ib * 3 + 0] + w * normals[ic * 3 + 0];
    const ny = u * normals[ia * 3 + 1] + v * normals[ib * 3 + 1] + w * normals[ic * 3 + 1];
    const nz = u * normals[ia * 3 + 2] + v * normals[ib * 3 + 2] + w * normals[ic * 3 + 2];
    const nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    norms[writeIdx * 3 + 0] = nx / nl;
    norms[writeIdx * 3 + 1] = ny / nl;
    norms[writeIdx * 3 + 2] = nz / nl;

    cols[writeIdx * 4 + 0] = Math.round(u * colors[ia * 4 + 0] + v * colors[ib * 4 + 0] + w * colors[ic * 4 + 0]);
    cols[writeIdx * 4 + 1] = Math.round(u * colors[ia * 4 + 1] + v * colors[ib * 4 + 1] + w * colors[ic * 4 + 1]);
    cols[writeIdx * 4 + 2] = Math.round(u * colors[ia * 4 + 2] + v * colors[ib * 4 + 2] + w * colors[ic * 4 + 2]);
    cols[writeIdx * 4 + 3] = 255;

    writeIdx++;
  }

  return {
    positions: positions.slice(0, writeIdx * 3),
    directions: dirs.slice(0, writeIdx * 3),
    normals: norms.slice(0, writeIdx * 3),
    colors: cols.slice(0, writeIdx * 4),
  };
}

/**
 * Greedy geodesic Poisson-disk sampling on the mesh surface.
 *
 * Iterates vertices in a deterministic random order. Each accepted vertex runs
 * a limited-radius Dijkstra along mesh edges, marking every vertex within
 * `minDistance` *geodesic* (along-the-surface) distance as "claimed". Subsequent
 * candidates that are already claimed get rejected.
 *
 * Result: every accepted vertex is at least `minDistance` along the mesh surface
 * from every other accepted vertex. Distribution is genuinely even on the
 * folded cortical surface — much better than Euclidean-distance Poisson, which
 * could place two arrows on opposite walls of a sulcus that are 5mm apart in
 * straight-line distance but 50mm geodesically.
 *
 * Cost: O(N + total claimed vertices). For a brain mesh with avg edge length
 * ~3mm and minDistance ~5mm, each Dijkstra visits ~10–30 neighbours; total
 * runtime is well under 1 second on the demo dataset.
 */
export function sampleGeodesicPoisson(
  vertices: Float32Array,
  adjacency: MeshAdjacency,
  directions: Float32Array,
  normals: Float32Array,
  colors: Uint8Array,
  minDistance: number,
  minDirectionLength = 0.05,
  /** Optional mask: only vertices where mask[v] !== 0 are eligible to be placed. */
  validMask?: Uint8Array,
): MeshSurfaceSamples {
  const N = adjacency.vertexCount;
  const minDir2 = minDirectionLength * minDirectionLength;

  // Deterministic Fisher–Yates shuffle of vertex indices.
  const order = new Int32Array(N);
  for (let i = 0; i < N; i++) order[i] = i;
  let s = 0xDECAFBAD >>> 0;
  const rand = (): number => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return (s & 0xffffffff) / 0xffffffff;
  };
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
  }

  const claimed = new Uint8Array(N);
  const dist = new Float32Array(N);
  const seeded: number[] = [];

  for (let oi = 0; oi < N; oi++) {
    const v = order[oi];
    if (claimed[v]) continue;
    if (validMask && !validMask[v]) continue;
    const dx = directions[v * 3];
    const dy = directions[v * 3 + 1];
    const dz = directions[v * 3 + 2];
    if (dx * dx + dy * dy + dz * dz < minDir2) continue;

    seeded.push(v);

    // Limited-radius Dijkstra from v outward, marking all vertices within
    // minDistance geodesic as claimed. Heap implemented as a sorted array —
    // for the small radii typical here, the O(K log K) overhead is negligible.
    dist.fill(Infinity);
    dist[v] = 0;
    claimed[v] = 1;
    const heap: Array<{ d: number; u: number }> = [{ d: 0, u: v }];

    while (heap.length > 0) {
      let minIdx = 0;
      for (let k = 1; k < heap.length; k++) if (heap[k].d < heap[minIdx].d) minIdx = k;
      const top = heap[minIdx];
      heap[minIdx] = heap[heap.length - 1];
      heap.pop();
      const d = top.d;
      const u = top.u;
      if (d > dist[u]) continue;
      if (d > minDistance) break;
      claimed[u] = 1;

      const ns = adjacency.neighbours(u);
      for (let k = 0; k < ns.length; k++) {
        const n = ns[k];
        const ex = vertices[n * 3] - vertices[u * 3];
        const ey = vertices[n * 3 + 1] - vertices[u * 3 + 1];
        const ez = vertices[n * 3 + 2] - vertices[u * 3 + 2];
        const edgeLen = Math.sqrt(ex * ex + ey * ey + ez * ez);
        const nd = d + edgeLen;
        if (nd < dist[n] && nd <= minDistance) {
          dist[n] = nd;
          heap.push({ d: nd, u: n });
        }
      }
    }
  }

  const count = seeded.length;
  const positions = new Float32Array(count * 3);
  const dirs = new Float32Array(count * 3);
  const norms = new Float32Array(count * 3);
  const cols = new Uint8Array(count * 4);
  const vIDs = new Int32Array(count);
  for (let i = 0; i < count; i++) {
    const v = seeded[i];
    vIDs[i] = v;
    positions[i * 3 + 0] = vertices[v * 3 + 0];
    positions[i * 3 + 1] = vertices[v * 3 + 1];
    positions[i * 3 + 2] = vertices[v * 3 + 2];
    const dxv = directions[v * 3];
    const dyv = directions[v * 3 + 1];
    const dzv = directions[v * 3 + 2];
    const dl = Math.sqrt(dxv * dxv + dyv * dyv + dzv * dzv) || 1;
    dirs[i * 3 + 0] = dxv / dl;
    dirs[i * 3 + 1] = dyv / dl;
    dirs[i * 3 + 2] = dzv / dl;
    norms[i * 3 + 0] = normals[v * 3];
    norms[i * 3 + 1] = normals[v * 3 + 1];
    norms[i * 3 + 2] = normals[v * 3 + 2];
    cols[i * 4 + 0] = colors[v * 4];
    cols[i * 4 + 1] = colors[v * 4 + 1];
    cols[i * 4 + 2] = colors[v * 4 + 2];
    cols[i * 4 + 3] = 255;
  }
  return { positions, directions: dirs, normals: norms, colors: cols, vertexIDs: vIDs };
}

/**
 * Reject arrows whose 3D bodies visually overlap.
 *
 * Streamline placement enforces non-overlap along each streamline and a
 * perpendicular lane between streamlines, but neighbouring streamlines can
 * still produce overlapping arrow bodies where they converge or where the
 * field curves sharply. This pass removes any arrow whose body-center is
 * within `arrowLength × tightness` of an already-kept arrow's body-center.
 *
 * Body-center = anchor + 0.5 × arrowLength × tangent. Bounding-sphere overlap
 * is a loose but cheap proxy for OBB overlap and catches most visual conflicts.
 *
 * Spatial-hash acceleration: O(N) instead of O(N²).
 */
export function rejectOverlappingArrows(
  samples: MeshSurfaceSamples,
  arrowLength: number,
  tightness = 0.8,
): MeshSurfaceSamples {
  const count = samples.positions.length / 3;
  if (count === 0) return samples;

  const minDist2 = (arrowLength * tightness) ** 2;
  const cellSize = arrowLength * tightness;
  const grid = new Map<string, number[]>();
  const keep = new Uint8Array(count);

  // Body centers = anchor positions (the arrow shader places the anchor at the
  // arrow's middle). That makes overlap-rejection symmetric under direction flip.
  const cx = new Float32Array(count);
  const cy = new Float32Array(count);
  const cz = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    cx[i] = samples.positions[i * 3];
    cy[i] = samples.positions[i * 3 + 1];
    cz[i] = samples.positions[i * 3 + 2];
  }

  for (let i = 0; i < count; i++) {
    const ix = Math.floor(cx[i] / cellSize);
    const iy = Math.floor(cy[i] / cellSize);
    const iz = Math.floor(cz[i] / cellSize);

    let conflict = false;
    outer: for (let dz = -1; dz <= 1; dz++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const k = `${ix + dx},${iy + dy},${iz + dz}`;
          const list = grid.get(k);
          if (!list) continue;
          for (let li = 0; li < list.length; li++) {
            const j = list[li];
            const ex = cx[j] - cx[i];
            const ey = cy[j] - cy[i];
            const ez = cz[j] - cz[i];
            if (ex * ex + ey * ey + ez * ez < minDist2) {
              conflict = true;
              break outer;
            }
          }
        }
      }
    }

    if (!conflict) {
      keep[i] = 1;
      const k = `${ix},${iy},${iz}`;
      const list = grid.get(k);
      if (list) list.push(i);
      else grid.set(k, [i]);
    }
  }

  let kept = 0;
  for (let i = 0; i < count; i++) if (keep[i]) kept++;

  const positions = new Float32Array(kept * 3);
  const dirs = new Float32Array(kept * 3);
  const norms = new Float32Array(kept * 3);
  const cols = new Uint8Array(kept * 4);
  const inputIDs = samples.vertexIDs ?? null;
  const vIDs = inputIDs ? new Int32Array(kept) : null;
  let w = 0;
  for (let i = 0; i < count; i++) {
    if (!keep[i]) continue;
    positions[w * 3 + 0] = samples.positions[i * 3 + 0];
    positions[w * 3 + 1] = samples.positions[i * 3 + 1];
    positions[w * 3 + 2] = samples.positions[i * 3 + 2];
    dirs[w * 3 + 0] = samples.directions[i * 3 + 0];
    dirs[w * 3 + 1] = samples.directions[i * 3 + 1];
    dirs[w * 3 + 2] = samples.directions[i * 3 + 2];
    norms[w * 3 + 0] = samples.normals[i * 3 + 0];
    norms[w * 3 + 1] = samples.normals[i * 3 + 1];
    norms[w * 3 + 2] = samples.normals[i * 3 + 2];
    cols[w * 4 + 0] = samples.colors[i * 4 + 0];
    cols[w * 4 + 1] = samples.colors[i * 4 + 1];
    cols[w * 4 + 2] = samples.colors[i * 4 + 2];
    cols[w * 4 + 3] = samples.colors[i * 4 + 3];
    if (vIDs && inputIDs) vIDs[w] = inputIDs[i];
    w++;
  }
  return { positions, directions: dirs, normals: norms, colors: cols, vertexIDs: vIDs };
}

/**
 * Streamline-based arrow seeding.
 *
 * Classical LIC-arrow placement: pick a starting vertex; walk along the
 * direction field placing arrows at fixed step-distance intervals; on each
 * placed arrow's perpendicular neighborhood, mark a geodesic "lane" so
 * adjacent streamlines don't overlap. Repeat from new seeds in unclaimed
 * areas until the surface is covered.
 *
 * Why this is better than point-Poisson for arrows:
 *   - Arrows are oriented rectangles, not points. Two anchors 5mm apart can
 *     still produce visually overlapping arrows if the bodies cross.
 *   - Streamline placement guarantees consecutive arrows on a streamline are
 *     placed `stepDistance` apart along the field direction → can't overlap
 *     longitudinally regardless of how the field curves.
 *   - The "lane radius" guarantees perpendicular streamlines stay apart.
 *
 * Visually, arrows form coherent flow lines that read as a vector field —
 * matching what the underlying LIC pattern shows.
 */
export function sampleStreamlines(
  vertices: Float32Array,
  adjacency: MeshAdjacency,
  directions: Float32Array,
  normals: Float32Array,
  colors: Uint8Array,
  stepDistance: number,
  laneRadius: number,
  minDirectionLength = 0.05,
): MeshSurfaceSamples {
  const N = adjacency.vertexCount;
  const minDir2 = minDirectionLength * minDirectionLength;

  // Deterministic shuffle of seed-candidate order.
  const seeds = new Int32Array(N);
  for (let i = 0; i < N; i++) seeds[i] = i;
  let s = 0x5EEDF00D >>> 0;
  const rand = (): number => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return (s & 0xffffffff) / 0xffffffff;
  };
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = seeds[i]; seeds[i] = seeds[j]; seeds[j] = tmp;
  }

  const claimed = new Uint8Array(N);
  const placed: number[] = [];

  // Step ONE neighbor along signed direction, returning the chosen neighbour or -1.
  // Direction is taken at `from`; next step's direction will be re-read at the new vertex.
  function stepAlongField(from: number, sign: number): { next: number; edgeLen: number } | null {
    const dx = sign * directions[from * 3];
    const dy = sign * directions[from * 3 + 1];
    const dz = sign * directions[from * 3 + 2];
    const dl = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (dl < 1e-6) return null;
    const ndx = dx / dl, ndy = dy / dl, ndz = dz / dl;

    const ns = adjacency.neighbours(from);
    let bestN = -1, bestScore = 0.3, bestLen = 0; // require alignment >0.3
    for (let k = 0; k < ns.length; k++) {
      const n = ns[k];
      const ex = vertices[n * 3] - vertices[from * 3];
      const ey = vertices[n * 3 + 1] - vertices[from * 3 + 1];
      const ez = vertices[n * 3 + 2] - vertices[from * 3 + 2];
      const elen = Math.sqrt(ex * ex + ey * ey + ez * ez);
      if (elen < 1e-6) continue;
      const score = (ex * ndx + ey * ndy + ez * ndz) / elen;
      if (score > bestScore) {
        bestScore = score;
        bestN = n;
        bestLen = elen;
      }
    }
    if (bestN === -1) return null;
    return { next: bestN, edgeLen: bestLen };
  }

  // Limited-radius Dijkstra claim: mark all vertices within `laneRadius` geodesic.
  function bfsClaim(from: number): void {
    const dist = new Map<number, number>();
    dist.set(from, 0);
    const heap: Array<{ d: number; u: number }> = [{ d: 0, u: from }];
    while (heap.length > 0) {
      let mi = 0;
      for (let k = 1; k < heap.length; k++) if (heap[k].d < heap[mi].d) mi = k;
      const top = heap[mi];
      heap[mi] = heap[heap.length - 1];
      heap.pop();
      if (top.d > (dist.get(top.u) ?? Infinity)) continue;
      if (top.d > laneRadius) break;
      claimed[top.u] = 1;
      const ns = adjacency.neighbours(top.u);
      for (let k = 0; k < ns.length; k++) {
        const v = ns[k];
        const ex = vertices[v * 3] - vertices[top.u * 3];
        const ey = vertices[v * 3 + 1] - vertices[top.u * 3 + 1];
        const ez = vertices[v * 3 + 2] - vertices[top.u * 3 + 2];
        const elen = Math.sqrt(ex * ex + ey * ey + ez * ez);
        const nd = top.d + elen;
        if (nd <= laneRadius && nd < (dist.get(v) ?? Infinity)) {
          dist.set(v, nd);
          heap.push({ d: nd, u: v });
        }
      }
    }
  }

  // Walk one direction (sign +1 or -1) from `start`, placing arrows every `stepDistance`.
  function walkOneDirection(start: number, sign: number, placeFirst: boolean): number[] {
    const placedHere: number[] = [];
    let current = start;
    let pending = 0;
    if (placeFirst) placedHere.push(current);

    const MAX_STEPS = 500;
    for (let i = 0; i < MAX_STEPS; i++) {
      const step = stepAlongField(current, sign);
      if (!step) break;
      if (claimed[step.next]) break; // hit another streamline's lane
      pending += step.edgeLen;
      current = step.next;
      if (pending >= stepDistance) {
        // Skip if direction at this vertex has gone weak.
        const dxv = directions[current * 3];
        const dyv = directions[current * 3 + 1];
        const dzv = directions[current * 3 + 2];
        if (dxv * dxv + dyv * dyv + dzv * dzv < minDir2) break;
        placedHere.push(current);
        pending = 0;
      }
    }
    return placedHere;
  }

  for (let oi = 0; oi < N; oi++) {
    const startV = seeds[oi];
    if (claimed[startV]) continue;
    const dx = directions[startV * 3];
    const dy = directions[startV * 3 + 1];
    const dz = directions[startV * 3 + 2];
    if (dx * dx + dy * dy + dz * dz < minDir2) continue;

    // Walk forward (placing the start arrow) and backward (skipping start).
    const forward = walkOneDirection(startV, +1, true);
    const backward = walkOneDirection(startV, -1, false);
    const all = forward.concat(backward);

    if (all.length === 0) continue;

    // Claim a perpendicular lane around each placed arrow so adjacent streamlines
    // don't overlap.
    for (const v of all) bfsClaim(v);
    placed.push(...all);
  }

  const count = placed.length;
  const positions = new Float32Array(count * 3);
  const dirs = new Float32Array(count * 3);
  const norms = new Float32Array(count * 3);
  const cols = new Uint8Array(count * 4);
  const vIDs = new Int32Array(count);
  for (let i = 0; i < count; i++) {
    const v = placed[i];
    vIDs[i] = v;
    positions[i * 3 + 0] = vertices[v * 3 + 0];
    positions[i * 3 + 1] = vertices[v * 3 + 1];
    positions[i * 3 + 2] = vertices[v * 3 + 2];
    const dxv = directions[v * 3];
    const dyv = directions[v * 3 + 1];
    const dzv = directions[v * 3 + 2];
    const dl = Math.sqrt(dxv * dxv + dyv * dyv + dzv * dzv) || 1;
    dirs[i * 3 + 0] = dxv / dl;
    dirs[i * 3 + 1] = dyv / dl;
    dirs[i * 3 + 2] = dzv / dl;
    norms[i * 3 + 0] = normals[v * 3];
    norms[i * 3 + 1] = normals[v * 3 + 1];
    norms[i * 3 + 2] = normals[v * 3 + 2];
    cols[i * 4 + 0] = colors[v * 4];
    cols[i * 4 + 1] = colors[v * 4 + 1];
    cols[i * 4 + 2] = colors[v * 4 + 2];
    cols[i * 4 + 3] = 255;
  }
  return { positions, directions: dirs, normals: norms, colors: cols, vertexIDs: vIDs };
}

export interface SeedArrowsOptions {
  /** Take every Nth valid vertex. Larger = sparser. */
  stride: number;
  /** Vertices whose direction has length below this are skipped. */
  minLength: number;
}

export interface SeedArrowsByGridOptions {
  vertices: Float32Array;
  bbMin: ArrayLike<number>;
  bbMax: ArrayLike<number>;
  /** Number of grid cells along the longest axis. Higher = more (denser) arrows. */
  gridResolution: number;
  /** Vertices whose direction has length below this are skipped. */
  minLength: number;
}

/**
 * Pick a sparse subset of vertex IDs to draw arrows for.
 * Skips zero/short-direction vertices, then samples every `stride`-th remaining vertex.
 */
export function seedArrows(
  directions: Float32Array,
  options: SeedArrowsOptions,
): number[] {
  const { stride, minLength } = options;
  const minLen2 = minLength * minLength;
  const seeded: number[] = [];
  let validIndex = 0;
  const count = directions.length / 3;
  for (let v = 0; v < count; v++) {
    const x = directions[v * 3 + 0];
    const y = directions[v * 3 + 1];
    const z = directions[v * 3 + 2];
    if (x * x + y * y + z * z < minLen2) continue;
    if (validIndex % stride === 0) seeded.push(v);
    validIndex++;
  }
  return seeded;
}

/**
 * Pick vertex IDs by spatial bucketing so the resulting arrow positions are
 * roughly evenly distributed in 3D world space (and therefore evenly across the
 * cortical surface), regardless of mesh-density variation.
 *
 * Strategy:
 *   1. Cover the bounding box with a uniform grid sized so the longest axis has
 *      `gridResolution` cells.
 *   2. For each vertex with sufficient direction magnitude, compute its grid
 *      cell key (ix, iy, iz).
 *   3. Keep at most one vertex per cell (the first one encountered in vertex order).
 *
 * Output count ≈ number of occupied cells. With gridResolution=24 on a brain mesh,
 * expect ~600–1200 arrows.
 */
export interface SeedArrowsByPoissonOptions {
  vertices: Float32Array;
  /** Reject candidate vertex if any already-seeded vertex is closer than this in world units. */
  minDistance: number;
  /** Vertices whose direction has length below this are skipped. */
  minLength: number;
}

/**
 * Greedy Poisson-disk-style sampling on the mesh surface.
 * Iterates vertices in a deterministic random-ish order (every other prime stride),
 * accepting a vertex only if it is at least `minDistance` away from every already-
 * accepted vertex. Produces a roughly even surface distribution regardless of mesh
 * density variation — unlike grid bucketing which biases toward dense areas.
 *
 * Performance: O(N) with spatial hash (cell size = minDistance), so each candidate
 * checks only ~27 neighbouring cells of accepted vertices.
 */
export function seedArrowsByPoisson(
  directions: Float32Array,
  options: SeedArrowsByPoissonOptions,
): number[] {
  const { vertices, minDistance, minLength } = options;
  const minLen2 = minLength * minLength;
  const minDist2 = minDistance * minDistance;
  if (minDistance <= 0) return [];

  const cellSize = minDistance;
  const grid = new Map<string, number[]>(); // cell key → vertex IDs accepted in that cell
  const seeded: number[] = [];
  const count = vertices.length / 3;

  // Randomize traversal order via a coprime stride so we don't bias toward the
  // first-listed vertices (which often cluster geographically in the file).
  const stride = 7919; // prime; coprime with most vertex counts including 32492.
  let v = 0;
  for (let i = 0; i < count; i++) {
    v = (v + stride) % count;

    const ddx = directions[v * 3 + 0];
    const ddy = directions[v * 3 + 1];
    const ddz = directions[v * 3 + 2];
    if (ddx * ddx + ddy * ddy + ddz * ddz < minLen2) continue;

    const px = vertices[v * 3 + 0];
    const py = vertices[v * 3 + 1];
    const pz = vertices[v * 3 + 2];

    const cx = Math.floor(px / cellSize);
    const cy = Math.floor(py / cellSize);
    const cz = Math.floor(pz / cellSize);

    let tooClose = false;
    outer: for (let dz = -1; dz <= 1; dz++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const k = `${cx + dx},${cy + dy},${cz + dz}`;
          const list = grid.get(k);
          if (!list) continue;
          for (let j = 0; j < list.length; j++) {
            const u = list[j];
            const qx = vertices[u * 3 + 0];
            const qy = vertices[u * 3 + 1];
            const qz = vertices[u * 3 + 2];
            const ex = px - qx, ey = py - qy, ez = pz - qz;
            if (ex * ex + ey * ey + ez * ez < minDist2) {
              tooClose = true;
              break outer;
            }
          }
        }
      }
    }
    if (tooClose) continue;

    const key = `${cx},${cy},${cz}`;
    const list = grid.get(key);
    if (list) list.push(v);
    else grid.set(key, [v]);
    seeded.push(v);
  }
  return seeded;
}

export function seedArrowsByGrid(
  directions: Float32Array,
  options: SeedArrowsByGridOptions,
): number[] {
  const { vertices, bbMin, bbMax, gridResolution, minLength } = options;
  const minLen2 = minLength * minLength;

  const dx = bbMax[0] - bbMin[0];
  const dy = bbMax[1] - bbMin[1];
  const dz = bbMax[2] - bbMin[2];
  const longest = Math.max(dx, dy, dz);
  if (longest <= 0 || gridResolution <= 0) return [];

  const cellSize = longest / gridResolution;
  // Per-axis cell counts so the grid covers the full bbox even on shorter axes.
  const nx = Math.max(1, Math.ceil(dx / cellSize));
  const ny = Math.max(1, Math.ceil(dy / cellSize));

  const occupied = new Map<number, number>(); // cell key → vertex ID
  const seeded: number[] = [];

  const count = vertices.length / 3;
  for (let v = 0; v < count; v++) {
    const ddx = directions[v * 3 + 0];
    const ddy = directions[v * 3 + 1];
    const ddz = directions[v * 3 + 2];
    if (ddx * ddx + ddy * ddy + ddz * ddz < minLen2) continue;

    const px = vertices[v * 3 + 0];
    const py = vertices[v * 3 + 1];
    const pz = vertices[v * 3 + 2];

    const ix = Math.min(nx - 1, Math.max(0, Math.floor((px - bbMin[0]) / cellSize)));
    const iy = Math.min(ny - 1, Math.max(0, Math.floor((py - bbMin[1]) / cellSize)));
    const iz = Math.max(0, Math.floor((pz - bbMin[2]) / cellSize));

    const key = (iz * ny + iy) * nx + ix;
    if (occupied.has(key)) continue;
    occupied.set(key, v);
    seeded.push(v);
  }

  return seeded;
}
