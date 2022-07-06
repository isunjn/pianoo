import { useEffect, useRef, forwardRef, type Ref } from "react";
import { HiCursorClick } from "react-icons/hi";
import * as Tone from "tone";
import Sheet from "~/components/Sheet";
import type { PlayerState } from "~/components/Player";
import type { SheetImperativeHandleAPI } from "~/components/Sheet";
import type { SheetItems } from "~/core/types";

interface PlayerSheetProps {
  state: PlayerState;
  changeState: (newState: PlayerState) => void;
  sheetItems: SheetItems;
}

const PlayerSheet = forwardRef(
  function PlayerSheet(
    { state, changeState, sheetItems }: PlayerSheetProps,
    ref: Ref<SheetImperativeHandleAPI>
  ) {
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

    // TODO: handle overflow-x
    return (
      <div ref={sheetContainerRef} className="w-full h-52 font-mono text-xl scrollbar-hidden group">
        <Sheet sheetItems={sheetItems} ref={ref} />
        {(state == "ready" || state == "paused") &&
          <div className="absolute top-10 left-0 w-full h-52 flex items-center justify-center
                        bg-[#7b9c98]/30 backdrop-blur-sm pointer-events-none">
            <div className="flex items-center gap-4 group-hover:scale-[1.025] transition-transform ease-in">
              {state == "ready" ? "Click or press any key to start" : "Pasued, click or press any key to resume"} 
              <HiCursorClick />
            </div>
          </div>
        }
      </div>
    );
  }
);

export default PlayerSheet;
