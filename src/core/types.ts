export interface MusicScore {
  id: number;
  name: string;
  keySignature: string;
  timeSignature: string;
  bpm: number;
  content: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  original: string;
  composer: string;
  /* TODO: more fields */
}

interface Note {
  kind: "note";
  note: string;
  quarter: number;
}

interface Chord {
  kind: "chord";
  notes: string[];
  quarter: number;
}

interface Rest {
  kind: "rest";
  quarter: number;
}

export type SheetItem = Note | Chord | Rest;

export type SheetItems = SheetItem[][]; // rows -> row -> item

export type NoteOrChord = Note | Chord;

export type ExpectedKey = string | string[]; // note key or chord keys
