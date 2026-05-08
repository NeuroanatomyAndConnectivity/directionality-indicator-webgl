/**
 * Subdivide every mesh triangle whose three vertices span more than one parcel
 * region. The result has NO mixed triangles — each sub-triangle is uniform —
 * so the rendered parcel boundary follows the actual mid-edge polyline rather
 * than the arbitrary triangle medians used by the per-fragment selection
 * fallback.
 *
 * Algorithm (per triangle ABC with labels lA, lB, lC):
 *
 * 1 distinct label  → keep as-is.
 *
 * 2 distinct labels → identify the "odd" vertex (the one with the unique label).
 *   Place a midpoint on each of the two boundary edges. DUPLICATE each midpoint:
 *   one copy gets the odd region's color/label, the other gets the majority's.
 *   That way every emitted sub-triangle is single-region.
 *     • odd corner     →  triangle (odd, m_odd_1, m_odd_2)
 *     • majority quad  →  triangles (other1, other2, m_other_2)
 *                                   (other1, m_other_2, m_other_1)
 *   The visible boundary is the line between m_*_1 and m_*_2, which lies on
 *   the actual edge midpoints of ABC — i.e., it follows the mesh's
 *   parcel-border polyline at sub-triangle resolution.
 *
 * 3 distinct labels → place a midpoint on each edge AND a centroid; duplicate
 *   each into the two/three region-specific copies. Each region gets a
 *   "wedge" of two sub-triangles (corner triangle + inner triangle to the
 *   centroid). Six sub-triangles total; all single-region.
 *
 * Per-vertex data (position, normal, direction) at the midpoints is linearly
 * interpolated from the edge endpoints; at the centroid it's the average of
 * the three corner values. Color is taken verbatim from the duplicate's owner
 * region (no blending).
 *
 * Memory: roughly ~3× the original vertex count and ~2× the original triangle
 * count for a typical brain mesh (most triangles are uniform; only ~10–15%
 * are on parcel borders).
 */

export interface SubdivideMeshInput {
  vertices: Float32Array;    // N * 3
  normals: Float32Array;
  directions: Float32Array;
  colors: Uint8Array;        // N * 4 (RGBA)
  labels: Int32Array;        // N
  indices: Uint32Array | Uint16Array;
}

export interface SubdivideMeshOutput {
  vertices: Float32Array;
  normals: Float32Array;
  directions: Float32Array;
  colors: Uint8Array;
  labels: Int32Array;
  indices: Uint32Array;
}

