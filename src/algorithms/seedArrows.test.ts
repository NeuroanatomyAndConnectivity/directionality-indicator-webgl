import { describe, it, expect } from "vitest";
import { seedArrows } from "./seedArrows";

describe("seedArrows", () => {
  it("skips vertices with zero direction", () => {
    const dirs = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]);
    const seeded = seedArrows(dirs, { stride: 1, minLength: 0.001 });
    expect(seeded).toEqual([1, 2]);
  });

  it("respects stride: stride=2 keeps every other valid vertex", () => {
    const dirs = new Float32Array([
      1, 0, 0,  // 0
      1, 0, 0,  // 1
      1, 0, 0,  // 2
      1, 0, 0,  // 3
      1, 0, 0,  // 4
    ]);
    const seeded = seedArrows(dirs, { stride: 2, minLength: 0.001 });
    expect(seeded).toEqual([0, 2, 4]);
  });

  it("always includes the first valid vertex even with very large stride", () => {
    const dirs = new Float32Array([1, 0, 0]);
    const seeded = seedArrows(dirs, { stride: 100, minLength: 0.001 });
    expect(seeded).toEqual([0]);
  });
});
