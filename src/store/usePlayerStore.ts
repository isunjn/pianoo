import create from "zustand";
import type { SheetItems } from "~/core/pianoo";
import type { TonalityKind } from "~/core/tonality";
import type { ParsedMusicScore } from "~/core/parser";
import type { InstrumentKind } from "~/config/instrument";
import type { KeymapKind } from "~/config/keymap";
import { K_INSTRUMENT, K_KEYMAP, K_VOLUME } from "~/constants/storage-keys";

type PlayerStatus =
  | "idle"
  | "loading"
  | "ready"
  | "playing"
  | "done"
  | "autoplaying"
  | "practicing"
  | "justplaying";

type PlayerPopuping =
  | "none"
  | "chooser"
  | "adjustments"
  | "recorder"
  | "settings";

interface PlayerState {
  status: PlayerStatus;
  popuping: PlayerPopuping;
  instrument: InstrumentKind;
  keymap: KeymapKind;
  volume: number;
  tempo: number;
  tonality: TonalityKind;
  score: ParsedMusicScore | null;
  sheetItems: SheetItems;
  reset: () => void;
  setStatus: (status: PlayerStatus) => void;
  setPopuping: (popuping: PlayerPopuping) => void;
  setInstrument: (instrument: InstrumentKind) => void;
  setKeymap: (keymap: KeymapKind, sheetItems: SheetItems) => void;
  setVolume: (volume: number) => void;
  setTempo: (tempo: number) => void;
  setTonality: (tonality: TonalityKind, sheetItems: SheetItems) => void;
  setScore: (score: ParsedMusicScore, sheetItems: SheetItems) => void;
}

const keymap = localStorage.getItem(K_KEYMAP) ?? "standard";
const instrument = localStorage.getItem(K_INSTRUMENT) ?? "piano-acoustic";
const volume = localStorage.getItem(K_VOLUME) ?? "50";

const usePlayerStore = create<PlayerState>()(set => ({
  status: "idle",
  popuping: "none",
  instrument: instrument as InstrumentKind,
  keymap: keymap as KeymapKind,
  volume: parseInt(volume),
  tempo: 100,
  tonality: "1 = C",
  score: null,
  sheetItems: [],

  reset() {
    return set(state => ({
      status:
        state.status == "idle"
          ? "idle"
          : state.status == "loading"
          ? "loading"
          : "ready",
    }));
  },

  setStatus(status: PlayerStatus) {
    set({ status });
  },

  setPopuping(popuping: PlayerPopuping) {
    set({ popuping });
  },

  setInstrument(instrument: InstrumentKind) {
    set(state => ({
      status: state.status == "justplaying" ? "justplaying" : "ready",
      popuping: "none",
      instrument,
    }));
  },

  setKeymap(keymap: KeymapKind, sheetItems: SheetItems) {
    set(state => ({
      status: state.status == "justplaying" ? "justplaying" : "ready",
      keymap,
      sheetItems,
    }));
  },

  setVolume(volume: number) {
    set({ volume });
  },

  setTempo(tempo: number) {
    set({ tempo });
  },

  setTonality(tonality: TonalityKind, sheetItems: SheetItems) {
    set(state => ({
      status: state.status == "justplaying" ? "justplaying" : "ready",
      tonality,
      sheetItems,
    }));
  },

  setScore(score: ParsedMusicScore, sheetItems: SheetItems) {
    set({
      status: "ready",
      popuping: "none",
      score,
      sheetItems,
      tempo: score.tempo,
      tonality: score.tonality,
    });
  },
}));

export default usePlayerStore;
