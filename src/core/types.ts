export type Mode = "major" | "minor";
export type Pitch = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";
export type TonalityKind =
  | "C" | "G" | "D" | "A" | "E" | "B" | "F#" | "C#" | "F" | "Bb" | "Eb" | "Ab" | "Db" | "Gb" | "Cb"
  | "Am" | "Em" | "Bm" | "F#m" | "C#m" | "G#m" | "D#m" | "A#m" | "Dm" | "Gm" | "Cm" | "Fm" | "Bbm" | "Ebm" | "Abm";
export type { Tonality } from "./tonality";

export interface MusicScore {
  id: number;
  name: string;
  tonality: TonalityKind; // such as "C" => Natural C Major, "Cm" => Natural C Minor 
  timesign: [number, number]; // 2/4, 3/4, 4/4, etc.
  tempo: number; // beats per minute (BPM)
  content: string;
  // difficulty: 1 | 2 | 3 | 4 | 5;
  // likes: number;
  // dislikes: number;
  // length: number; // target time length in seconds
  // original: string;
  // artist: string;
  // composer: string;
  // genre: string;
  // country: string;
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
