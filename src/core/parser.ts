import type { MusicScore, SheetItem } from "~/core/type";

class NooteSyntaxError extends SyntaxError {
  constructor(message: string) {
    super(message);
  }
}

function parse(score: MusicScore, transpose?: string): SheetItem[][] {
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
      { kind: "rest", duration: 1 },
      { kind: "rest", duration: 1 },
      { kind: "rest", duration: 1 },
      { kind: "note", note: "A4", duration: 0.5 },
      { kind: "note", note: "B4", duration: 0.5 },
      { kind: "note", note: "C5", duration: 1.5 },
      { kind: "note", note: "B4", duration: 0.5 },
      { kind: "note", note: "C5", duration: 1 },
      { kind: "note", note: "E5", duration: 1 },
      { kind: "note", note: "B4", duration: 2 },
      { kind: "rest", duration: 1 },
      { kind: "note", note: "E4", duration: 1 },
      { kind: "note", note: "A4", duration: 1.5 },
      { kind: "note", note: "G4", duration: 0.5 },
      { kind: "note", note: "A4", duration: 1 },
      { kind: "note", note: "C5", duration: 1 },
      { kind: "note", note: "G4", duration: 1.5 },
      { kind: "chord", notes: ["A4", "B4", "C5"], duration: 1 },
      { kind: "rest", duration: 1 },
    ],
    [
      { kind: "note", note: "F4", duration: 0.5 },
      { kind: "note", note: "E4", duration: 0.5 },
      { kind: "note", note: "F4", duration: 1.5 },
      { kind: "note", note: "E4", duration: 0.5 },
      { kind: "note", note: "F4", duration: 1 },
      { kind: "note", note: "C5", duration: 1 },
      { kind: "note", note: "E4", duration: 2 },
      { kind: "rest", duration: 0.5 },
      { kind: "note", note: "C5", duration: 0.5 },
      { kind: "note", note: "C5", duration: 0.5 },
      { kind: "note", note: "C5", duration: 0.5 },
      { kind: "note", note: "B4", duration: 1.5 },
      { kind: "note", note: "F#4", duration: 0.5 },
      { kind: "note", note: "F4", duration: 1 },
      { kind: "note", note: "B4", duration: 1 },
      { kind: "note", note: "B4", duration: 2 },
      { kind: "rest", duration: 1 },
    ],
  ]
}

function parseNoote(noote: string): SheetItem {
  // if (noote == "|") return { kind: "barline" };
  // if (noote == "0") return { kind: "rest" };

  // TODO: parse note and chord

  throw new NooteSyntaxError(`syntax error with this noote: ${noote}`);
}

export default parse;
