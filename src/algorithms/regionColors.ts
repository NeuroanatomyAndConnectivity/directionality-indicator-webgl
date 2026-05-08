// HSV→RGB. h ∈ [0,1], s ∈ [0,1], v ∈ [0,1]. Returns 3 bytes.
function hsv2rgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Build a per-region RGBA palette from labelorder.
 * Region at orderIndex i gets hue i/N around the wheel.
 */
export function buildRegionPalette(labelOrder: Int32Array): Map<number, [number, number, number, number]> {
  const palette = new Map<number, [number, number, number, number]>();
  const n = labelOrder.length;
  for (let i = 0; i < n; i++) {
    const regionId = labelOrder[i];
    const [r, g, b] = hsv2rgb(i / n, 0.6, 0.95);
    palette.set(regionId, [r, g, b, 255]);
  }
  return palette;
}

/**
 * For each vertex, look up its region's RGBA. Unmapped → grey.
 */
export function buildVertexColors(labels: Int32Array, labelOrder: Int32Array): Uint8Array {
  const palette = buildRegionPalette(labelOrder);
  const out = new Uint8Array(labels.length * 4);
  const fallback: [number, number, number, number] = [128, 128, 128, 255];
  for (let v = 0; v < labels.length; v++) {
    const c = palette.get(labels[v]) ?? fallback;
    out[v * 4 + 0] = c[0];
    out[v * 4 + 1] = c[1];
    out[v * 4 + 2] = c[2];
    out[v * 4 + 3] = c[3];
  }
  return out;
}
