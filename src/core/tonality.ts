import type { TonalityKind, Mode, Pitch } from "~/core/types";

const CHROMATIC_CIRCLE: Pitch[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const CHROMATIC_CIRCLE_LENGTH = 12;
const MAJOR_SCALE_STEPS = [2, 2, 1, 2, 2, 2]; // W-W-H-W-W-W-H
const MINOR_SCALE_STEPS = [2, 1, 2, 2, 1, 2]; // W-H-W-W-H-W-W

class Tonality {
  private readonly pitchIndexes: number[];
  public readonly display: string;
  
  constructor(mode: Mode, tonic: Pitch, display: string) {
    const steps = mode == "major" ? MAJOR_SCALE_STEPS : MINOR_SCALE_STEPS;
    const tonicIdx = CHROMATIC_CIRCLE.indexOf(tonic);
    this.pitchIndexes = steps.reduce((indexes, step) => {
      indexes.push((indexes.at(-1)! + step) % CHROMATIC_CIRCLE_LENGTH);
      return indexes;
    }, [tonicIdx]);
    this.display = display;
  }

  public getPitch(solfaNum: number, accidental: "#" | "b" | undefined): Pitch {
    let idx = this.pitchIndexes[solfaNum - 1];
    if (accidental == "#") {
      idx = (idx + 1) % CHROMATIC_CIRCLE_LENGTH;
    } else if (accidental == "b") {
      idx = (idx + CHROMATIC_CIRCLE_LENGTH - 1) % CHROMATIC_CIRCLE_LENGTH;
    }
    return CHROMATIC_CIRCLE[idx];
  }
}

const tonalityMap = new Map<TonalityKind, Tonality>()
  .set("C", new Tonality("major", "C", "1 = C"))
  .set("G", new Tonality("major", "G", "1 = G"))
  .set("D", new Tonality("major", "D", "1 = D"))
  .set("A", new Tonality("major", "A", "1 = A"))
  .set("E", new Tonality("major", "E", "1 = E"))
  .set("B", new Tonality("major", "B", "1 = B"))
  .set("F#", new Tonality("major", "F#", "1 = #F"))
  .set("C#", new Tonality("major", "C#", "1 = #C"))
  .set("F", new Tonality("major", "F", "1 = F"))
  .set("Bb", new Tonality("major", "A#", "1 = bB"))
  .set("Eb", new Tonality("major", "D#", "1 = bE"))
  .set("Ab", new Tonality("major", "G#", "1 = bA"))
  .set("Db", new Tonality("major", "C#", "1 = bD"))
  .set("Gb", new Tonality("major", "F#", "1 = bG"))
  .set("Cb", new Tonality("major", "B", "1 = bC"))
  .set("Am", new Tonality("minor", "A", "6 = A"))
  .set("Em", new Tonality("minor", "E", "6 = E"))
  .set("Bm", new Tonality("minor", "B", "6 = B"))
  .set("F#m", new Tonality("minor", "F#", "6 = #F"))
  .set("C#m", new Tonality("minor", "C#", "6 = #C"))
  .set("G#m", new Tonality("minor", "G#", "6 = #G"))
  .set("D#m", new Tonality("minor", "D#", "6 = #D"))
  .set("A#m", new Tonality("minor", "A#", "6 = #A"))
  .set("Dm", new Tonality("minor", "D", "6 = D"))
  .set("Gm", new Tonality("minor", "G", "6 = G"))
  .set("Cm", new Tonality("minor", "C", "6 = C"))
  .set("Fm", new Tonality("minor", "F", "6 = F"))
  .set("Bbm", new Tonality("minor", "A#", "6 = bB"))
  .set("Ebm", new Tonality("minor", "D#", "6 = bE"))
  .set("Abm", new Tonality("minor", "G#", "6 = bA"));

export type { Tonality };

export default tonalityMap;
