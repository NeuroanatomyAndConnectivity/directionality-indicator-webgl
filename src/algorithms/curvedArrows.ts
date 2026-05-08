import type { MeshAdjacency } from "./meshAdjacency";

/**
 * Buffers describing one triangle-strip ribbon per arrow, where the strip
 * follows the direction field's curvature on the mesh surface.
 *
 * Equivalent to the original C++ geometry-shader path enabled by
 * `d_curvatureEnable` in `RenderIllustrativeLines-Arrows-geometry.glsl`.
 * WebGL2 has no geometry shaders, so the polyline (one point per ribbon
 * vertex pair) is computed CPU-side here and uploaded as plain attributes.
 *
 * Layout per arrow:
 *   - polyline = 2 * segmentsPerArrow + 1 path samples (backward walk +
 *     anchor + forward walk).
 *   - strip    = 2 * (2 * segmentsPerArrow + 1) vertices, alternating
 *     (left, right) at each path sample so a TRIANGLE_STRIP draws the ribbon.
 *
 * Per-vertex attributes are pre-expanded so the shader only has to extrude
 * sideways in view space (similar to the straight-arrow shader, but with
 * one tangent/normal per ribbon vertex rather than one per arrow).
 */
export interface CurvedArrowBuffers {
  /** vec3 per vertex (world-space path point — same for the L/R pair at one strip step). */
  positions: Float32Array;
  /** vec3 per vertex — unit world-space tangent at the path point. */
  tangents: Float32Array;
  /** vec3 per vertex — unit world-space normal at the path point. */
  normals: Float32Array;
  /** RGBA bytes per vertex — region color at the path point. */
  colors: Uint8Array;
  /** Float per vertex — longitudinal coord, -1 at tail to +1 at tip. Drives head/body split in the fragment shader. */
  stripY: Float32Array;
  /** Float per vertex — -1 (left of tangent) or +1 (right of tangent). */
  stripSide: Float32Array;
  /** Per-arrow first-vertex offset for `gl.drawArrays`. */
  firstIndices: Int32Array;
  /** Per-arrow vertex count for `gl.drawArrays`. */
  counts: Int32Array;
}

/** Default number of polyline segments to extend in each direction from the anchor. */
export const DEFAULT_SEGMENTS_PER_ARROW = 8;

/**
 * Walk the direction field one mesh edge at a time, choosing the neighbour
 * whose edge vector is most aligned (max dot-product) with the field
 * direction at `from`. Same heuristic as `sampleStreamlines`'s
 * `stepAlongField` so curved-arrow paths trace the same flow as straight
 * arrows would, just with finer sub-arrow resolution.
 *
 * Returns the neighbour vertex ID and the edge length, or null if the
 * direction is too short or no aligned neighbour exists.
 */
