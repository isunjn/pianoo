import { Sampler } from "tone";
import {
  KEYMAP_STANDARD,
  KEYMAP_VIRTUALPIANO,
  type KeymapKind,
} from "~/config/keymap";
import {
  INSTRUMENT_PIANO_ACOUSTIC,
  type InstrumentKind,
} from "~/config/instrument";
import Keymap from "~/core/keymap";
import panic from "~/utils/panic";
import type { TonalityKind } from "~/core/tonality";
import type { ParsedMusicScore } from "~/core/parser";

export type SheetItems = SheetItem[][]; // rows -> row -> item
export type SheetItem = SheetItemNote | SheetItemChord | SheetItemRest;
export type NoteOrChord = SheetItemNote | SheetItemChord;

interface SheetItemNote {
  kind: "note";
  key: string;
  quarter: number;
}

interface SheetItemChord {
  kind: "chord";
  keys: string[];
  quarter: number;
}

interface SheetItemRest {
  kind: "rest";
  quarter: number;
}

class Player {
  private loaded: Promise<void> | null;
  private instrument: Sampler | null;
  private keymap: Keymap;
  private score: ParsedMusicScore | null;
  private tempo: number;
  private sheetItems: SheetItems;
  private sequence: SheetItem[];

  constructor() {
    this.loaded = null;
    this.instrument = null;
    this.keymap = new Keymap(KEYMAP_STANDARD)
    this.score = null;
    this.tempo = 100;
    this.sheetItems = [];
    this.sequence = [];
  }

  public load() {
    if (this.loaded != null) return this.loaded;
    this.loaded = new Promise<void>((resolve) => {
      const instrument = new Sampler({
        urls: INSTRUMENT_PIANO_ACOUSTIC,
        onload: () => {
          this.instrument = instrument;
          resolve();
        },
      }).toDestination();
    });
    return this.loaded;
  }

  public prepare(score: ParsedMusicScore) {
    this.score = score;
    this.keymap.transpose(score.tonality);
    this.tempo = score.tempo;
    this.maintain();
    return this.sheetItems;
  }

  public getNote(key: string) {
    return this.keymap.getNote(key);
  }

  public playNote(note: string | string[]) {
    this.instrument!.triggerAttack(note);
  }

  public getSequence() {
    return this.sequence;
  }

  public getTempo() {
    return this.tempo;
  }

  public setInstrument(instrumentKind: InstrumentKind) {
    // TODO
  }

  public setKeymap(keymapKind: KeymapKind): SheetItems {
    this.keymap = new Keymap(
      keymapKind == "standard" ? KEYMAP_STANDARD : KEYMAP_VIRTUALPIANO
    );
    this.keymap.transpose(this.score!.tonality);
    this.maintain();
    return this.sheetItems;
  }

  public transpose(tonality: TonalityKind): SheetItems {
    this.keymap.transpose(tonality);
    this.maintain();
    return this.sheetItems;
  }

  public setTempo(tempo: number) {
    this.tempo = tempo;
  }

  public setVolume(volume: number) {
    // percentage to decibel
    this.instrument!.volume.value = 2 * 10 * Math.log10(volume / 100); 
  }

  // set/update sheetItems and sequence
  private maintain() {
    this.sheetItems = this.score!.parsed.map(row => row.map(item => {
      switch (item.kind) {
        case "note": {
          const key = this.keymap.getKey(item);
          return { kind: "note", key, quarter: item.quarter };        
        }
        case "chord": {
          const keys = item.notes.map(note => this.keymap.getKey(note));
          return { kind: "chord", keys, quarter: item.quarter };
        }
        case "rest": {
          return { kind: "rest", quarter: item.quarter };
        }
        default: throw panic("unreachable");
      }
    }));
    this.sequence = this.sheetItems.flat();
  }
}

const player = new Player(); // singleton

export default player;
