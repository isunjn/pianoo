import type { MusicScore } from "~/core/parser";
import Keymap from "~/core/keymap";
import panic from "~/utils/panic";

type SheetItems = SheetItem[][]; // rows -> row -> item
type SheetItem = SheetItemNote | SheetItemChord | SheetItemRest;
type NoteOrChord = SheetItemNote | SheetItemChord;

interface SheetItemNote {
  kind: "note";
  key: string;
  quarter: number;
}

interface SheetItemChord {
  kind: "chord";
  keys: string[];
  quarter: number;
}

interface SheetItemRest {
  kind: "rest";
  quarter: number;
}

export function getSheetItems(score: MusicScore, keymap: Keymap): SheetItems {
  return score.parsed.map(row => row.map(item => {
    switch (item.kind) {
      case "note": {
        const key = keymap.getKey(item);
        return { kind: "note", key, quarter: item.quarter };        
      }
      case "chord": {
        const keys = item.notes.map(note => keymap.getKey(note));
        return { kind: "chord", keys, quarter: item.quarter };
      }
      case "rest": {
        return { kind: "rest", quarter: item.quarter };
      }
      default: throw panic("unreachable");
    }
  }));
}

export function getSeq(sheetItems: SheetItems): NoteOrChord[] {
  return sheetItems.flat().filter(item => item.kind != "rest") as NoteOrChord[];
}

export function getAutoPlaySeq(sheetItems: SheetItems): SheetItem[] {
  return sheetItems.flat();
}
