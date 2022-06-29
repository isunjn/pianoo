import { useState, useEffect } from "react";
import * as Tone from "tone";
import PlayerControl from "~/components/PlayerControl";
import Keyboard from "~/components/Keyboard";
import standardKeymap from "~/config/keymap/standard";
import PIANO_ACOUSTIC from "~/assets/sample/piano-acoustic";

function Player() {
  const [ready, setReady] = useState(false);
  const [sampler, setSampler] = useState<Tone.Sampler>();
  const [keymap, setKeymap] = useState<Map<string, string>>(standardKeymap);

  // start Tone/AudioContext
  useEffect(() => {
    async function startAudio() {
      document.removeEventListener("keydown", startAudio);
      await Tone.start();
      setReady(true);
    }
    document.addEventListener("keydown", startAudio);
  }, []);

  // initialize sampler
  useEffect(() => {
    if (!ready) return;
    const sampler = new Tone.Sampler({
      urls: PIANO_ACOUSTIC,
      onload: () => setSampler(sampler),
    }).toDestination();
  }, [ready]);

  // add/remove keydown handler, sync with sampler and keymap
  useEffect(() => {
    if (!sampler) return;
    const keydownHandler = buildKeydownHandler(sampler, keymap);
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [sampler, keymap]);

  if (!ready) {
    return <div>Press any key to start...</div>;
  }

  if (!sampler) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      main player section todo!
      <PlayerControl />
      <Keyboard />
    </div>
  );
}

function buildKeydownHandler(sampler: Tone.Sampler, keymap: Map<string, string>) {
  return (event: KeyboardEvent) => {
    const note = keymap.get(event.key);
    if (note) {
      sampler.triggerAttackRelease(note, "4n");
    }
  }
}

export default Player;
