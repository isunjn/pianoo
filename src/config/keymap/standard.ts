import type { KeymapKeys } from "~/core/keymap";

// prettier-ignore
export const KEYMAP_STANDARD: KeymapKeys = new Map()
  .set(2, ["1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "z", "Z", "x", "X"])
  .set(3, ["q", "Q", "w", "W", "e", "E", "a", "A", "s", "S", "d", "D", "f", "F"])
  .set(4, ["g", "G", "h", "H", "j", "J", "k", "K", "l", "L", "n", "N", "m", "M"])
  .set(5, ["r", "R", "t", "T", "y", "Y", "u", "U", "i", "I", "o", "O", "p", "P"])
  .set(6, ["6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "c", "C", "v", "V"]);
