import React, { createContext, useContext, useReducer } from "react";
import type { SheetItems } from "~/core/pianoo";
import type { TonalityKind } from "~/core/tonality";
import type { ParsedMusicScore } from "~/core/parser";
import type { InstrumentKind } from "~/config/instrument";
import type { KeymapKind } from "~/config/keymap";
import { K_INSTRUMENT, K_KEYMAP, K_VOLUME } from "~/constants/storage-keys";

const PlayerContext = createContext<PlayerState | null>(null);
const PlayerDispatchContext = createContext<React.Dispatch<PlayerAction> | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(stateReducer, getInitialState());

  return (
    <PlayerDispatchContext.Provider value={dispatch}>
      <PlayerContext.Provider value={state}>
        {children}
      </PlayerContext.Provider>
    </PlayerDispatchContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext)!;
}

export function usePlayerDispatch() {
  return useContext(PlayerDispatchContext)!;
}

//-----------------------------------------------------------------------------

type PlayerStatus =
  | "idle"
  | "ready"
  | "playing"
  | "paused"
  | "done"
  | "autoplaying"
  | "practicing";

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
}

type PlayerAction =
  | { type: "unmount" }
  | { type: "play" }
  | { type: "pause" }
  | { type: "done" }
  | { type: "reset" }
  | { type: "auto_play" }
  | { type: "practice" }
  | { type: "open_chooser" }
  | { type: "open_adjustments" }
  | { type: "open_recorder" }
  | { type: "open_settings" }
  | { type: "close_popup" }
  | { type: "set_instrument", instrument: InstrumentKind }
  | { type: "set_keymap", keymap: KeymapKind, sheetItems: SheetItems }
  | { type: "set_volume", volume: number }
  | { type: "set_tempo", tempo: number }
  | { type: "set_tonality", tonality: TonalityKind, sheetItems: SheetItems }
  | { type: "set_score", score: ParsedMusicScore, sheetItems: SheetItems };

function stateReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "unmount":
      return { ...state, status: state.status == "idle" ? "idle" : "ready" }
    case "play":
      return { ...state, status: "playing" };
    case "pause":
      return { ...state, status: "paused" };
    case "done":
      return { ...state, status: "done" };
    case "reset":
      return { ...state, status: "ready" };
    case "auto_play":
      return { ...state, status: "autoplaying" };
    case "practice":
      return { ...state, status: "practicing" };
    case "open_chooser":
      return { ...state, popuping: "chooser" };
    case "open_adjustments":
      return { ...state, popuping: "adjustments" };
    case "open_recorder":
      return { ...state, popuping: "recorder" };
    case "open_settings":
      return { ...state, popuping: "settings" };
    case "close_popup":
      return { ...state, popuping: "none" };
    case "set_instrument":
      return {
        ...state,
        status: "ready",
        instrument: action.instrument,
      };
    case "set_keymap": 
      return {
        ...state,
        status: "ready",
        keymap: action.keymap,
        sheetItems: action.sheetItems,
      };
    case "set_volume":
      return { ...state, volume: action.volume };
    case "set_tempo":
      return { ...state, tempo: action.tempo };
    case "set_tonality":
      return {
        ...state,
        status: "ready",
        popuping: "none",
        tonality: action.tonality,
        sheetItems: action.sheetItems,
      };
    case "set_score":
      return {
        ...state,
        status: "ready",
        popuping: "none",
        score: action.score,
        sheetItems: action.sheetItems,
        tempo: action.score.tempo,
        tonality: action.score.tonality,
      };
    default:
      return state;
  }
}

//-----------------------------------------------------------------------------

function getInitialState() {
  const keymap = localStorage.getItem(K_KEYMAP) as KeymapKind | null ?? "standard";
  const instrument = 
    localStorage.getItem(K_INSTRUMENT) as InstrumentKind | null ?? "piano-acoustic";
  const volume = 
    localStorage.getItem(K_VOLUME) ? parseInt(localStorage.getItem(K_VOLUME)!) : 50;

  const initialState: PlayerState = {
    status: "idle",
    popuping: "none",
    instrument,
    keymap,
    volume,
    tonality: "1 = C",
    tempo: 100,
    score: null,
    sheetItems: [],
  }

  return initialState;
}
