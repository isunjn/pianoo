import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { HiCursorClick } from "react-icons/hi";
import pianoo from "~/core/pianoo";
import Sheet, { type SheetImperativeHandleAPI } from "~/components/Sheet";
import usePlayerStore from "~/store/usePlayerStore";
import type { SheetItem } from "~/core/pianoo";
import panic from "~/utils/panic";

function PlayerSheet() {
  const status = usePlayerStore(state => state.status);
  const sheetItems = usePlayerStore(state => state.sheetItems);
  const setStatus = usePlayerStore(state => state.setStatus);

  const sheetContainer = useRef<HTMLDivElement>(null);
  const sheet = useRef<SheetImperativeHandleAPI>(null);
  const pressing = useRef<Record<string, boolean>>({});
  const idx = useRef<number>(-1);

  // ready to play, chick or press space to start
  useEffect(() => {
    if (status != "ready") return;
    const _sheetContainer = sheetContainer.current!;
    async function startToPlay() {
      _sheetContainer.removeEventListener("click", startToPlay);
      document.removeEventListener("keydown", keydownHandler);
      await pianoo.start();
      setStatus("playing");
    }
    function keydownHandler(e: KeyboardEvent) {
      if (e.key == " ") {
        // space key
        e.preventDefault();
        startToPlay();
      }
    }
    _sheetContainer.addEventListener("click", startToPlay);
    document.addEventListener("keydown", keydownHandler);
    return () => {
      _sheetContainer.removeEventListener("click", startToPlay);
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [status, setStatus]);

  // if play is done, user can press space to restart
  useEffect(() => {
    if (status != "done") return;
    function keydownHandler(e: KeyboardEvent) {
      if (e.key == " ") {
        e.preventDefault();
        setStatus("ready");
        document.removeEventListener("keydown", keydownHandler);
      }
    }
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [status, setStatus]);

  // clear sheet when ready/reset/restart
  useEffect(() => {
    if (status != "ready") return;
    pressing.current = {};
    idx.current = -1;
    sheet.current!.reset();
  }, [status]);

  // start/resume playing
  useEffect(() => {
    if (status != "playing") return;
    const seq = pianoo.getSequence();
    if (idx.current == -1) {
      let firstNonRest = 0;
      while (seq[firstNonRest] && seq[firstNonRest].kind == "rest") {
        firstNonRest++;
      }
      sheet.current!.start(firstNonRest);
      idx.current = firstNonRest;
    }
    function trackKeydown(e: KeyboardEvent) {
      pressing.current[e.key] = true;
    }
    function trackKeyup(e: KeyboardEvent) {
      pressing.current[e.key] = false;
    }
    // play music note & update sheet
    function keydownHandler(e: KeyboardEvent) {
      if (e.repeat) return;
      const note = pianoo.getNote(e.key);
      if (!note) return;
      pianoo.playNote(note);
      const _pressing = pressing.current;
      const expected = seq[idx.current];
      switch (expected.kind) {
        case "note":
          move(_pressing[expected.key]);
          break;
        case "chord":
          if (expected.keys.every(k => _pressing[k])) {
            move(true);
          } else if (expected.keys.every(k => k != e.key)) {
            move(false);
          }
          break;
        default:
          throw panic("unreachable");
      }
    }
    function move(correct: boolean) {
      let nextIdx = idx.current + 1;
      while (seq[nextIdx] && seq[nextIdx].kind == "rest") {
        nextIdx++;
      }
      sheet.current!.move(correct, idx.current, nextIdx);
      if (nextIdx == seq.length) {
        setStatus("done");
      } else {
        idx.current = nextIdx;
        pressing.current = {};
      }
    }
    document.addEventListener("keydown", trackKeydown, { capture: true });
    document.addEventListener("keyup", trackKeyup, { capture: true });
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", trackKeydown, { capture: true });
      document.removeEventListener("keyup", trackKeyup, { capture: true });
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [status, setStatus]);

  // auto play mode
  useEffect(() => {
    if (status != "autoplaying") return;
    let timeoutId: ReturnType<typeof setTimeout>;
    async function autoPlay() {
      await pianoo.start();
      const seq = pianoo.getSequence();
      if (idx.current == -1) {
        let firstNonRest = 0;
        while (seq[firstNonRest] && seq[firstNonRest].kind == "rest") {
          firstNonRest++;
        }
        sheet.current!.start(firstNonRest);
        idx.current = 0;
      }
      // play each item after a delay
      timeoutId = (function play(item: SheetItem, after: number) {
        const msPerQuarter = (60 * 1000) / pianoo.getTempo(); // tempo may change
        return setTimeout(() => {
          const note =
            item.kind == "note"
              ? pianoo.getNote(item.key)!
              : item.kind == "chord"
              ? item.keys.map(k => pianoo.getNote(k)!)
              : undefined;
          if (note) {
            pianoo.playNote(note);
            let nextNonRest = idx.current + 1;
            while (seq[nextNonRest] && seq[nextNonRest].kind == "rest") {
              nextNonRest++;
            }
            sheet.current!.move(true, idx.current, nextNonRest);
          }
          if (++idx.current == seq.length) {
            // done
            setStatus("ready");
          } else {
            timeoutId = play(seq[idx.current], item.quarter * msPerQuarter);
          }
        }, after);
      })(seq[idx.current], 0);
    }
    autoPlay();
    return () => clearTimeout(timeoutId);
  }, [status, setStatus]);

  // practice mode, just play music note, do not move sheet
  useEffect(() => {
    if (status != "practicing") return;
    function keydownHandler(e: KeyboardEvent) {
      if (e.repeat) return;
      const note = pianoo.getNote(e.key);
      if (note) pianoo.playNote(note);
    }
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  }, [status]);

  // TODO: handle overflow-x
  return (
    <div
      className="w-full h-50 font-mono text-xl scrollbar-hidden group"
      ref={sheetContainer}
    >
      <Sheet sheetItems={sheetItems} ref={sheet} />
      {status == "ready" && <SheetMask />}
    </div>
  );
}

function SheetMask() {
  const { t } = useTranslation();

  return (
    <div
      className="absolute top-10 left-0 w-full h-70 pointer-events-none
      flex items-center justify-center bg-transparent backdrop-blur-lg"
    >
      <div
        className="flex items-center gap-4 group-hover:scale-105
        transition-transform"
      >
        {t("play.hint.start")}
        <HiCursorClick className="group-hover:animate-pulse" />
      </div>
    </div>
  );
}

export default PlayerSheet;
