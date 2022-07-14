import type { TonalityKind } from "~/core/tonality";
import panic from "~/utils/panic";

export interface UnparsedMusicScore {
  id: number;
  name: string;
  tonality: TonalityKind; // such as "1 = C" => Natural C Major
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

export interface MusicScore extends UnparsedMusicScore {
  parsed: ParsedItems;
}

type ParsedItems = ParsedItem[][];

type ParsedItem = ParsedNote | ParsedChord | ParsedRest;

export interface ParsedNote {
  kind: "note";
  solfaNum: SolfaNum;
  octave: Octave;
  accidental: Accidental;
  quarter: number;
}

interface ParsedChord {
  kind: "chord";
  notes: Pick<ParsedNote, "solfaNum" | "octave" | "accidental">[];
  quarter: number;
}

interface ParsedRest {
  kind: "rest";
  quarter: number;
}

export type SolfaNum = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Octave = 2 | 3 | 4 | 5 | 6;

export type Accidental = "#" | "b" | undefined;

//-----------------------------------------------------------------------------

class NooteSyntaxError extends SyntaxError {
  constructor(message: string) {
    super(message);
  }
}

const REGEXP_REST = /^0(_{0,2})$/;
const REGEXP_NOTE = /^(#|b)?(\+\+|\+|--|-)?([1-7])([-_.]*)$/;
const REGEXP_CHORD = /^\[([#b+-1234567&]+)\]([-_.]*)$/;

function parse(score: UnparsedMusicScore): MusicScore {
  const items: ParsedItems = [];
  try {
    score.content.split("@@@").forEach(row => {
      items.push(
        row.match(/\S+/g)?.filter(str => str != "|").map(noote => parseNoote(noote)) ?? []
      );
    });
  } catch (err) {
    if (err instanceof NooteSyntaxError) {
      throw panic("syntax error with this score: " + err.message);
    }
  }
  return { ...score, parsed: items };
}

function parseNoote(noote: string): ParsedItem {
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
    const [solfaNum, octave, accidental] = getNote(match);
    const quarter = getQuarter(match[4], noote);
    return { kind: "note", solfaNum, octave, accidental, quarter };
  }
  // chord
  match = noote.match(REGEXP_CHORD);
  if (match) {
    const notes: Omit<ParsedNote, "quarter" | "kind">[] = [];
    match[1].split("&").forEach(nooteInChord => {
      const noteMatch = nooteInChord.match(REGEXP_NOTE);
      if (noteMatch) {
        const [solfaNum, octave, accidental] = getNote(noteMatch);
        notes.push({ solfaNum, octave, accidental });
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

function getNote(noteMatch: RegExpMatchArray): [SolfaNum, Octave, Accidental] {
  const accidental = noteMatch[1] as Accidental;
  const octave =
    noteMatch[2] == "++" ? 6 :
      noteMatch[2] == "+" ? 5 :
        noteMatch[2] == "--" ? 2 :
          noteMatch[2] == "-" ? 3 :
            4;
  const solfaNum = parseInt(noteMatch[3]) as SolfaNum;
  return [solfaNum, octave, accidental];
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
