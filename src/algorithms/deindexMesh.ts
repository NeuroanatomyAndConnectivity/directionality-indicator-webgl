/**
 * De-index a mesh and build per-vertex attributes that let the LIC transform
 * fragment shader do per-fragment parcel-region selection.
 *
 * Why this is needed: with shared (indexed) vertex layout, each fragment of a
 * triangle gets a linearly-interpolated color across the triangle's three
 * vertex colors. For triangles spanning two parcels, this produces a fuzzy
 * gradient at the boundary. The fix: pass the triangle's THREE vertex colors
 * to the fragment shader unchanged, plus barycentric coordinates, and let the
 * fragment pick the color of whichever vertex has the highest barycentric.
 * Result: each fragment is colored by its NEAREST vertex's region — so the
 * boundary inside a mixed triangle is a clean straight line along a
 * bary-coord median, not a color gradient.
 *
 * Attribute layout per vertex of the de-indexed mesh:
 *   a_position, a_normal, a_vector, a_color  — copied from the input vertex
 *   a_bary    — vec3, one of (1,0,0), (0,1,0), (0,0,1) depending on which
 *               corner of its triangle this vertex is
 *   a_tColor0, a_tColor1, a_tColor2  — the three colors of this vertex's
 *               triangle, same on all 3 of the triangle's vertices
 *
 * Memory: triangleCount * 3 vertices, each ~55 bytes = ~10 MB on the brain
 * mesh. Acceptable for a one-time upload.
 */
export interface DeindexedMesh {
  vertices: Float32Array;
  normals: Float32Array;
  directions: Float32Array;
  colors: Uint8Array;
  bary: Uint8Array;
  tColor0: Uint8Array;
  tColor1: Uint8Array;
  tColor2: Uint8Array;
  indices: Uint32Array;
}

export function deindexMesh(input: {
  vertices: Float32Array;
  normals: Float32Array;
  directions: Float32Array;
  colors: Uint8Array;
  indices: Uint32Array | Uint16Array;
}): DeindexedMesh {
  const triCount = input.indices.length / 3;
  const N = triCount * 3;
  const newPos = new Float32Array(N * 3);
  const newNor = new Float32Array(N * 3);
  const newDir = new Float32Array(N * 3);
  const newCol = new Uint8Array(N * 4);
  const bary = new Uint8Array(N * 3);
  const tC0 = new Uint8Array(N * 4);
  const tC1 = new Uint8Array(N * 4);
  const tC2 = new Uint8Array(N * 4);
  const newIdx = new Uint32Array(N);

  for (let t = 0; t < triCount; t++) {
    const ia = input.indices[t * 3 + 0];
    const ib = input.indices[t * 3 + 1];
    const ic = input.indices[t * 3 + 2];
    const triVerts = [ia, ib, ic];

    // Triangle-level colors — read once per triangle.
    const cA = [input.colors[ia * 4 + 0], input.colors[ia * 4 + 1], input.colors[ia * 4 + 2], input.colors[ia * 4 + 3]];
    const cB = [input.colors[ib * 4 + 0], input.colors[ib * 4 + 1], input.colors[ib * 4 + 2], input.colors[ib * 4 + 3]];
    const cC = [input.colors[ic * 4 + 0], input.colors[ic * 4 + 1], input.colors[ic * 4 + 2], input.colors[ic * 4 + 3]];

    for (let k = 0; k < 3; k++) {
      const v = triVerts[k];
      const w = t * 3 + k;

      newPos[w * 3 + 0] = input.vertices[v * 3 + 0];
      newPos[w * 3 + 1] = input.vertices[v * 3 + 1];
      newPos[w * 3 + 2] = input.vertices[v * 3 + 2];

      newNor[w * 3 + 0] = input.normals[v * 3 + 0];
      newNor[w * 3 + 1] = input.normals[v * 3 + 1];
      newNor[w * 3 + 2] = input.normals[v * 3 + 2];

      newDir[w * 3 + 0] = input.directions[v * 3 + 0];
      newDir[w * 3 + 1] = input.directions[v * 3 + 1];
      newDir[w * 3 + 2] = input.directions[v * 3 + 2];

      newCol[w * 4 + 0] = input.colors[v * 4 + 0];
      newCol[w * 4 + 1] = input.colors[v * 4 + 1];
      newCol[w * 4 + 2] = input.colors[v * 4 + 2];
      newCol[w * 4 + 3] = input.colors[v * 4 + 3];

      // Barycentric tag for this corner of the triangle.
      bary[w * 3 + 0] = k === 0 ? 255 : 0;
      bary[w * 3 + 1] = k === 1 ? 255 : 0;
      bary[w * 3 + 2] = k === 2 ? 255 : 0;

      // The triangle's three colors, replicated on every corner so that
      // standard interpolation yields a constant — every fragment sees
      // exactly cA, cB, cC for the triangle it lives in.
      tC0[w * 4 + 0] = cA[0]; tC0[w * 4 + 1] = cA[1]; tC0[w * 4 + 2] = cA[2]; tC0[w * 4 + 3] = cA[3];
      tC1[w * 4 + 0] = cB[0]; tC1[w * 4 + 1] = cB[1]; tC1[w * 4 + 2] = cB[2]; tC1[w * 4 + 3] = cB[3];
      tC2[w * 4 + 0] = cC[0]; tC2[w * 4 + 1] = cC[1]; tC2[w * 4 + 2] = cC[2]; tC2[w * 4 + 3] = cC[3];

      newIdx[w] = w;
    }
  }

  return {
    vertices: newPos,
    normals: newNor,
    directions: newDir,
    colors: newCol,
    bary,
    tColor0: tC0,
    tColor1: tC1,
    tColor2: tC2,
    indices: newIdx,
  };
}
