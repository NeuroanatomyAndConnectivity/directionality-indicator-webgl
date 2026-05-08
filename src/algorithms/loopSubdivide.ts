/**
 * Loop-style 1→4 mesh subdivision (without smoothing of vertex positions).
 *
 * For each triangle, place a midpoint on each edge (deduplicated across
 * adjacent triangles via an edge-key map), then emit 4 sub-triangles. The
 * mesh quadruples in triangle count and grows in vertex count by ~1.5×.
 *
 * Per-vertex data at midpoints is linearly interpolated from the edge
 * endpoints (positions, normals, directions). Labels and colors use a
 * deterministic tie-break: the lower-indexed endpoint's value. The follow-up
 * majority-vote label-smoothing pass then refines the per-vertex labels at
 * the new finer resolution, producing a smoother parcel boundary curve than
 * the original mesh resolution allows.
 *
 * NB: this is uniform subdivision — every triangle is split, not just
 * border-adjacent ones. Memory cost ~4× per iteration. One iteration on the
 * brain mesh: 64k → 256k triangles, 32k → ~96k vertices, ~5 MB. Two iters:
 * 1M tris, ~290k verts, ~16 MB. Fine on modern GPUs.
 */

export interface LoopSubdivideInput {
  vertices: Float32Array;
  normals: Float32Array;
  directions: Float32Array;
  colors: Uint8Array;
  labels: Int32Array;
  indices: Uint32Array | Uint16Array;
}

export interface LoopSubdivideOutput {
  vertices: Float32Array;
  normals: Float32Array;
  directions: Float32Array;
  colors: Uint8Array;
  labels: Int32Array;
  indices: Uint32Array;
}

export function loopSubdivide(input: LoopSubdivideInput): LoopSubdivideOutput {
  const Norig = input.vertices.length / 3;
  const pos: number[] = [];
  const nor: number[] = [];
  const dir: number[] = [];
  const col: number[] = [];
  const lab: number[] = [];

  // Copy originals.
  for (let v = 0; v < Norig; v++) {
    pos.push(input.vertices[v * 3], input.vertices[v * 3 + 1], input.vertices[v * 3 + 2]);
    nor.push(input.normals[v * 3], input.normals[v * 3 + 1], input.normals[v * 3 + 2]);
    dir.push(input.directions[v * 3], input.directions[v * 3 + 1], input.directions[v * 3 + 2]);
    col.push(input.colors[v * 4], input.colors[v * 4 + 1], input.colors[v * 4 + 2], input.colors[v * 4 + 3]);
    lab.push(input.labels[v]);
  }

  const midpointID = new Map<number, number>();
  function key(va: number, vb: number): number {
    const lo = Math.min(va, vb);
    const hi = Math.max(va, vb);
    return lo * (1 << 22) + hi; // works for vertex IDs < 4 M
  }
  function midpoint(va: number, vb: number): number {
    const k = key(va, vb);
    const existing = midpointID.get(k);
    if (existing !== undefined) return existing;
    const id = pos.length / 3;
    midpointID.set(k, id);
    pos.push(
      (input.vertices[va * 3] + input.vertices[vb * 3]) * 0.5,
      (input.vertices[va * 3 + 1] + input.vertices[vb * 3 + 1]) * 0.5,
      (input.vertices[va * 3 + 2] + input.vertices[vb * 3 + 2]) * 0.5,
    );
    nor.push(
      (input.normals[va * 3] + input.normals[vb * 3]) * 0.5,
      (input.normals[va * 3 + 1] + input.normals[vb * 3 + 1]) * 0.5,
      (input.normals[va * 3 + 2] + input.normals[vb * 3 + 2]) * 0.5,
    );
    dir.push(
      (input.directions[va * 3] + input.directions[vb * 3]) * 0.5,
      (input.directions[va * 3 + 1] + input.directions[vb * 3 + 1]) * 0.5,
      (input.directions[va * 3 + 2] + input.directions[vb * 3 + 2]) * 0.5,
    );
    // Tie-break: lower vertex ID wins for label/color.
    const lo = va < vb ? va : vb;
    col.push(input.colors[lo * 4], input.colors[lo * 4 + 1], input.colors[lo * 4 + 2], input.colors[lo * 4 + 3]);
    lab.push(input.labels[lo]);
    return id;
  }

  const triCount = input.indices.length / 3;
  const idx: number[] = [];
  for (let t = 0; t < triCount; t++) {
    const ia = input.indices[t * 3 + 0];
    const ib = input.indices[t * 3 + 1];
    const ic = input.indices[t * 3 + 2];
    const m_ab = midpoint(ia, ib);
    const m_bc = midpoint(ib, ic);
    const m_ca = midpoint(ic, ia);
    // 4 sub-triangles, CCW.
    idx.push(ia, m_ab, m_ca);
    idx.push(m_ab, ib, m_bc);
    idx.push(m_bc, ic, m_ca);
    idx.push(m_ab, m_bc, m_ca);
  }

  return {
    vertices: new Float32Array(pos),
    normals: new Float32Array(nor),
    directions: new Float32Array(dir),
    colors: new Uint8Array(col),
    labels: new Int32Array(lab),
    indices: new Uint32Array(idx),
  };
}
