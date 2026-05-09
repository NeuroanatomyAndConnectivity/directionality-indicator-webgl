#!/usr/bin/env node
// Scans public/data/ for complete (.ply/.labels/.labelorder) triples and
// writes manifest.json so the runtime UI can list bundled datasets without
// hard-coding names. Run from the repo root before dev/build.

import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(here, "..", "public", "data");

const files = readdirSync(dataDir);
const byBase = new Map();
for (const f of files) {
  const m = /^(.+)\.(ply|labels|labelorder)$/.exec(f);
  if (!m) continue;
  const [, base, ext] = m;
  if (!byBase.has(base)) byBase.set(base, new Set());
  byBase.get(base).add(ext);
}

const datasets = [];
for (const [base, exts] of byBase) {
  if (exts.has("ply") && exts.has("labels") && exts.has("labelorder")) {
    datasets.push(base);
  }
}
datasets.sort();

const manifest = { datasets };
const out = join(dataDir, "manifest.json");
writeFileSync(out, JSON.stringify(manifest, null, 2) + "\n");
console.log(`[build-data-manifest] wrote ${datasets.length} dataset(s): ${datasets.join(", ")}`);
