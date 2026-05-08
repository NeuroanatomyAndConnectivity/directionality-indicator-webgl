/**
 * Mulberry32: small, fast, deterministic seedable PRNG.
 * Returns a function that yields a 32-bit unsigned int per call.
 */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (t ^ (t >>> 14)) >>> 0;
  };
}

/**
 * Generate a 3D R8 (single-channel byte) noise volume.
 * Output length = width * height * depth, stored in row-major (x fastest, z slowest).
 */
export function generateWhiteNoise3D(width: number, height: number, depth: number, seed: number): Uint8Array {
  const rand = mulberry32(seed);
  const out = new Uint8Array(width * height * depth);
  for (let i = 0; i < out.length; i++) out[i] = rand() & 0xff;
  return out;
}
