import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parsePly } from "./plyReader";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixture = (name: string) => readFileSync(join(__dirname, "__fixtures__", name), "utf-8");

describe("parsePly", () => {
  it("parses ASCII cube with rgb colors and triangle faces", () => {
    const mesh = parsePly(fixture("cube.ply"));
    expect(mesh.vertices.length).toBe(8 * 3);
    expect(mesh.colors).not.toBeNull();
    expect(mesh.colors!.length).toBe(8 * 3);
    expect(mesh.indices.length).toBe(12 * 3);
    // First vertex: (0,0,0) red
    expect(Array.from(mesh.vertices.slice(0, 3))).toEqual([0, 0, 0]);
    expect(Array.from(mesh.colors!.slice(0, 3))).toEqual([255, 0, 0]);
    // First face: 0,1,2
    expect(Array.from(mesh.indices.slice(0, 3))).toEqual([0, 1, 2]);
    expect(mesh.normals).toBeNull();
  });

  it("throws on missing magic", () => {
    expect(() => parsePly("not a ply file")).toThrow(/PLY/);
  });

  it("parses real label34.ply demo file", () => {
    const text = readFileSync(join(__dirname, "../..", "public", "data", "label34.ply"), "utf-8");
    const mesh = parsePly(text);
    expect(mesh.vertices.length).toBe(32492 * 3);
    expect(mesh.indices.length).toBe(64980 * 3);
    expect(mesh.colors).not.toBeNull();
  });
});
