/* word `mode` here is a music theory term */

type Pitch = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

const CHROMATIC_CIRCLE: Pitch[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const CHROMATIC_CIRCLE_LENGTH = 12;
const STEPS_MAJOR = [2, 2, 1, 2, 2, 2]; // W-W-H-W-W-W-H
const STEPS_MINOR = [2, 1, 2, 2, 1, 2]; // W-H-W-W-H-W-W

class Mode {
  private readonly pitchIndexes: number[];
  public readonly display: string;
  
  constructor(scale: "major" | "minor", tonic: Pitch, display: string) {
    const steps = scale == "major" ? STEPS_MAJOR : STEPS_MINOR;
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

const modeMap = new Map<string, Mode>()
  .set("C", new Mode("major", "C", "1 = C"))
  .set("G", new Mode("major", "G", "1 = G"))
  .set("D", new Mode("major", "D", "1 = D"))
  .set("A", new Mode("major", "A", "1 = A"))
  .set("E", new Mode("major", "E", "1 = E"))
  .set("B", new Mode("major", "B", "1 = B"))
  .set("F#", new Mode("major", "F#", "1 = #F"))
  .set("C#", new Mode("major", "C#", "1 = #C"))
  .set("F", new Mode("major", "F", "1 = F"))
  .set("Bb", new Mode("major", "A#", "1 = bB"))
  .set("Eb", new Mode("major", "D#", "1 = bE"))
  .set("Ab", new Mode("major", "G#", "1 = bA"))
  .set("Db", new Mode("major", "C#", "1 = bD"))
  .set("Gb", new Mode("major", "F#", "1 = bG"))
  .set("Cb", new Mode("major", "B", "1 = bC"))
  .set("Am", new Mode("minor", "A", "6 = A"))
  .set("Em", new Mode("minor", "E", "6 = E"))
  .set("Bm", new Mode("minor", "B", "6 = B"))
  .set("F#m", new Mode("minor", "F#", "6 = #F"))
  .set("C#m", new Mode("minor", "C#", "6 = #C"))
  .set("G#m", new Mode("minor", "G#", "6 = #G"))
  .set("D#m", new Mode("minor", "D#", "6 = #D"))
  .set("A#m", new Mode("minor", "A#", "6 = #A"))
  .set("Dm", new Mode("minor", "D", "6 = D"))
  .set("Gm", new Mode("minor", "G", "6 = G"))
  .set("Cm", new Mode("minor", "C", "6 = C"))
  .set("Fm", new Mode("minor", "F", "6 = F"))
  .set("Bbm", new Mode("minor", "A#", "6 = bB"))
  .set("Ebm", new Mode("minor", "D#", "6 = bE"))
  .set("Abm", new Mode("minor", "G#", "6 = bA"));

export type { Mode };

export default modeMap;