export function subdivideMixedTriangles(input: SubdivideMeshInput): SubdivideMeshOutput {
  const Norig = input.vertices.length / 3;

  const pos: number[] = [];
  const nor: number[] = [];
  const dir: number[] = [];
  const col: number[] = [];
  const lab: number[] = [];
  const idx: number[] = [];

  // Copy original vertices verbatim — they keep their indices.
  for (let v = 0; v < Norig; v++) {
    pos.push(input.vertices[v * 3], input.vertices[v * 3 + 1], input.vertices[v * 3 + 2]);
    nor.push(input.normals[v * 3], input.normals[v * 3 + 1], input.normals[v * 3 + 2]);
    dir.push(input.directions[v * 3], input.directions[v * 3 + 1], input.directions[v * 3 + 2]);
    col.push(input.colors[v * 4], input.colors[v * 4 + 1], input.colors[v * 4 + 2], input.colors[v * 4 + 3]);
    lab.push(input.labels[v]);
  }

  // Helper: linear-interpolate a midpoint at parametric t between va and vb,
  // tagging it with the given label/color. Returns the new vertex index.
  function addInterp(va: number, vb: number, t: number, label: number, c: [number, number, number, number]): number {
    const id = pos.length / 3;
    const u = 1 - t;
    pos.push(
      input.vertices[va * 3] * u + input.vertices[vb * 3] * t,
      input.vertices[va * 3 + 1] * u + input.vertices[vb * 3 + 1] * t,
      input.vertices[va * 3 + 2] * u + input.vertices[vb * 3 + 2] * t,
    );
    nor.push(
      input.normals[va * 3] * u + input.normals[vb * 3] * t,
      input.normals[va * 3 + 1] * u + input.normals[vb * 3 + 1] * t,
      input.normals[va * 3 + 2] * u + input.normals[vb * 3 + 2] * t,
    );
    dir.push(
      input.directions[va * 3] * u + input.directions[vb * 3] * t,
      input.directions[va * 3 + 1] * u + input.directions[vb * 3 + 1] * t,
      input.directions[va * 3 + 2] * u + input.directions[vb * 3 + 2] * t,
    );
    col.push(c[0], c[1], c[2], c[3]);
    lab.push(label);
    return id;
  }

  // Helper: centroid (1/3 of each corner) tagged with a label/color.
  function addCentroid(va: number, vb: number, vc: number, label: number, c: [number, number, number, number]): number {
    const id = pos.length / 3;
    const k = 1 / 3;
    pos.push(
      (input.vertices[va * 3] + input.vertices[vb * 3] + input.vertices[vc * 3]) * k,
      (input.vertices[va * 3 + 1] + input.vertices[vb * 3 + 1] + input.vertices[vc * 3 + 1]) * k,
      (input.vertices[va * 3 + 2] + input.vertices[vb * 3 + 2] + input.vertices[vc * 3 + 2]) * k,
    );
    nor.push(
      (input.normals[va * 3] + input.normals[vb * 3] + input.normals[vc * 3]) * k,
      (input.normals[va * 3 + 1] + input.normals[vb * 3 + 1] + input.normals[vc * 3 + 1]) * k,
      (input.normals[va * 3 + 2] + input.normals[vb * 3 + 2] + input.normals[vc * 3 + 2]) * k,
    );
    dir.push(
      (input.directions[va * 3] + input.directions[vb * 3] + input.directions[vc * 3]) * k,
      (input.directions[va * 3 + 1] + input.directions[vb * 3 + 1] + input.directions[vc * 3 + 1]) * k,
      (input.directions[va * 3 + 2] + input.directions[vb * 3 + 2] + input.directions[vc * 3 + 2]) * k,
    );
    col.push(c[0], c[1], c[2], c[3]);
    lab.push(label);
    return id;
  }

  function vColor(v: number): [number, number, number, number] {
    return [input.colors[v * 4], input.colors[v * 4 + 1], input.colors[v * 4 + 2], input.colors[v * 4 + 3]];
  }

  const triCount = input.indices.length / 3;
  for (let t = 0; t < triCount; t++) {
    const ia = input.indices[t * 3 + 0];
    const ib = input.indices[t * 3 + 1];
    const ic = input.indices[t * 3 + 2];
    const la = input.labels[ia];
    const lb = input.labels[ib];
    const lc = input.labels[ic];

    if (la === lb && lb === lc) {
      // Uniform triangle — keep as-is.
      idx.push(ia, ib, ic);
      continue;
    }

    if (la === lb || la === lc || lb === lc) {
      // 2 distinct labels: identify the odd vertex (unique label).
      let odd: number, p: number, q: number;
      let oddLabel: number, otherLabel: number;
      let oddCol: [number, number, number, number];
      let otherCol: [number, number, number, number];
      if (la === lb) {
        odd = ic; p = ia; q = ib;
        oddLabel = lc; otherLabel = la;
        oddCol = vColor(ic); otherCol = vColor(ia);
      } else if (la === lc) {
        odd = ib; p = ic; q = ia;
        oddLabel = lb; otherLabel = la;
        oddCol = vColor(ib); otherCol = vColor(ia);
      } else {
        odd = ia; p = ib; q = ic;
        oddLabel = la; otherLabel = lb;
        oddCol = vColor(ia); otherCol = vColor(ib);
      }
      // Original CCW: (ia, ib, ic). After re-naming: the "majority" pair is (p, q)
      // in the same CCW sense if odd was c; we need the winding (p, q, odd) to be
      // CCW. This holds if (p, q, odd) is a cyclic rotation of (ia, ib, ic).
      // For the three cases:
      //   la==lb (odd=c): p=ia, q=ib, odd=ic → (ia, ib, ic) ✓ same CCW
      //   la==lc (odd=b): p=ic, q=ia, odd=ib → (ic, ia, ib) — cyclic ✓
      //   lb==lc (odd=a): p=ib, q=ic, odd=ia → (ib, ic, ia) — cyclic ✓
      //
      // Boundary edges in CCW direction: (q, odd) and (odd, p).

      // Midpoints on each boundary edge, duplicated per region.
      const m_qo_other = addInterp(q, odd, 0.5, otherLabel, otherCol);
      const m_qo_odd = addInterp(q, odd, 0.5, oddLabel, oddCol);
      const m_op_other = addInterp(odd, p, 0.5, otherLabel, otherCol);
      const m_op_odd = addInterp(odd, p, 0.5, oddLabel, oddCol);

      // Odd-region sub-triangle (single corner): (m_qo_odd, odd, m_op_odd) — CCW.
      idx.push(m_qo_odd, odd, m_op_odd);

      // Other-region sub-quadrilateral covering p, q, m_qo_other, m_op_other.
      // The quad's CCW order around its perimeter is: p, q, m_qo_other, m_op_other.
      // Triangulate as (p, q, m_qo_other) and (p, m_qo_other, m_op_other).
      idx.push(p, q, m_qo_other);
      idx.push(p, m_qo_other, m_op_other);
    } else {
      // 3 distinct labels: each edge crosses a boundary. Place midpoints + a
      // centroid; each region gets a wedge of two sub-triangles meeting at the
      // centroid. Duplicate every junction vertex per adjacent region.
      const cA = vColor(ia);
      const cB = vColor(ib);
      const cC = vColor(ic);

      // Edge AB: m_AB_a (region A copy), m_AB_b (region B copy).
      const m_AB_a = addInterp(ia, ib, 0.5, la, cA);
      const m_AB_b = addInterp(ia, ib, 0.5, lb, cB);
      const m_BC_b = addInterp(ib, ic, 0.5, lb, cB);
      const m_BC_c = addInterp(ib, ic, 0.5, lc, cC);
      const m_CA_c = addInterp(ic, ia, 0.5, lc, cC);
      const m_CA_a = addInterp(ic, ia, 0.5, la, cA);

      const cent_a = addCentroid(ia, ib, ic, la, cA);
      const cent_b = addCentroid(ia, ib, ic, lb, cB);
      const cent_c = addCentroid(ia, ib, ic, lc, cC);

      // Region A wedge — corner A, midpoints m_AB_a + m_CA_a, centroid cent_a.
      // CCW around the wedge: (A, m_AB_a, cent_a, m_CA_a). Triangulate.
      idx.push(ia, m_AB_a, cent_a);
      idx.push(ia, cent_a, m_CA_a);
      // Region B wedge: (B, m_BC_b, cent_b, m_AB_b). Note: original CCW was a→b→c,
      // so going AROUND vertex B in CCW means going FROM the AB edge TOWARD B THEN
      // to the BC edge.
      idx.push(ib, m_BC_b, cent_b);
      idx.push(ib, cent_b, m_AB_b);
      // Region C wedge: (C, m_CA_c, cent_c, m_BC_c).
      idx.push(ic, m_CA_c, cent_c);
      idx.push(ic, cent_c, m_BC_c);
    }
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
