import { useEffect, useRef } from "react";
import * as Tone from "tone";
import Sheet from "~/components/Sheet";
import type { PlayerState } from "~/components/Player";
import type { SheetItems } from "~/core/types";

interface PlayerSheetProps {
  state: PlayerState;
  changeState: (newState: PlayerState) => void;
  sheetItems: SheetItems;
}

function PlayerSheet({ state, changeState, sheetItems }: PlayerSheetProps) {
  const sheetContainerRef = useRef<HTMLDivElement>(null);

  // ready to play, chick or press to start
  useEffect(() => {
    if (!(state == "ready" || state == "paused")) return;
    const sheetContainer = sheetContainerRef.current!;
    async function startToPlay() {
      sheetContainer.removeEventListener("click", startToPlay);
      document.removeEventListener("keydown", startToPlay);
      await Tone.start(); // TODO: error handling
      changeState("playing");
    }
    sheetContainer.addEventListener("click", startToPlay);
    document.addEventListener("keydown", startToPlay);
    return () => {
      sheetContainer.removeEventListener("click", startToPlay);
      document.removeEventListener("keydown", startToPlay);
    };
  }, [state, changeState]);

  return (
    <div ref={sheetContainerRef} className="relative w-full h-48 overflow-y-auto py-10 pb-16 font-mono text-xl">
      <Sheet sheetItems={sheetItems} />
      {(state == "ready" || state == "paused") &&
        <div className="absolute top-0 left-0 w-full h-48 flex items-center justify-center bg-[#7b9c98]/30 backdrop-blur-sm">
          {state == "ready" ? "Click or press any key to start" : "Pasued, click or press any key to resume"}
        </div>
      }
    </div>
  );
}

export default PlayerSheet;
