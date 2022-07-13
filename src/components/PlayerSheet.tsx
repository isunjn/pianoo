import { useEffect, useRef, forwardRef, type Ref } from "react";
import { HiCursorClick } from "react-icons/hi";
import * as Tone from "tone";
import Sheet from "~/components/Sheet";
import type { PlayerState } from "~/components/Player";
import type { SheetImperativeHandleAPI } from "~/components/Sheet";
import type { SheetItems } from "~/core/types";
import type Keymap from "~/config/keymap/type";

interface PlayerSheetProps {
  state: PlayerState;
  changeState: (newState: PlayerState) => void;
  sheetItems: SheetItems;
  keymap: Keymap;
}

const PlayerSheet = forwardRef(
  function PlayerSheet(
    { state, changeState, sheetItems, keymap }: PlayerSheetProps,
    ref: Ref<SheetImperativeHandleAPI>
  ) {
    const sheetContainerRef = useRef<HTMLDivElement>(null);

    // ready to play, chick or press to start
    useEffect(() => {
      if (!(state == "ready" || state == "paused")) return;
      const sheetContainer = sheetContainerRef.current!;
      async function startToPlay() {
        sheetContainer.removeEventListener("click", startToPlay);
        document.removeEventListener("keydown", keydownHandler);
        await Tone.start(); // TODO: error handling
        changeState("playing");
      }
      function keydownHandler(event: KeyboardEvent) {
        if (event.key == " ") { // space key
          event.preventDefault();
          startToPlay();
        }
      }
      sheetContainer.addEventListener("click", startToPlay);
      document.addEventListener("keydown", keydownHandler);
      return () => {
        sheetContainer.removeEventListener("click", startToPlay);
        document.removeEventListener("keydown", keydownHandler);
      };
    }, [state, changeState]);

    // TODO: handle overflow-x
    return (
      <div className="w-full h-52 font-mono text-xl scrollbar-hidden group"
        ref={sheetContainerRef}>
        <Sheet sheetItems={sheetItems} keymap={keymap} ref={ref} />
        {(state == "ready" || state == "paused") && <SheetMask state={state} />}
      </div>
    );
  }
);

function SheetMask({ state }: { state: PlayerState }) {
  return (
    <div className="absolute top-20 left-0 w-full h-52 pointer-events-none
      flex items-center justify-center bg-[#7b9c98]/25 backdrop-blur">
      <div className="flex items-center gap-4 group-hover:scale-[1.025] 
        transition-transform ease-in">
        {state == "ready"
          ? "Click or press space to start"
          : "Click or press space to resume"}
        <HiCursorClick />
      </div>
    </div>
  );
}

export default PlayerSheet;
