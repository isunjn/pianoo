import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerVisual from "~/components/PlayerVisual";
import KEYMAP_STANDARD from "~/config/keymap/standard";
import INSTRUMENT_PIANO_ACOUSTIC from "~/config/instrument/piano-acoustic";
import parse from "~/core/parser";
import type { MusicScore, SheetItem } from "~/core/type";

export type PlayerState = "idle" | "ready" | "playing" | "paused" | "autoplaying";

function Player() {
  const [state, setState] = useState<PlayerState>("idle");
  const [instrument, setInstrument] = useState<Tone.Sampler | null>(null);
  const [keymap, setKeymap] = useState<Map<string, string>>(KEYMAP_STANDARD);
  const [score, setScore] = useState<MusicScore | null>(null);
  const [sheetItems, setSheetItems] = useState<SheetItem[][]>([]);
  const visualRef = useRef<{playNote: (note: string) => void}>(null);

  // initialize instrument & load music score
  useEffect(() => {
    const loadInstrument: Promise<Tone.Sampler> = new Promise(resolve => {
      const instrument = new Tone.Sampler({
        urls: INSTRUMENT_PIANO_ACOUSTIC,
        onload: () => resolve(instrument),
      }).toDestination();
    });

    // TODO: load from backend api
    const loadScore: Promise<[MusicScore, SheetItem[][]]> = import("~/examples/castle-in-the-sky")
      .then(mod => [mod.default, parse(mod.default)]);

    Promise.all([loadInstrument, loadScore])
      .then(([instrument, [score, sheetItems]]) => {
        setInstrument(instrument);
        setScore(score);
        setSheetItems(sheetItems);
        setState("ready");
      });// TODO: error handling
  }, []);
  
  // add/remove keydown handler, sync with instrument and keymap
  useEffect(() => {
    if (state != "playing" || !instrument) return;
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const note = keymap.get(event.key);
      if (note) {
        instrument.triggerAttack(note);
        visualRef.current?.playNote(note);
      }
    }
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [state, instrument, keymap]);

  function handleStateChange(newState: PlayerState) {
    if (newState != state) setState(newState);
  }

  if (state == "idle") {
    return <div className="w-fit mx-auto">loading...</div>;
  }

  return (
    <div className="mx-auto w-3/4 select-none">
      <PlayerControl state={state} changeState={handleStateChange} score={score!} />
      <PlayerSheet state={state} changeState={handleStateChange} sheetItems={sheetItems} />
      <PlayerVisual ref={visualRef} />
    </div>
  );
}

export default Player;
