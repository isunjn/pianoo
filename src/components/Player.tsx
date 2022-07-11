import { useState, useEffect, useContext, useRef } from "react";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerScoreMeta from "~/components/PlayerScoreMeta";
import PlayerHint from "~/components/PlayerHint";
import PopupChooser from "~/components/PopupChooser";
import PopupAdjustments from "~/components/PopupAdjustments";
import PopupRecoder from "~/components/PopupRecorder";
import PopupSettings from "~/components/PopupSettings";
import InstrumentContext from "~/contexts/instrument";
import KeymapContext from "~/contexts/keymap";
import parse from "~/core/parser";
import { score001 } from "~/examples";
import type { SheetImperativeHandleAPI } from "~/components/Sheet";
import type {
  MusicScore, 
  SheetItems, 
  SheetItem, 
  ExpectedKey, 
  TonalityKind, 
} from "~/core/types";

export type PlayerState =
  | "idle"
  | "ready"
  | "playing"
  | "paused"
  | "done"
  | "autoplaying"
  | "practicing";

export type PlayerPopuping =
  | "none"
  | "chooser"
  | "recorder"
  | "adjustments"
  | "settings";

const defaultScore = score001 as MusicScore; // type assertion

function Player() {
  const instrument = useContext(InstrumentContext);
  const keymap = useContext(KeymapContext);

  const [state, setState] = useState<PlayerState>("idle");
  const [popuping, setPopuping] = useState<PlayerPopuping>("none");
  const [score, setScore] = useState<MusicScore>(defaultScore);
  const [sheetItems, setSheetItems] = useState<SheetItems>(parse(defaultScore));
  const [volume, setVolume] = useState<number>(50); // 0 ~ 100
  const [tempo, setTempo] = useState<number>(defaultScore.tempo);
  const [tonality, setTonality] = useState<TonalityKind>(defaultScore.tonality);

  const sheet = useRef<SheetImperativeHandleAPI>(null);
  const expected = useRef<ExpectedKey | null>(null);
  const pressing = useRef<Record<string, boolean>>({});

  // load music score & get ready when instrument and score are all loaded
  useEffect(() => {
    if (state != "idle") return;
    // TODO: load music score of last play
    if (instrument /* && score */) setState("ready");
  }, [state, instrument]);

  // set volume, unit is dB
  useEffect(() => {
    if (instrument) instrument.volume.value = 20 * Math.log10(volume / 100);
  }, [instrument, volume]);

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

  // auto play mode
  useEffect(() => {
    if (state != "autoplaying") return;
    // TODO: resume from last position, such as when tempo changed
    sheet.current!.start();
    const msPerQuarter = 60 * 1000 / tempo;
    const seq = sheetItems.flat(); // sequence of sheet items
    let idx = 0; // the active item index
    // play each item after a delay
    let timeoutId = (function play(item: SheetItem, after: number) {
      return setTimeout(() => {
        const toplay = item.kind == "note" ? item.note :
          item.kind == "chord" ? item.notes : undefined;
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
  }, [state, instrument, sheetItems, score, tempo]);

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

  function handlePopupToggle(newPopuping: PlayerPopuping) {
    if (newPopuping != popuping) setPopuping(newPopuping);
  }

  function handleScoreChange(newScore: MusicScore) {
    if (newScore != score) {
      setScore(newScore);
      setSheetItems(parse(newScore));
      setTempo(newScore.tempo);
      setTonality(newScore.tonality);
      setState("ready");
      setPopuping("none");
    }
  }

  function handleVolumeChange(newVolume: number) {
    if (newVolume != volume) setVolume(newVolume);
  }

  function handleTempoChange(newTempo: number) {
    if (newTempo != tempo) {
      setTempo(newTempo);
      setState("ready");
    }
  }

  function handleTonalityChange(newTonalityKind: TonalityKind) {
    if (newTonalityKind != tonality) {
      setTonality(newTonalityKind);
      setSheetItems(parse(score!, newTonalityKind));
      setState("ready");
    }
  }

  if (state == "idle") {
    return <div className="w-fit mx-auto">loading...</div>;
  }

  return (
    <div className="relative mx-auto w-3/4 select-none">
      <PlayerControl
        state={state}
        score={score}
        changeState={handleStateChange}
        togglePopuping={handlePopupToggle}
      />
      <PlayerSheet
        state={state}
        changeState={handleStateChange}
        sheetItems={sheetItems}
        ref={sheet}
      />
      {/* <PlayerHint state={state} /> */}
      <PlayerScoreMeta
        score={score}
        tempo={tempo}
        tonality={tonality}
      />
      {
        popuping == "chooser" ?
          <PopupChooser changeScore={handleScoreChange} /> :
          popuping == "adjustments" ?
            <PopupAdjustments
              volume={volume}
              tempo={tempo}
              tonality={tonality}
              changeVolume={handleVolumeChange}
              changeTempo={handleTempoChange}
              changeTonality={handleTonalityChange}
            /> :
            popuping == "recorder" ? <PopupRecoder /> :
              popuping == "settings" ? <PopupSettings /> :
                null
      }
      {/* a click outside of the popup will close it */}
      {
        popuping != "none" && <div onClick={() => setPopuping("none")}
          className="fixed top-0 left-0 w-screen h-screen z-10"></div>
      }
    </div>
  );
}

export default Player;
