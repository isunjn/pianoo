import { useState, useEffect, useContext, useRef } from "react";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerVisual from "~/components/PlayerVisual";
import InstrumentContext from "~/contexts/instrument";
import KeymapContext from "~/contexts/keymap";
import parse from "~/core/parser";
import type { MusicScore, SheetItems } from "~/core/types";

export type PlayerState = "idle" | "ready" | "playing" | "paused" | "autoplaying";

function Player() {
  const instrument = useContext(InstrumentContext);
  const keymap = useContext(KeymapContext);

  const [state, setState] = useState<PlayerState>("idle");
  const [score, setScore] = useState<MusicScore | null>(null);
  const [sheetItems, setSheetItems] = useState<SheetItems>([]);

  const visualRef = useRef<{playNote: (note: string) => void}>(null);

  // load music score & get ready when instrument and score are all loaded
  useEffect(() => {
    if (state != "idle") return;
    if (!score) {
      // TODO: load the last song user played, should load from backend api
      import("~/examples/castle-in-the-sky").then(({ default: exampleScore }) => {
        setScore(exampleScore);
        setSheetItems(parse(exampleScore));
      });// TODO: error handling
    }
    if (instrument && score) setState("ready");
  }, [state, instrument, score]);
  
  // add/remove keydown handler, sync with instrument and keymap
  useEffect(() => {
    if (state != "playing") return;
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const note = keymap.getNote(event.key);
      if (note) {
        instrument!.triggerAttack(note);
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
