import type { KeymapKeys } from "~/core/keymap";

// prettier-ignore
const KEYS_STANDARD: KeymapKeys = new Map()
  .set(2, ["1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "z", "Z", "x", "X"])
  .set(3, ["q", "Q", "w", "W", "e", "E", "a", "A", "s", "S", "d", "D", "f", "F"])
  .set(4, ["g", "G", "h", "H", "j", "J", "k", "K", "l", "L", "n", "N", "m", "M"])
  .set(5, ["r", "R", "t", "T", "y", "Y", "u", "U", "i", "I", "o", "O", "p", "P"])
  .set(6, ["6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "c", "C", "v", "V"]);

// prettier-ignore
const KEYS_VIRTUALPIANO: KeymapKeys = new Map()
  .set(2, ["1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "6", "^", "7", "&"])
  .set(3, ["8", "*", "9", "(", "0", ")", "q", "Q", "w", "W", "e", "E", "r", "R"])
  .set(4, ["t", "T", "y", "Y", "u", "U", "i", "I", "o", "O", "p", "P", "a", "A"])
  .set(5, ["s", "S", "d", "D", "f", "F", "g", "G", "h", "H", "j", "J", "k", "K"])
  .set(6, ["l", "L", "z", "Z", "x", "X", "c", "C", "v", "V", "b", "B", "n", "N"]);

export type KeymapKind = "standard" | "virtualpiano";

export function getKeymapKeys(keymapKind: KeymapKind): KeymapKeys {
  return keymapKind == "standard" ? KEYS_STANDARD : KEYS_VIRTUALPIANO;
}
