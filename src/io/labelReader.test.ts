import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseLabels } from "./labelReader";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("parseLabels", () => {
  it("parses per-vertex region IDs", () => {
    const text = readFileSync(join(__dirname, "__fixtures__", "tiny.labels"), "utf-8");
    const result = parseLabels(text);
    expect(Array.from(result)).toEqual([1, 2, 1, 3, 2]);
  });

  it("parses real label34.labels demo file", () => {
    const text = readFileSync(join(__dirname, "../..", "public", "data", "label34.labels"), "utf-8");
    const result = parseLabels(text);
    expect(result.length).toBe(32492);
  });
});
