// Intentionally empty — framebuffer.ts is exercised by integration in Task 9.
// Adding jsdom + headless-gl just for FBO creation tests would add ~50MB of
// dependencies for limited value. If a regression appears, add a focused
// integration test that boots a WebGL2 context and creates a sample FBO.
import { describe, it } from "vitest";

describe("framebuffer", () => {
  it.skip("FBO creation requires a WebGL2 context (covered by integration)", () => {});
});
