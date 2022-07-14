import type { TonalityKind } from "~/core/tonality";
import panic from "~/utils/panic";

export interface MusicScore {
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

export interface ParsedMusicScore extends MusicScore {
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
  notes: Omit<ParsedNote, "kind" | "quarter">[];
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

const REGEXP_NOTE = /^(#|b)?(\+\+|\+|--|-)?([1-7])$/;
const REGEXP_QUARTER = /^(-{1,7}|_|__)?(.|..)?$/;

function parse(score: MusicScore): ParsedMusicScore {
  try {
    const parsedItems = score.content.split("@@@").map(row => 
      row.match(/\S+/g)?.filter(s => s != "|").map(s => parseItem(s)) ?? []
    );
    return { ...score, parsed: parsedItems };
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw panic("Syntax error: " + err.message);
    } else {
      throw err;
    }
  }
}

function parseItem(str: string): ParsedItem {
  // rest
  if (str.startsWith("0")) {
    const quarter = parseQuarter(str.slice(1));
    return { kind: "rest", quarter };
  }

  // chord
  if (str.startsWith("[")) {
    const rightSquareIdx = str.indexOf("]");
    if (rightSquareIdx == -1) {
      throw new SyntaxError(`Invalid chord: \`${str}\`, missing \`]\``);
    }
    const noteStrs = str.slice(1, rightSquareIdx).split("&");
    if (noteStrs.length == 1) {
      throw new SyntaxError(
        `Invalid chord: \`${str}\`, at least two notes in \`[]\``
      );
    }
    if (noteStrs.some(s => s == "")) {
      throw new SyntaxError(
        `Invalid chord: \`${str}\`, empty string around \`&\``
      );
    }
    const notes = noteStrs.map(s => parseNote(s));
    const quarter = parseQuarter(str.slice(rightSquareIdx + 1));
    return { kind: "chord", notes, quarter };
  }
  
  // note
  const solfaNumIdx = str.search(/[1-7]/);
  if (solfaNumIdx == -1) {
    throw new SyntaxError(`Invalid note: \`${str}\`, missing solfa number`);
  }
  const note = parseNote(str.slice(0, solfaNumIdx + 1));
  const quarter = parseQuarter(str.slice(solfaNumIdx + 1));
  return { kind: "note", ...note, quarter };
}

function parseNote(str: string): Omit<ParsedNote, "kind" | "quarter"> {
  const match = str.match(REGEXP_NOTE);
  if (!match) {
    throw new SyntaxError(`Invalid note: \`${str}\``);
  }
  const accidental = match[1] as Accidental;
  const octave =
    match[2] == "++" ? 6 :
      match[2] == "+" ? 5 :
        match[2] == "--" ? 2 :
          match[2] == "-" ? 3 :
            4;
  const solfaNum = parseInt(match[3]) as SolfaNum;
  return { solfaNum, octave, accidental };
}

function parseQuarter(str: string): number {
  if (str.startsWith("(") && str.endsWith(")")) {
    const quarterStrs = str.slice(1, -1).split("&");
    if (quarterStrs.length == 1) {
      throw new SyntaxError(
        `Invalid quarter: \`${str}\`, at least two quarter part in \`()\``
      );
    }
    if (quarterStrs.some(s => s == "")) {
      throw new SyntaxError(
        `Invalid quarter: \`${str}\`, empty string around \`&\``
      );
    }
    return quarterStrs.map(s => parseOneQuarter(s, true)).reduce((a, b) => a + b);
  }
  return parseOneQuarter(str, false);
}

function parseOneQuarter(str: string, inParen: boolean): number {
  if (inParen && str == "~") return 1;
  const match = str.match(REGEXP_QUARTER);
  if (!match) {
    throw new SyntaxError(`Invalid quarter: \`${str}\``);
  }
  let quarter = 
    match[1] == undefined ? 1 :
      match[1] == "_" ? 0.5 :
        match[1] == "__" ? 0.25 :
          match[1].length + 1;
  if (match[2]) {
    if (match[1] != undefined && match[1] != "_") {
      throw new SyntaxError(
        `Invalid quarter: \`${str}\`,  \`.\` can't be put after \`-\` or \`__\``
      );
    }
    const factor = match[2] == "." ? 0.5 : 0.75;
    quarter += (quarter * factor);
  }
  return quarter;
}

export default parse;
