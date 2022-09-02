import { type Octave, ParsedNote } from "~/core/parser";
import { getTonality, type TonalityKind, Tonality } from "~/core/tonality";
import { getKeymapKeys, type KeymapKind } from "~/config/keymap";
import { K_KEYMAP } from "~/constants/storage-keys";

type Key = string;
type NoteName = string;
export type KeymapKeys = Map<Octave, Key[]>;

class Keymap {
  private tonality: Tonality;
  private keys: KeymapKeys; // point to majorKeys or minorKeys
  private readonly majorKeys: KeymapKeys;
  private readonly minorKeys: KeymapKeys;
  private readonly keyToNote: Map<Key, NoteName>;

  private constructor(allKeys: KeymapKeys) {
    // allKeys contains 14 keys per octave
    this.majorKeys = new Map();
    this.minorKeys = new Map();
    allKeys.forEach((keyRow, octave) => {
      // remove 6th and 14th
      const majorKeyRow = [...keyRow];
      majorKeyRow.splice(13, 1);
      majorKeyRow.splice(5, 1);
      this.majorKeys.set(octave, majorKeyRow);
      // remove 4th and 10th
      const minorKeyRow = [...keyRow];
      minorKeyRow.splice(9, 1);
      minorKeyRow.splice(3, 1);
      this.minorKeys.set(octave, minorKeyRow);
    });
    this.tonality = getTonality("1 = C");
    this.keys = this.majorKeys;
    this.keyToNote = new Map();
  }

  private buildKeyToNote() {
    this.keys.forEach((keyRow, octave) => {
      keyRow.forEach((key, keyIdx) => {
        const pitch = this.tonality.getPitch(keyIdx);
        const note = `${pitch}${octave}`;
        this.keyToNote.set(key, note);
      });
    });
  }

  public transpose(tonalityKind: TonalityKind) {
    const tonality = getTonality(tonalityKind);
    this.tonality = tonality;
    this.keys = tonality.mode == "major" ? this.majorKeys : this.minorKeys;
    this.keyToNote.clear();
    this.buildKeyToNote();
  }

  public getKey(note: Omit<ParsedNote, "kind" | "quarter">): Key {
    const { solfaNum, octave, accidental } = note;
    const keyIdx = this.tonality.getNormalizedIdx(solfaNum, accidental);
    return this.keys.get(octave)![keyIdx];
  }

  public getNote(key: Key): NoteName | undefined {
    return this.keyToNote.get(key);
  }

  public static getInstance(keymapKind?: KeymapKind): Keymap {
    return new Keymap(
      getKeymapKeys(
        keymapKind ??
          ((localStorage.getItem(K_KEYMAP) ?? "standard") as KeymapKind)
      )
    );
  }
}

export default Keymap;
