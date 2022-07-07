/* word `mode` here is a music theory term */

export interface Mode {
  readonly display: string; // such as "1 = C"
  readonly pitch: { [num: number]: [string, string, string] }; // solfa number -> [regular pitch, sharp pitch, flat pitch]
}

const MODES: Record<string, Mode> = {
  // Natural C Major
  "C": {
    display: "1 = C",
    pitch: {
      1: ["C", "C#", "Cb"],
      2: ["D", "D#", "Db"], 
      3: ["E", "E#", "Eb"],
      4: ["F", "F#", "Fb"],
      5: ["G", "G#", "Gb"],
      6: ["A", "A#", "Ab"],
      7: ["B", "B#", "Bb"],
    },
  }
}

export const modes = {
  get(keysign: string): Mode {
    return MODES[keysign];
  },
  has(keysign: string): boolean {
    return Object.hasOwn(MODES, keysign);
  },
}
