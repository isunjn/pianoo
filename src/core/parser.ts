import type { MusicScore, SheetItems, SheetItem } from "~/core/types";
import { modes, type Mode } from "~/core/mode";
import panic from "~/utils/panic";

class NooteSyntaxError extends SyntaxError {
  constructor(message: string) {
    super(message);
  }
}

const REGEXP_REST = /^0(_{0,2})$/;
const REGEXP_NOTE = /^(#|b)?(\+\+|\+|--|-)?([1-7])([-_.]*)$/;
const REGEXP_CHORD = /^\[([#b+-1234567&]+)\]([-_.]*)$/;

function parse(score: MusicScore, keysign?: string): SheetItems {
  const items: SheetItems = [];
  const mode = modes.get(keysign ?? score.keysign);
  try {
    score.content.split("@@@").forEach(row => {
      items.push(
        row.match(/\S+/g)?.filter(str => str != "|").map(noote => parseNoote(noote, mode)) ?? []
      );
    });
  } catch (err) {
    if (err instanceof NooteSyntaxError) {
      throw panic("syntax error with this score: " + err.message);
    }
  }

  console.log(items);
  
  return items;
}

function parseNoote(noote: string, mode: Mode): SheetItem {
  let match;
  // rest
  match = noote.match(REGEXP_REST);
  if (match) {
    const quarter = 
      match[1].length == 2 ? 0.25 :
      match[1].length == 1 ? 0.5 :
      1;
    return { kind: "rest", quarter };
  }
  // note
  match = noote.match(REGEXP_NOTE);
  if (match) {
    const note = getNote(match, mode);
    const quarter = getQuarter(match[4], noote);
    return { kind: "note", note, quarter };
  }
  // chord
  match = noote.match(REGEXP_CHORD);
  if (match) {
    const notes: string[] = [];
    match[1].split("&").forEach(nooteInChord => {
      const noteMatch = nooteInChord.match(REGEXP_NOTE);
      if (noteMatch) {
        notes.push(getNote(noteMatch, mode));
      } else {
        throw new NooteSyntaxError("invalid note in chord: " + noote);
      }
    });
    const quarter = getQuarter(match[2], noote);
    return { kind: "chord", notes, quarter };
  }
  // unmatched
  throw new NooteSyntaxError("invalid note: " + noote);
}

function getNote(noteMatch: RegExpMatchArray, mode: Mode): string {
  // acci => accidental index
  const acci = 
    noteMatch[1] == "b" ? 2 :
    noteMatch[1] == "#" ? 1 :
    0;
  const octave = 
    noteMatch[2] == "++" ? 6 :
    noteMatch[2] == "+" ? 5 :
    noteMatch[2] == "--" ? 3 :
    noteMatch[2] == "-" ? 2 :
    4;
  const num = parseInt(noteMatch[3]); // 1 2 3 4 5 6 7
  const pitch = mode.pitch[num][acci];
  return `${pitch}${octave}`;
}

function getQuarter(quarterLengthStr: string, noote: string): number {
  switch (quarterLengthStr) {
    case "": return 1;
    case "_": return 0.5;
    case "-": return 2;
    case "--": return 3;
    case "---": return 4;
    case "__": return 0.25;
    case "_.": return 0.75;
    case "_..": return 0.875;
    case ".": return 1.5;
    case "..": return 1.75;
    case "--_": return 3.5;
    case "-----": return 6;
    case "------": return 7;
    default: throw new NooteSyntaxError("invalid quarter syntax: " + noote);
  }
}

export default parse;
