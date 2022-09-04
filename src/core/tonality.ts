import type { Accidental, SolfaNum } from "~/core/parser";

type Mode = "major" | "minor";

type Pitch =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

export type TonalityKind =
  | "1 = C"
  | "1 = G"
  | "1 = D"
  | "1 = A"
  | "1 = E"
  | "1 = B"
  | "1 = #F"
  | "1 = #C"
  | "1 = F"
  | "1 = bB"
  | "1 = bE"
  | "1 = bA"
  | "1 = bD"
  | "1 = bG"
  | "1 = bC"
  | "6 = A"
  | "6 = E"
  | "6 = B"
  | "6 = #F"
  | "6 = #C"
  | "6 = #G"
  | "6 = #D"
  | "6 = #A"
  | "6 = D"
  | "6 = G"
  | "6 = C"
  | "6 = F"
  | "6 = bB"
  | "6 = bE"
  | "6 = bA";

const CHROMATIC_CIRCLE: Pitch[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const CIRCLE_LEN = 12;
const MAJOR_SCALE_STEPS = [2, 2, 1, 2, 2, 2]; // W-W-H-W-W-W-H
const MINOR_SCALE_STEPS = [2, 1, 2, 2, 1, 2]; // W-H-W-W-H-W-W

class Tonality {
  public readonly mode: Mode;
  private readonly pitchIndexes: number[];
  private readonly transposition: number;

  constructor(mode: Mode, tonic: Pitch) {
    this.mode = mode;
    const tonicIdx = CHROMATIC_CIRCLE.indexOf(tonic);
    const steps = mode == "major" ? MAJOR_SCALE_STEPS : MINOR_SCALE_STEPS;
    this.pitchIndexes = steps.reduce(
      (indexes, step) => {
        indexes.push((indexes.at(-1)! + step) % CIRCLE_LEN);
        return indexes;
      },
      [tonicIdx]
    );
    this.transposition = tonicIdx;
  }

  public getNormalizedIdx(solfaNum: SolfaNum, accidental: Accidental): number {
    let pitchIdx = this.pitchIndexes[solfaNum - 1];
    if (accidental == "#") {
      pitchIdx = (pitchIdx + 1) % CIRCLE_LEN;
    } else if (accidental == "b") {
      pitchIdx = (pitchIdx - 1 + CIRCLE_LEN) % CIRCLE_LEN;
    }
    return (pitchIdx - this.transposition + CIRCLE_LEN) % CIRCLE_LEN;
  }

  public getPitch(normalizedIdx: number): Pitch {
    const pitchIdx = (normalizedIdx + this.transposition) % CIRCLE_LEN;
    return CHROMATIC_CIRCLE[pitchIdx];
  }
}

const tonalities: Record<TonalityKind, Tonality> = {
  "1 = C": new Tonality("major", "C"),
  "1 = G": new Tonality("major", "G"),
  "1 = D": new Tonality("major", "D"),
  "1 = A": new Tonality("major", "A"),
  "1 = E": new Tonality("major", "E"),
  "1 = B": new Tonality("major", "B"),
  "1 = #F": new Tonality("major", "F#"),
  "1 = #C": new Tonality("major", "C#"),
  "1 = F": new Tonality("major", "F"),
  "1 = bB": new Tonality("major", "A#"),
  "1 = bE": new Tonality("major", "D#"),
  "1 = bA": new Tonality("major", "G#"),
  "1 = bD": new Tonality("major", "C#"),
  "1 = bG": new Tonality("major", "F#"),
  "1 = bC": new Tonality("major", "B"),
  "6 = A": new Tonality("minor", "A"),
  "6 = E": new Tonality("minor", "E"),
  "6 = B": new Tonality("minor", "B"),
  "6 = #F": new Tonality("minor", "F#"),
  "6 = #C": new Tonality("minor", "C#"),
  "6 = #G": new Tonality("minor", "G#"),
  "6 = #D": new Tonality("minor", "D#"),
  "6 = #A": new Tonality("minor", "A#"),
  "6 = D": new Tonality("minor", "D"),
  "6 = G": new Tonality("minor", "G"),
  "6 = C": new Tonality("minor", "C"),
  "6 = F": new Tonality("minor", "F"),
  "6 = bB": new Tonality("minor", "A#"),
  "6 = bE": new Tonality("minor", "D#"),
  "6 = bA": new Tonality("minor", "G#"),
};

export const tonalityList = Object.keys(tonalities) as readonly TonalityKind[];

export function getTonality(tonalityKind: TonalityKind): Tonality {
  return tonalities[tonalityKind];
}

export type { Tonality };
