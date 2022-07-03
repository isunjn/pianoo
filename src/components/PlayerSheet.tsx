import { useEffect, useRef } from "react";
import * as Tone from "tone";
import type { PlayerState } from "~/components/Player";
import type { SheetItem } from "~/core/type";
import { __keymap_standard_reverse__ as KM } from "~/config/keymap/standard";

interface PlayerSheetProps {
  state: PlayerState;
  changeState: (newState: PlayerState) => void;
  sheetItems: SheetItem[][];
}

function PlayerSheet({ state, changeState, sheetItems }: PlayerSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // ready to play, chick or press to start
  useEffect(() => {
    if (!(state == "ready" || state == "paused")) return;
    const sheet = sheetRef.current!;
    async function startToPlay() {
      sheet.removeEventListener("click", startToPlay);
      document.removeEventListener("keydown", startToPlay);
      await Tone.start(); // TODO: error handling
      changeState("playing");
    }
    sheet.addEventListener("click", startToPlay);
    document.addEventListener("keydown", startToPlay);
    return () => {
      sheet.removeEventListener("click", startToPlay);
      document.removeEventListener("keydown", startToPlay);
    };
  }, [state, changeState]);

  return (
    <div ref={sheetRef} className="w-full h-48 overflow-x-auto py-10 pb-16 font-mono border border-yellow-300">
      <div id="sheet" className="w-full text-xl">
      {
        state == "ready" ? <div>Click or press any key to start</div> :
        state == "paused" ? <div>Pasued, click or press any key to resume</div> :
        sheetItems.map((row, i) => (
          <div key={i} className="w-fit mx-auto">
            {row.map((item, j) => {
              const durationClass = "d" + item.duration * 100;
              switch(item.kind) {
                case "note": return <span key={j} className={durationClass}>{KM.get(item.note)}</span>;
                case "chord": return <span key={j} className={durationClass}>[{item.notes.map(n => KM.get(n)).join('')}]</span>;
                case "rest": return <span key={j} className={durationClass}> </span>;
                default: throw new Error("unknown item kind");
              }
            })}
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default PlayerSheet;
