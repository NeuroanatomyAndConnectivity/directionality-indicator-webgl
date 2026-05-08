import { describe, it, expect } from "vitest";
import { mat4, vec3 } from "gl-matrix";
import { createTrackball } from "./camera";

function eyeOf(viewMatrix: mat4): vec3 {
  const inv = mat4.create();
  mat4.invert(inv, viewMatrix);
  // Translation column of the inverse view matrix == camera world position.
  return vec3.fromValues(inv[12], inv[13], inv[14]);
}

describe("createTrackball", () => {
  it("fitSphere positions the camera at distance proportional to radius (regression: hardcoded 100 zoom clamp)", () => {
    const cam = createTrackball();
    cam.resize(800, 600);
    cam.fitSphere(vec3.fromValues(0, 0, 0), 100);

    const eye = eyeOf(cam.view);
    const dist = vec3.length(eye);

    // New behavior: distance ≈ radius * 2.5 = 250. The OLD bug clamped this to 100.
    // Fail-loud bounds — a regression to the old code would clamp at 100.
    expect(dist).toBeGreaterThan(150);
    expect(dist).toBeLessThan(400);
  });

  it("fitSphere works for tiny meshes (radius=1) without producing NaN", () => {
    const cam = createTrackball();
    cam.resize(800, 600);
    cam.fitSphere(vec3.fromValues(0, 0, 0), 1);

    const eye = eyeOf(cam.view);
    expect(Number.isFinite(eye[0])).toBe(true);
    expect(Number.isFinite(eye[1])).toBe(true);
    expect(Number.isFinite(eye[2])).toBe(true);
  });

  it("fitSphere centers on a non-origin target", () => {
    const cam = createTrackball();
    cam.resize(800, 600);
    const center = vec3.fromValues(-32.6, -17.3, 15.2); // demo brain bbox center
    cam.fitSphere(center, 109);

    const eye = eyeOf(cam.view);
    const offset = vec3.create();
    vec3.subtract(offset, eye, center);
    const distFromTarget = vec3.length(offset);

    // Distance is from target, not from origin.
    expect(distFromTarget).toBeGreaterThan(150);
    expect(distFromTarget).toBeLessThan(400);
  });
});
