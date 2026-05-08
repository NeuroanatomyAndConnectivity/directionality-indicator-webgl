import { describe, it, expect } from "vitest";
import { computeVertexNormals } from "./computeNormals";

function approx(a: number, b: number, eps = 1e-5): boolean {
  return Math.abs(a - b) < eps;
}

describe("computeVertexNormals", () => {
  it("computes outward normals for a single XY-plane triangle (CCW winding)", () => {
    // Triangle in z=0 plane, CCW from +z view → normal should be (0, 0, 1).
    const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
    const indices = new Uint32Array([0, 1, 2]);
    const normals = computeVertexNormals(vertices, indices);
    expect(normals.length).toBe(9);
    for (let v = 0; v < 3; v++) {
      expect(approx(normals[v * 3 + 0], 0)).toBe(true);
      expect(approx(normals[v * 3 + 1], 0)).toBe(true);
      expect(approx(normals[v * 3 + 2], 1)).toBe(true);
    }
  });

  it("normalizes each vertex normal to unit length", () => {
    // Two triangles sharing an edge — vertex 0 belongs to both.
    const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0]);
    const indices = new Uint32Array([0, 1, 2, 1, 3, 2]);
    const normals = computeVertexNormals(vertices, indices);
    for (let v = 0; v < 4; v++) {
      const x = normals[v * 3 + 0], y = normals[v * 3 + 1], z = normals[v * 3 + 2];
      const len = Math.sqrt(x * x + y * y + z * z);
      expect(approx(len, 1)).toBe(true);
    }
  });

  it("isolated vertex receives a zero normal (no contributing triangles)", () => {
    const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 5, 5, 5]);
    const indices = new Uint32Array([0, 1, 2]); // vertex 3 unused
    const normals = computeVertexNormals(vertices, indices);
    expect(normals[9]).toBe(0);
    expect(normals[10]).toBe(0);
    expect(normals[11]).toBe(0);
  });
});
