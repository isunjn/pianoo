import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerVisual from "~/components/PlayerVisual";
import KEYMAP_STANDARD from "~/config/keymap/standard";
import INSTRUMENT_PIANO_ACOUSTIC from "~/config/instrument/piano-acoustic";

export type PlayerState = "idle" | "ready" | "playing" | "paused" | "autoplaying";

function Player() {
  const [state, setState] = useState<PlayerState>("idle");
  const [instrument, setInstrument] = useState<Tone.Sampler | null>(null);
  const [keymap, setKeymap] = useState<Map<string, string>>(KEYMAP_STANDARD);
  const visualRef = useRef<{playNote: (note: string) => void}>(null);

  // initialize instrument
  useEffect(() => {
    const instrument = new Tone.Sampler({
      urls: INSTRUMENT_PIANO_ACOUSTIC,
      onload: () => {
        setInstrument(instrument);
        setState("ready");
      }
    }).toDestination();
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
    return <div className="w-fit mx-auto">Loading...</div>;
  }

  return (
    <div className="mx-auto w-3/4 select-none">
      <PlayerControl state={state} changeState={handleStateChange} />
      <PlayerSheet state={state} changeState={handleStateChange} />
      <PlayerVisual ref={visualRef} />
    </div>
  );
}

export default Player;
