import { TbRotate } from "react-icons/tb";
import type { PlayerState } from "~/components/Player";

interface PlayerHintProps {
  state: PlayerState;
}

function PlayerHint({ state }: PlayerHintProps) {
  return (
    <div className="h-10 flex justify-center items-center gap-4 font-mono">
      {state == "done" && <>
        <div>Press <span className="px-6 pb-0.5 rounded bg-[#eaf1f3]/75 text-[#7b9c98]">space</span> to restart</div>
        {/* <TbRotate className="text-2xl" /> */}
      </>}
      {/* TODO: more hint messages */}
    </div>
  );
}

export default PlayerHint;
