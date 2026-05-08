/**
 * Compute per-vertex normals as the area-weighted sum of incident face normals.
 *
 * Triangle face normal = (b-a) × (c-a). Its magnitude is 2 × triangle area, so by
 * NOT normalizing the face normal before accumulating, larger triangles automatically
 * contribute proportionally more — this is the standard area-weighted formulation.
 * Final per-vertex normals are then normalized to unit length.
 *
 * Vertices with no incident triangles get (0, 0, 0).
 */
export function computeVertexNormals(
  vertices: Float32Array,
  indices: Uint32Array | Uint16Array,
): Float32Array {
  const vertexCount = vertices.length / 3;
  const out = new Float32Array(vertexCount * 3);

  const triangleCount = indices.length / 3;
  for (let t = 0; t < triangleCount; t++) {
    const ia = indices[t * 3 + 0];
    const ib = indices[t * 3 + 1];
    const ic = indices[t * 3 + 2];

    const ax = vertices[ia * 3 + 0], ay = vertices[ia * 3 + 1], az = vertices[ia * 3 + 2];
    const bx = vertices[ib * 3 + 0], by = vertices[ib * 3 + 1], bz = vertices[ib * 3 + 2];
    const cx = vertices[ic * 3 + 0], cy = vertices[ic * 3 + 1], cz = vertices[ic * 3 + 2];

    // Edge vectors.
    const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
    const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;

    // Cross product (NOT normalized — magnitude == 2 × triangle area).
    const nx = e1y * e2z - e1z * e2y;
    const ny = e1z * e2x - e1x * e2z;
    const nz = e1x * e2y - e1y * e2x;

    out[ia * 3 + 0] += nx; out[ia * 3 + 1] += ny; out[ia * 3 + 2] += nz;
    out[ib * 3 + 0] += nx; out[ib * 3 + 1] += ny; out[ib * 3 + 2] += nz;
    out[ic * 3 + 0] += nx; out[ic * 3 + 1] += ny; out[ic * 3 + 2] += nz;
  }

  // Normalize each vertex normal.
  for (let v = 0; v < vertexCount; v++) {
    const x = out[v * 3 + 0], y = out[v * 3 + 1], z = out[v * 3 + 2];
    const len = Math.sqrt(x * x + y * y + z * z);
    if (len > 0) {
      out[v * 3 + 0] = x / len;
      out[v * 3 + 1] = y / len;
      out[v * 3 + 2] = z / len;
    }
  }

  return out;
}
