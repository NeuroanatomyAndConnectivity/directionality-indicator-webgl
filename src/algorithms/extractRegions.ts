import type { MeshAdjacency } from "./meshAdjacency";

export interface ExtractRegionsInput {
  vertices: Float32Array;          // length = N * 3
  indices: Uint32Array | Uint16Array;
  labels: Int32Array;              // length = N
  labelOrder: Int32Array;          // length = number of regions in display order
  adjacency: MeshAdjacency;
  normals: Float32Array;           // length = N * 3 (unit normals)
  /** Flip the direction sign across the whole mesh. Matches the C++ enableDirectionSwitch parameter (default true in the C++). */
  switchDirection: boolean;
}

/**
 * Port of ExtractRegions::process() Case 2 (labelOrder given) from
 * src/lib/di/algorithms/ExtractRegions.cpp lines 224–620.
 *
 * Returns a per-vertex 3-component direction vector packed as a Float32Array of
 * length N*3. Vertices whose label is not in `labelOrder` get (0,0,0).
 *
 * Algorithm (verbatim from C++):
 *   1. Flood-fill connected same-label components → regionLabels[regionID].
 *   2. For each non-ignored vertex, look at neighbours. Cross-region neighbours
 *      contribute a signed direction (sign decided by labelOrder ordering).
 *      Vertex direction is the mean of those contributions.
 *   3. Iterative spread: propagate values from set vertices to unset vertices
 *      using a distance-weighted mean of neighbours, projecting each contributed
 *      vector onto the receiver's local tangent plane. Stops on convergence or
 *      stuck-but-not-fully-set state.
 */
