import { _parseIntList } from "./labelReader";

export function parseLabelOrder(text: string): Int32Array {
  return _parseIntList(text);
}
