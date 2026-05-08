import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseLabelOrder } from "./labelOrderReader";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("parseLabelOrder", () => {
  it("parses display-order region IDs", () => {
    const text = readFileSync(join(__dirname, "__fixtures__", "tiny.labelorder"), "utf-8");
    const result = parseLabelOrder(text);
    expect(Array.from(result)).toEqual([3, 1, 2]);
  });

  it("parses real label34.labelorder demo file (34 regions)", () => {
    const text = readFileSync(join(__dirname, "../..", "public", "data", "label34.labelorder"), "utf-8");
    const result = parseLabelOrder(text);
    expect(result.length).toBe(34);
  });
});
