import type { MusicScore, SheetItems } from "~/core/types";

class NooteSyntaxError extends SyntaxError {
  constructor(message: string) {
    super(message);
  }
}

function parse(score: MusicScore, transpose?: string): SheetItems {
  // const items: SheetItem[][] = [];
  // const nootes = score.content.split(" ");
  // try {
  //   nootes.forEach(noote => items.push(parseNoote(noote)));
  // } catch (error) {
  //   if (error instanceof NooteSyntaxError) {
  //     // TODO
  //   }
  // }
  // return items;

  return [
    [
      { kind: "rest", quarter: 1 },
      { kind: "rest", quarter: 1 },
      { kind: "rest", quarter: 1 },
      { kind: "note", note: "A4", quarter: 0.5 },
      { kind: "note", note: "A4", quarter: 0.5 },
      { kind: "note", note: "A4", quarter: 0.5 },
      { kind: "note", note: "A4", quarter: 0.5 },
      { kind: "note", note: "B4", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 1.5 },
      { kind: "note", note: "B4", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 1 },
      { kind: "note", note: "E5", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
      { kind: "rest", quarter: 1 },
      { kind: "note", note: "E4", quarter: 1 },
      { kind: "note", note: "A4", quarter: 1.5 },
      { kind: "note", note: "G4", quarter: 0.5 },
      { kind: "note", note: "A4", quarter: 1 },
      { kind: "note", note: "C5", quarter: 1 },
      { kind: "note", note: "G4", quarter: 1.5 },
      { kind: "chord", notes: ["A4", "B4", "C5"], quarter: 1 },
      { kind: "rest", quarter: 1 },
    ],
    [
      { kind: "note", note: "F4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 0.5 },
      { kind: "note", note: "E4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 1.5 },
      { kind: "note", note: "E4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 1 },
      { kind: "note", note: "C5", quarter: 1 },
      { kind: "note", note: "E4", quarter: 2 },
      { kind: "rest", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "B4", quarter: 1.5 },
      { kind: "note", note: "F#4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
      { kind: "rest", quarter: 1 },
    ],
    [
      { kind: "note", note: "F4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 0.5 },
      { kind: "note", note: "E4", quarter: 0.5 },
      { kind: "note", note: "F#4", quarter: 1 },
      { kind: "note", note: "C#5", quarter: 1 },
      { kind: "note", note: "E4", quarter: 2 },
      { kind: "rest", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "B#4", quarter: 1.5 },
      { kind: "note", note: "F#4", quarter: 0.5 },
      { kind: "note", note: "F#4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
      { kind: "rest", quarter: 1 },
    ],
    [
      { kind: "note", note: "F4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 0.5 },
      { kind: "note", note: "E#4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 1.5 },
      { kind: "note", note: "E4", quarter: 0.5 },
      { kind: "note", note: "F4", quarter: 1 },
      { kind: "note", note: "C5", quarter: 1 },
      { kind: "note", note: "E4", quarter: 2 },
      { kind: "rest", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "G#5", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "C5", quarter: 0.5 },
      { kind: "note", note: "B#4", quarter: 1.5 },
      { kind: "note", note: "F#4", quarter: 0.5 },
      { kind: "note", note: "A#4", quarter: 1 },
      { kind: "note", note: "E#4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
      { kind: "rest", quarter: 1 },
    ],
    [
      { kind: "note", note: "B#4", quarter: 1.5 },
      { kind: "note", note: "F#4", quarter: 0.5 },
      { kind: "note", note: "A#4", quarter: 1 },
      { kind: "note", note: "E#4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
      { kind: "rest", quarter: 1 },
    ],
    [
      { kind: "note", note: "B#4", quarter: 1.5 },
      { kind: "note", note: "F#4", quarter: 0.5 },
      { kind: "rest", quarter: 1 },
      { kind: "note", note: "E#4", quarter: 1 },
      { kind: "note", note: "A#4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
    ],
    [
      { kind: "note", note: "B#4", quarter: 1.5 },
      { kind: "note", note: "F#4", quarter: 0.5 },
      { kind: "note", note: "A#4", quarter: 1 },
      { kind: "note", note: "E#4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
      { kind: "rest", quarter: 1 },
    ],
    [
      { kind: "note", note: "B#4", quarter: 1.5 },
      { kind: "note", note: "F#4", quarter: 0.5 },
      { kind: "rest", quarter: 1 },
      { kind: "note", note: "E#4", quarter: 1 },
      { kind: "note", note: "A#4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
    ],
    [
      { kind: "note", note: "B#4", quarter: 1.5 },
      { kind: "note", note: "F#4", quarter: 0.5 },
      { kind: "note", note: "A#4", quarter: 1 },
      { kind: "note", note: "E#4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
      { kind: "rest", quarter: 1 },
    ],
    [
      { kind: "note", note: "B#4", quarter: 1.5 },
      { kind: "note", note: "F#4", quarter: 0.5 },
      { kind: "rest", quarter: 1 },
      { kind: "note", note: "E#4", quarter: 1 },
      { kind: "note", note: "A#4", quarter: 1 },
      { kind: "note", note: "B4", quarter: 2 },
    ],
  ]
}

// function parseNoote(noote: string): SheetItem {
//   // if (noote == "|") return { kind: "barline" };
//   // if (noote == "0") return { kind: "rest" };

//   // TODO: parse note and chord

//   throw new NooteSyntaxError(`syntax error with this noote: ${noote}`);
// }

export default parse;
