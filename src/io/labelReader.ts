export function parseLabels(text: string): Int32Array {
  return parseIntList(text);
}

function parseIntList(text: string): Int32Array {
  const tokens = text.split(/[,\s]+/).filter((t) => t.length > 0);
  const out = new Int32Array(tokens.length);
  for (let i = 0; i < tokens.length; i++) {
    const n = parseInt(tokens[i], 10);
    if (Number.isNaN(n)) throw new Error(`labels: non-integer token at index ${i}: "${tokens[i]}"`);
    out[i] = n;
  }
  return out;
}

// Exported for reuse by labelOrderReader.
export const _parseIntList = parseIntList;
