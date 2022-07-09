import { useState, useEffect, useContext, useRef } from "react";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerScoreMeta from "~/components/PlayerScoreMeta";
import PlayerHint from "~/components/PlayerHint";
import InstrumentContext from "~/contexts/instrument";
import KeymapContext from "~/contexts/keymap";
import parse from "~/core/parser";
import type { MusicScore, SheetItems, SheetItem, ExpectedKey } from "~/core/types";
import type { SheetImperativeHandleAPI } from "~/components/Sheet";

export type PlayerState = 
  | "idle"
  | "ready"
  | "playing"
  | "paused"
  | "done"
  | "autoplaying"
  | "practicing";

function Player() {
  const instrument = useContext(InstrumentContext);
  const keymap = useContext(KeymapContext);

  const [state, setState] = useState<PlayerState>("idle");
  const [score, setScore] = useState<MusicScore | null>(null);
  const [sheetItems, setSheetItems] = useState<SheetItems>([]);

  const sheet = useRef<SheetImperativeHandleAPI>(null);
  const expected = useRef<ExpectedKey | null>(null);
  const pressing = useRef<Record<string, boolean>>({});

  // load music score & get ready when instrument and score are all loaded
  useEffect(() => {
    if (state != "idle") return;
    if (!score) {
      // TODO: load the last song user played, should load from backend api
      import("~/examples").then(mod => {
        const exampleScore = mod.example003 as MusicScore;
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

    // play music note & update sheet
    function keydownHandler(event: KeyboardEvent) {
      if (event.repeat) return;
      const note = keymap.getNote(event.key);
      if (!note) return;
      instrument!.triggerAttack(note);
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

  // practice mode, just play music note, do not move sheet
  useEffect(() => {
    if (state != "practicing") return;
    function keydownHandler(event: KeyboardEvent) {
      if (event.repeat) return;
      const note = keymap.getNote(event.key);
      if (note) instrument!.triggerAttack(note);
    }
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [state, instrument, keymap]);

  // clear sheet when restarted
  useEffect(() => {
    if (state != "ready") return;
    sheet.current!.reset();
    expected.current = null;
    pressing.current = {};
  }, [state]);

  // auto play, didn't use tone.js's time keeper because we also need to update sheet UI
  useEffect(() => {
    if (state != "autoplaying") return;
    sheet.current!.start();
    const msPerQuarter = 60 * 1000 / score!.tempo;
    const seq = sheetItems.flat(); // sequence of sheet items, including rest symbols
    let idx = 0; // the active item index
    let timeoutId = (function play(item: SheetItem, after: number) { // play item after a delay
      return setTimeout(() => {
        const toplay = item.kind == "note" ? item.note : item.kind == "chord" ? item.notes : undefined;
        if (toplay) {
          instrument!.triggerAttack(toplay);
          sheet.current!.move(true);
        }
        if (++idx == seq.length) { // done
          setState("ready");
        } else {
          timeoutId = play(seq[idx], item.quarter * msPerQuarter);
        }
      }, after);
    })(seq[0], 0); // initial delay is 0
    return () => clearTimeout(timeoutId);
  }, [state, instrument, sheetItems, score]);

  // FIXME: scrollIntoView() doesn't work on keyboard event 🥲, uncomment this when manual scroll function is written
  // // if play is done, user can press space to restart
  // useEffect(() => {
  //   if (state != "done") return;
  //   function keydownHandler(event: KeyboardEvent) {
  //     if (event.key != " ") return;
  //     setState("ready");
  //     document.removeEventListener("keydown", keydownHandler);
  //   }
  //   document.addEventListener("keydown", keydownHandler);
  //   return () => document.removeEventListener("keydown", keydownHandler);
  // }, [state]);

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
      {/* <PlayerHint state={state} /> */}
      <PlayerScoreMeta score={score!} />
    </div>
  );
}

export default Player;
