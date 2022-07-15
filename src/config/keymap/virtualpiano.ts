import type { KeymapKeys } from "~/core/keymap";

export const KEYMAP_VIRTUALPIANO: KeymapKeys = new Map()
  .set(2, ["1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "6", "^", "7", "&"])
  .set(3, ["8", "*", "9", "(", "0", ")", "q", "Q", "w", "W", "e", "E", "r", "R"])
  .set(4, ["t", "T", "y", "Y", "u", "U", "i", "I", "o", "O", "p", "P", "a", "A"])
  .set(5, ["s", "S", "d", "D", "f", "F", "g", "G", "h", "H", "j", "J", "k", "K"])
  .set(6, ["l", "L", "z", "Z", "x", "X", "c", "C", "v", "V", "b", "B", "n", "N"]);