function stepAlongField(
  from: number,
  sign: number,
  vertices: Float32Array,
  adjacency: MeshAdjacency,
  directions: Float32Array,
): { next: number; edgeLen: number } | null {
  const dx = sign * directions[from * 3];
  const dy = sign * directions[from * 3 + 1];
  const dz = sign * directions[from * 3 + 2];
  const dl = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (dl < 1e-6) return null;
  const ndx = dx / dl, ndy = dy / dl, ndz = dz / dl;

  const ns = adjacency.neighbours(from);
  let bestN = -1;
  let bestScore = 0.3; // require >0.3 alignment (match seedArrows.ts threshold)
  let bestLen = 0;
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

/**
 * For each arrow anchor, walk `segmentsPerArrow` edges forward and backward
 * along the direction field, then build a ribbon (triangle-strip) along the
 * resulting polyline.
 *
 * The walk uses mesh edges (not arc-length stepping); each segment is one
 * mesh edge. This is intentionally coarse — the curvature shows up in the
 * resulting polyline because the edges already follow the surface.
 *
 * If a walk terminates early (direction too weak / no aligned neighbour),
 * the polyline simply runs through the anchor's own data for the missing
 * samples — the ribbon shrinks visually but the buffer layout stays
 * predictable so the shader can draw it without special-casing.
 *
 * @param anchors                 World positions of arrow anchors (vec3 per arrow).
 * @param anchorAdjacencyIndices  Mesh vertex IDs of each anchor (one per arrow).
 * @param vertices                Mesh vertex positions (vec3 per vertex).
 * @param adjacency               Mesh adjacency structure.
 * @param directions              Per-vertex tangent direction (vec3 per vertex).
 * @param normals                 Per-vertex unit normal (vec3 per vertex).
 * @param colors                  Per-vertex RGBA bytes.
 * @param segmentsPerArrow        Number of polyline edges per side of the anchor.
 *                                Total polyline length = 2*segmentsPerArrow edges
 *                                = 2*segmentsPerArrow + 1 sample points.
 */
export function buildCurvedArrowBuffers(
  anchors: Float32Array,
  anchorAdjacencyIndices: number[],
  vertices: Float32Array,
  adjacency: MeshAdjacency,
  directions: Float32Array,
  normals: Float32Array,
  colors: Uint8Array,
  segmentsPerArrow: number = DEFAULT_SEGMENTS_PER_ARROW,
): CurvedArrowBuffers {
  const arrowCount = anchorAdjacencyIndices.length;
  if (anchors.length !== arrowCount * 3) {
    throw new Error(
      `buildCurvedArrowBuffers: anchors.length (${anchors.length}) does not match anchorAdjacencyIndices.length*3 (${arrowCount * 3})`,
    );
  }

  const samplesPerArrow = 2 * segmentsPerArrow + 1;
  const vertsPerArrow = 2 * samplesPerArrow;
  const totalVerts = arrowCount * vertsPerArrow;

  const positions = new Float32Array(totalVerts * 3);
  const tangents = new Float32Array(totalVerts * 3);
  const norms = new Float32Array(totalVerts * 3);
  const cols = new Uint8Array(totalVerts * 4);
  const stripY = new Float32Array(totalVerts);
  const stripSide = new Float32Array(totalVerts);
  const firstIndices = new Int32Array(arrowCount);
  const counts = new Int32Array(arrowCount);

  // Scratch arrays reused per arrow.
  const pathVerts = new Int32Array(samplesPerArrow);
  const pathPos = new Float32Array(samplesPerArrow * 3);
  const pathTan = new Float32Array(samplesPerArrow * 3);
  const pathNor = new Float32Array(samplesPerArrow * 3);
  const pathCol = new Uint8Array(samplesPerArrow * 4);

  for (let a = 0; a < arrowCount; a++) {
    const anchorVID = anchorAdjacencyIndices[a];

    // Initialize all polyline samples to the anchor (used as fallback when
    // a walk terminates early — ensures buffers stay well-formed).
    for (let i = 0; i < samplesPerArrow; i++) {
      pathVerts[i] = anchorVID;
    }

    // Backward walk: fill samples [segmentsPerArrow-1 ... 0] from the anchor.
    let cur = anchorVID;
    for (let s = 0; s < segmentsPerArrow; s++) {
      const step = stepAlongField(cur, -1, vertices, adjacency, directions);
      if (!step) break;
      cur = step.next;
      pathVerts[segmentsPerArrow - 1 - s] = cur;
    }

    // Anchor occupies the middle slot.
    pathVerts[segmentsPerArrow] = anchorVID;

    // Forward walk: fill samples [segmentsPerArrow+1 ... 2*segmentsPerArrow].
    cur = anchorVID;
    for (let s = 0; s < segmentsPerArrow; s++) {
      const step = stepAlongField(cur, +1, vertices, adjacency, directions);
      if (!step) break;
      cur = step.next;
      pathVerts[segmentsPerArrow + 1 + s] = cur;
    }

    // Read attributes from the mesh at each polyline sample. Anchor sample
    // uses the supplied `anchors` position so caller-provided sub-vertex
    // offsets (e.g. from triangle-area-weighted Monte Carlo) survive.
    for (let i = 0; i < samplesPerArrow; i++) {
      const v = pathVerts[i];
      if (i === segmentsPerArrow) {
        pathPos[i * 3 + 0] = anchors[a * 3 + 0];
        pathPos[i * 3 + 1] = anchors[a * 3 + 1];
        pathPos[i * 3 + 2] = anchors[a * 3 + 2];
      } else {
        pathPos[i * 3 + 0] = vertices[v * 3 + 0];
        pathPos[i * 3 + 1] = vertices[v * 3 + 1];
        pathPos[i * 3 + 2] = vertices[v * 3 + 2];
      }
      const tx = directions[v * 3 + 0];
      const ty = directions[v * 3 + 1];
      const tz = directions[v * 3 + 2];
      const tl = Math.sqrt(tx * tx + ty * ty + tz * tz) || 1;
      pathTan[i * 3 + 0] = tx / tl;
      pathTan[i * 3 + 1] = ty / tl;
      pathTan[i * 3 + 2] = tz / tl;
      const nx = normals[v * 3 + 0];
      const ny = normals[v * 3 + 1];
      const nz = normals[v * 3 + 2];
      const nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      pathNor[i * 3 + 0] = nx / nl;
      pathNor[i * 3 + 1] = ny / nl;
      pathNor[i * 3 + 2] = nz / nl;
      pathCol[i * 4 + 0] = colors[v * 4 + 0];
      pathCol[i * 4 + 1] = colors[v * 4 + 1];
      pathCol[i * 4 + 2] = colors[v * 4 + 2];
      pathCol[i * 4 + 3] = 255;
    }

    // Emit the triangle strip: at each polyline sample, write a (left, right)
    // vertex pair. The shader extrudes them along the binormal.
    const baseVert = a * vertsPerArrow;
    firstIndices[a] = baseVert;
    counts[a] = vertsPerArrow;

    for (let i = 0; i < samplesPerArrow; i++) {
      // longitudinalParam in [0, 1] across the arrow (matches the original
      // geometry shader); convert to v_surfaceUV.y in [-1, +1] so the
      // existing fragment shader splits head/body correctly.
      const longitudinal = i / (samplesPerArrow - 1);
      const sy = 2 * longitudinal - 1;

      for (let side = 0; side < 2; side++) {
        const vIdx = baseVert + i * 2 + side;
        positions[vIdx * 3 + 0] = pathPos[i * 3 + 0];
        positions[vIdx * 3 + 1] = pathPos[i * 3 + 1];
        positions[vIdx * 3 + 2] = pathPos[i * 3 + 2];
        tangents[vIdx * 3 + 0] = pathTan[i * 3 + 0];
        tangents[vIdx * 3 + 1] = pathTan[i * 3 + 1];
        tangents[vIdx * 3 + 2] = pathTan[i * 3 + 2];
        norms[vIdx * 3 + 0] = pathNor[i * 3 + 0];
        norms[vIdx * 3 + 1] = pathNor[i * 3 + 1];
        norms[vIdx * 3 + 2] = pathNor[i * 3 + 2];
        cols[vIdx * 4 + 0] = pathCol[i * 4 + 0];
        cols[vIdx * 4 + 1] = pathCol[i * 4 + 1];
        cols[vIdx * 4 + 2] = pathCol[i * 4 + 2];
        cols[vIdx * 4 + 3] = pathCol[i * 4 + 3];
        stripY[vIdx] = sy;
        stripSide[vIdx] = side === 0 ? -1 : +1;
      }
    }
  }

  return {
    positions,
    tangents,
    normals: norms,
    colors: cols,
    stripY,
    stripSide,
    firstIndices,
    counts,
  };
}
