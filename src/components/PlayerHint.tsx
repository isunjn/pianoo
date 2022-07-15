import { TbRotate } from "react-icons/tb";
import { usePlayer } from "~/contexts/PlayerContext";

function PlayerHint() {
  const { status } = usePlayer();
  
  return (
    <div className="h-10 flex justify-center items-center gap-4 font-mono zen-hoverable">
      {status == "done" && <>
        <div>Press space to restart</div>
        <TbRotate className="text-xl" />
      </>}
      {/* TODO: more hint messages */}
    </div>
  );
}

export default PlayerHint;
