type Tone = typeof import("tone");
type Sampler = import("tone").Sampler;
import { type KeymapKind } from "~/config/keymap";
import { getInstrumentUrls, type InstrumentKind } from "~/config/instrument";
import Keymap from "~/core/keymap";
import panic from "~/utils/panic";
import { type TonalityKind } from "~/core/tonality";
import { type ParsedMusicScore } from "~/core/parser";
import {
  K_SCORE_ID,
  K_INSTRUMENT,
  K_KEYMAP,
  K_VOLUME,
} from "~/constants/storage-keys";

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

let Tone: Tone | null = null; // the Tone.js module instance, dynamically imported

class Pianoo {
  private score: ParsedMusicScore | null;
  private instrument: Sampler | null;
  private keymap: Keymap;
  private tempo: number;
  private sheetItems: SheetItems;
  private sequence: SheetItem[];

  constructor() {
    this.score = null;
    this.instrument = null;
    this.keymap = Keymap.getInstance();
    this.tempo = 100;
    this.sheetItems = [];
    this.sequence = [];
  }

  public async init() {
    Tone = await import("tone");
    this.setInstrument(
      (localStorage.getItem(K_INSTRUMENT) ?? "piano-acoustic") as InstrumentKind
    );
  }

  public async start() {
    await Tone!.start();
    await Tone!.loaded();
  }

  public prepare(score: ParsedMusicScore): SheetItems {
    if (score.id != 0) {
      localStorage.setItem(K_SCORE_ID, score.id.toString());
    }
    this.score = score;
    this.tempo = score.tempo;
    this.keymap.transpose(score.tonality);
    this.maintain();
    return this.sheetItems;
  }

  public getNote(key: string): string | undefined {
    return this.keymap.getNote(key);
  }

  public playNote(note: string | string[]) {
    this.instrument!.triggerAttackRelease(note, 0.75);
  }

  public getSequence(): SheetItem[] {
    return this.sequence;
  }

  public getTempo(): number {
    return this.tempo;
  }

  public async setInstrument(instrumentKind: InstrumentKind) {
    return new Promise<void>(resolve => {
      const instrument = new Tone!.Sampler({
        urls: getInstrumentUrls(instrumentKind),
        baseUrl: "samples/",
        onload: () => {
          this.instrument = instrument;
          localStorage.setItem(K_INSTRUMENT, instrumentKind);
          this.setVolume(parseInt(localStorage.getItem(K_VOLUME) ?? "50"));
          resolve();
        },
      }).toDestination();
    });
  }

  public setKeymap(keymapKind: KeymapKind): SheetItems {
    localStorage.setItem(K_KEYMAP, keymapKind);
    this.keymap = Keymap.getInstance(keymapKind);
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
    localStorage.setItem(K_VOLUME, volume.toString());
    // percentage to decibel
    this.instrument!.volume.value = 2 * 10 * Math.log10(volume / 100);
  }

  // set/update sheetItems and sequence
  private maintain() {
    this.sheetItems = this.score!.parsed.map(row =>
      row.map(item => {
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
          default:
            throw panic("unreachable");
        }
      })
    );
    this.sequence = this.sheetItems.flat();
  }
}

const pianoo = new Pianoo(); // singleton

export default pianoo;
