import { useState, useEffect, useContext, useRef } from "react";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerVisual from "~/components/PlayerVisual";
import InstrumentContext from "~/contexts/instrument";
import KeymapContext from "~/contexts/keymap";
import parse from "~/core/parser";
import type { MusicScore, SheetItems, ExpectedKey } from "~/core/types";
import type { SheetImperativeHandleAPI } from "~/components/Sheet";

export type PlayerState = 
  | "idle"
  | "ready"
  | "playing"
  | "paused"
  | "done"
  | "autoplaying" // TODO: implement
  | "practicing"; // TODO: implement

function Player() {
  const instrument = useContext(InstrumentContext);
  const keymap = useContext(KeymapContext);

  const [state, setState] = useState<PlayerState>("idle");
  const [score, setScore] = useState<MusicScore | null>(null);
  const [sheetItems, setSheetItems] = useState<SheetItems>([]);

  const sheet = useRef<SheetImperativeHandleAPI>(null);
  const visualizer = useRef<{ playNote: (note: string) => void }>(null);
  const expected = useRef<ExpectedKey | null>(null);
  const pressing = useRef<Record<string, boolean>>({});

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

  // side effects to take when start/resume playing
  useEffect(() => {
    if (state != "playing") return;

    // prepare for playing first note/chord
    if (expected.current == null) {
      const firstExpectedKey = sheet.current!.start();
      expected.current = firstExpectedKey;
    }

    function trackPressingDown(event: KeyboardEvent) {
      pressing.current[event.key] = true;
    }

    function trackPressingUp(event: KeyboardEvent) {
      pressing.current[event.key] = false;
    }

    // play music note & update sheet & update visualizer
    function keydownHandler(event: KeyboardEvent) {
      if (event.repeat) return;
      const note = keymap.getNote(event.key);
      if (!note) return;
      instrument!.triggerAttack(note);
      visualizer.current!.playNote(note);
      const _expected = expected.current!;
      const _pressing = pressing.current;
      if (Array.isArray(_expected)) { // expect a chord
        if (_expected.every(k => _pressing[k]))
          goNext(true);
        else if (!_expected.find(k => k == event.key)) // a wrong note
          goNext(false);
      } else { // expect a note
        goNext(_pressing[_expected]);
      }
    }

    function goNext(correct: boolean) {
      const { done, next } = sheet.current!.move(correct);
      if (done) {
        setState("done");
      } else {
        expected.current = next;
        pressing.current = {};
      }
    }

    document.addEventListener("keydown", trackPressingDown, { capture: true });
    document.addEventListener("keyup", trackPressingUp, { capture: true });
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", trackPressingDown, { capture: true });
      document.removeEventListener("keyup", trackPressingUp, { capture: true });
      document.removeEventListener("keydown", keydownHandler);
    }
  }, [state, instrument, keymap]);

  // clear sheet when restarted
  useEffect(() => {
    if (state == "ready" && expected.current != null) {
      expected.current = null;
      sheet.current!.reset();
    }
  }, [state]);

  function handleStateChange(newState: PlayerState) {
    if (newState != state) setState(newState);
  }

  if (state == "idle") {
    return <div className="w-fit mx-auto">loading...</div>;
  }

  return (
    <div className="mx-auto w-3/4 select-none relative">
      <PlayerControl state={state} changeState={handleStateChange} score={score!} />
      <PlayerSheet state={state} changeState={handleStateChange} sheetItems={sheetItems} ref={sheet} />
      <PlayerVisual ref={visualizer} />
    </div>
  );
}

export default Player;
