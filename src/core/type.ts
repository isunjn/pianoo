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

export type SheetItem = Note | Chord | Rest;

interface Note {
  kind: "note";
  note: string;
  duration: number;
}

interface Chord {
  kind: "chord";
  notes: string[];
  duration: number;
}

interface Rest {
  kind: "rest";
  duration: number;
}
