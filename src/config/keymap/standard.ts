import type { KeymapKeys } from "~/core/keymap";

const KEYMAP_STANDARD: KeymapKeys = new Map()
  .set(2, ["1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "q", "Q", "w", "W"])
  .set(3, ["a", "A", "s", "S", "d", "D", "f", "F", "c", "C", "v", "V", "b", "B"])
  .set(4, ["g", "G", "h", "H", "j", "J", "k", "K", "l", "L", "n", "N", "m", "M"])
  .set(5, ["e", "E", "r", "R", "t", "T", "y", "Y", "u", "U", "i", "I", "o", "O"])
  .set(6, ["6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "z", "Z", "x", "X"]);

export default KEYMAP_STANDARD;
