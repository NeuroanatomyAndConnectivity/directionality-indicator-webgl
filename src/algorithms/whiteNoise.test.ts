import { describe, it, expect } from "vitest";
import { generateWhiteNoise3D } from "./whiteNoise";

describe("generateWhiteNoise3D", () => {
  it("produces deterministic output for the same seed", () => {
    const a = generateWhiteNoise3D(8, 8, 8, 42);
    const b = generateWhiteNoise3D(8, 8, 8, 42);
    expect(a.length).toBe(8 * 8 * 8);
    expect(Array.from(a)).toEqual(Array.from(b));
  });

  it("produces different output for different seeds", () => {
    const a = generateWhiteNoise3D(8, 8, 8, 42);
    const b = generateWhiteNoise3D(8, 8, 8, 43);
    let differences = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) differences++;
    expect(differences).toBeGreaterThan(a.length * 0.5);
  });

  it("output values span the full byte range", () => {
    const a = generateWhiteNoise3D(16, 16, 16, 1);
    let min = 255, max = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] < min) min = a[i];
      if (a[i] > max) max = a[i];
    }
    expect(min).toBeLessThan(20);
    expect(max).toBeGreaterThan(235);
  });
});
