import { useState, useEffect } from "react";
import * as Tone from "tone";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerVisual from "~/components/PlayerVisual";
import standardKeymap from "~/config/keymap/standard";
import PIANO_ACOUSTIC from "~/assets/sample/piano-acoustic";

export type PlayerState = "idle" | "playing" | "paused" | "autoplaying";

function Player() {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<PlayerState>("idle");
  const [instrument, setInstrument] = useState<Tone.Sampler | null>(null);
  const [keymap, setKeymap] = useState<Map<string, string>>(standardKeymap);

  // initialize instrument
  useEffect(() => {
    const instrument = new Tone.Sampler({
      urls: PIANO_ACOUSTIC,
      onload: () => setInstrument(instrument),
    }).toDestination();
  }, []);
  
  // start Tone/AudioContext on click or press
  useEffect(() => {
    async function startAudio() {
      document.removeEventListener("click", startAudio);
      document.removeEventListener("keydown", startAudio);
      Tone.start()
        .then(() => setReady(true))
        .catch(() => {
          // TODO: notification
          alert("Failed to start audio context, try refresh the page.");
        });
    }
    document.addEventListener("keydown", startAudio);
    document.addEventListener("click", startAudio);
    return () => {
      document.removeEventListener("click", startAudio);
      document.removeEventListener("keydown", startAudio);
    };
  }, []);

  // add/remove keydown handler, sync with instrument and keymap
  useEffect(() => {
    if (!ready || !instrument) return;
    const keydownHandler = buildKeydownHandler(instrument, keymap);
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [ready, instrument, keymap]);

  function handleStateChange(newState: PlayerState) {
    if (newState == state) return;
    setState(newState);
  }

  if (!instrument) {
    return <div className="w-fit mx-auto">Loading...</div>;
  }

  return (
    <div className="mx-auto w-3/4 select-none">
      <PlayerControl state={state} changeState={handleStateChange} />
      <PlayerSheet state={state} />
      <PlayerVisual />
    </div>
  );
}

function buildKeydownHandler(instrument: Tone.Sampler, keymap: Map<string, string>) {
  return (event: KeyboardEvent) => {
    if (event.repeat) return;
    const note = keymap.get(event.key);
    if (note) {
      instrument.triggerAttack(note);
    }
  };
}

export default Player;
