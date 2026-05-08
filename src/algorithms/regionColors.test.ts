import { describe, it, expect } from "vitest";
import { buildVertexColors } from "./regionColors";

describe("buildVertexColors", () => {
  it("assigns distinct color per region ID", () => {
    // 5 vertices, regions [1,2,1,3,2], display order [3,1,2]
    const labels = new Int32Array([1, 2, 1, 3, 2]);
    const order = new Int32Array([3, 1, 2]);
    const colors = buildVertexColors(labels, order);
    expect(colors.length).toBe(5 * 4); // RGBA per vertex
    // Vertices 0 and 2 share region 1 → same color.
    expect(Array.from(colors.slice(0, 4))).toEqual(Array.from(colors.slice(8, 12)));
    // Vertices 1 and 4 share region 2 → same color.
    expect(Array.from(colors.slice(4, 8))).toEqual(Array.from(colors.slice(16, 20)));
    // Region 1 ≠ region 2.
    expect(Array.from(colors.slice(0, 3))).not.toEqual(Array.from(colors.slice(4, 7)));
  });

  it("alpha is always 255", () => {
    const colors = buildVertexColors(new Int32Array([1, 2, 3]), new Int32Array([1, 2, 3]));
    expect(colors[3]).toBe(255);
    expect(colors[7]).toBe(255);
    expect(colors[11]).toBe(255);
  });

  it("unmapped region IDs get grey fallback", () => {
    // Region 99 is not in labelorder → grey RGBA(128,128,128,255).
    const colors = buildVertexColors(new Int32Array([99]), new Int32Array([1, 2, 3]));
    expect(Array.from(colors)).toEqual([128, 128, 128, 255]);
  });
});