export function extractRegions(input: ExtractRegionsInput): Float32Array {
  const { vertices, labels, labelOrder, adjacency, normals, switchDirection } = input;
  const N = adjacency.vertexCount;
  const out = new Float32Array(N * 3);

  // ---- Stage 1: flood-fill region segmentation ----

  const visited = new Uint8Array(N);
  const vertexRegion = new Int32Array(N).fill(-1);
  const regionLabels: number[] = [];

  for (let seed = 0; seed < N; seed++) {
    if (visited[seed]) continue;
    const seedLabel = labels[seed];
    const regionID = regionLabels.length;
    regionLabels.push(seedLabel);

    // BFS (NOT recursive — JS call stack would blow up at 32k vertices).
    const queue: number[] = [seed];
    visited[seed] = 1;
    while (queue.length > 0) {
      const v = queue.shift()!;
      vertexRegion[v] = regionID;
      const ns = adjacency.neighbours(v);
      for (let k = 0; k < ns.length; k++) {
        const n = ns[k];
        if (!visited[n] && labels[n] === seedLabel) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  // ---- Stage 2: border vectors ----

  // labelOrder lookup: label → position in order array. Position is 0-based and
  // unknown labels get -1.
  const orderPos = new Map<number, number>();
  for (let i = 0; i < labelOrder.length; i++) orderPos.set(labelOrder[i], i);

  const ignore = new Uint8Array(N);
  for (let v = 0; v < N; v++) {
    if (!orderPos.has(labels[v])) ignore[v] = 1;
  }

  const valueSet = new Uint8Array(N);
  for (let v = 0; v < N; v++) {
    if (ignore[v]) {
      // Pre-set to zero (matches C++ vectorAttributeSet[v] = true with zero value).
      valueSet[v] = 1;
    }
  }

  const flipGlobal = switchDirection ? -1 : 1;

  for (let v = 0; v < N; v++) {
    if (ignore[v]) continue;
    const vx = vertices[v * 3 + 0], vy = vertices[v * 3 + 1], vz = vertices[v * 3 + 2];
    const myRegion = vertexRegion[v];
    const myLabel = labels[v];
    const myOrderPos = orderPos.get(myLabel)!;

    let sumX = 0, sumY = 0, sumZ = 0, count = 0;

    const ns = adjacency.neighbours(v);
    for (let k = 0; k < ns.length; k++) {
      const n = ns[k];
      if (ignore[n]) continue;
      const nRegion = vertexRegion[n];
      if (nRegion === myRegion) continue; // not a border edge

      const nLabel = regionLabels[nRegion];
      const nOrderPos = orderPos.get(nLabel);
      if (nOrderPos === undefined) continue;

      // Default direction: FROM v TO n. Sign convention from the C++:
      //   if vertexPos > neighbourPos → invert.
      // Then global switch applies.
      const localFlip = myOrderPos > nOrderPos ? -1 : 1;
      const sign = localFlip * flipGlobal;

      const nx = vertices[n * 3 + 0], ny = vertices[n * 3 + 1], nz = vertices[n * 3 + 2];
      let dx = nx - vx, dy = ny - vy, dz = nz - vz;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (len < 1e-9) continue;
      dx = (dx / len) * sign; dy = (dy / len) * sign; dz = (dz / len) * sign;

      sumX += dx; sumY += dy; sumZ += dz;
      count++;
    }

    if (count > 0) {
      out[v * 3 + 0] = sumX / count;
      out[v * 3 + 1] = sumY / count;
      out[v * 3 + 2] = sumZ / count;
      valueSet[v] = 1;
    }
  }

  // ---- Stage 3: iterative spread ----

  // Cap iterations defensively. The C++ relies on convergence; we do the same
  // but with an explicit ceiling so a pathological mesh can't hang.
  const MAX_ITERATIONS = 200;
  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    let changed = false;
    let allSet = true;

    // Copy of valueSet for "use values from previous iteration only".
    const prevSet = new Uint8Array(valueSet);
    const prev = new Float32Array(out);

    for (let v = 0; v < N; v++) {
      if (valueSet[v]) continue;
      allSet = false;

      const ns = adjacency.neighbours(v);
      let includedNeighbours = 0;
      let longestDist = 0;
      for (let k = 0; k < ns.length; k++) {
        const n = ns[k];
        if (n === v) continue;
        if (ignore[n]) continue;
        if (!prevSet[n]) continue;
        includedNeighbours++;
        const dx = vertices[n * 3 + 0] - vertices[v * 3 + 0];
        const dy = vertices[n * 3 + 1] - vertices[v * 3 + 1];
        const dz = vertices[n * 3 + 2] - vertices[v * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d > longestDist) longestDist = d;
      }

      if (includedNeighbours < 2) continue;

      // Vertex normal at v (local tangent plane definition).
      const Nx = normals[v * 3 + 0], Ny = normals[v * 3 + 1], Nz = normals[v * 3 + 2];

      let meanX = 0, meanY = 0, meanZ = 0, factor = 0;

      for (let k = 0; k < ns.length; k++) {
        const n = ns[k];
        if (n === v) continue;
        if (ignore[n]) continue;
        if (!prevSet[n]) continue;

        const dx = vertices[n * 3 + 0] - vertices[v * 3 + 0];
        const dy = vertices[n * 3 + 1] - vertices[v * 3 + 1];
        const dz = vertices[n * 3 + 2] - vertices[v * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        let sx = prev[n * 3 + 0], sy = prev[n * 3 + 1], sz = prev[n * 3 + 2];
        const sLen = Math.sqrt(sx * sx + sy * sy + sz * sz);

        // Project onto the tangent plane of v:
        //   binormal = normalize(cross(N, normalize(srcVec)))
        //   vec      = normalize(cross(binormal, N)) * |srcVec|
        // Skip when srcVec is too short or too aligned with N.
        let projX = 0, projY = 0, projZ = 0;
        if (sLen > 0.001) {
          const ux = sx / sLen, uy = sy / sLen, uz = sz / sLen;
          const cosAngle = Math.abs(ux * Nx + uy * Ny + uz * Nz);
          if (cosAngle < 0.98) {
            // binormal = N × u
            const bx = Ny * uz - Nz * uy;
            const by = Nz * ux - Nx * uz;
            const bz = Nx * uy - Ny * ux;
            const bLen = Math.sqrt(bx * bx + by * by + bz * bz);
            if (bLen > 1e-9) {
              const nbx = bx / bLen, nby = by / bLen, nbz = bz / bLen;
              // tangent in plane = binormal × N
              let px = nby * Nz - nbz * Ny;
              let py = nbz * Nx - nbx * Nz;
              let pz = nbx * Ny - nby * Nx;
              const pLen = Math.sqrt(px * px + py * py + pz * pz);
              if (pLen > 1e-9) {
                px /= pLen; py /= pLen; pz /= pLen;
                projX = px * sLen; projY = py * sLen; projZ = pz * sLen;
              }
            }
          }
        }

        const w = d / longestDist;
        meanX += w * projX; meanY += w * projY; meanZ += w * projZ;
        factor += w;
      }

      if (factor > 0) {
        out[v * 3 + 0] = meanX / factor;
        out[v * 3 + 1] = meanY / factor;
        out[v * 3 + 2] = meanZ / factor;
        valueSet[v] = 1;
        changed = true;
      }
    }

    if (allSet) break;
    if (!changed) {
      // Stuck: matches the C++ "areas where propagation is stuck. Aborting".
      break;
    }
  }

  return out;
}
