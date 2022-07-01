import { useEffect, useRef } from "react";
import * as Tone from "tone";
import type { PlayerState } from "~/components/Player";

interface PlayerSheetProps {
  state: PlayerState;
  changeState: (newState: PlayerState) => void;
}

function PlayerSheet({ state, changeState }: PlayerSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // ready to play, chick or press to start
  useEffect(() => {
    if (state != "ready" && state != "paused") return;
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
    <div ref={sheetRef} className="mx-auto h-48 overflow-scroll p-10 pb-16 w-fit border border-yellow-300">
      {
        state == "ready" ? <div>Click or press any key to start</div> :
        state == "paused" ? <div>Pasued, click or press any key to resume</div> :
        <div>
            w t y tyu ooo uyt<br />
            w t y tyu oooo uyt<br />
            o oo p os o u y u<br />
            ytytytyty tyuio<br />
            tyuu uuu iuyu <br />
            tyuu uu ouyt yuu<br />
            uop ops opu uyu<br />
            t yyyyy ou yy <br />
            opss opss<br />
            ops sdd sas <br />
          </div>
      }
    </div>
  );
}

export default PlayerSheet;
