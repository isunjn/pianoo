import {
  TbAdjustments,
  TbMaximize,
  TbPlayerPause,
  TbPlayerStop,
  TbRotate,
  TbVinyl,
} from "react-icons/tb";
import {
  RiMusicLine,
  RiSettings3Line,
  RiRecordCircleLine,
} from "react-icons/ri";
import type { IconType } from "react-icons";
import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import panic from "~/utils/panic";

function PlayerControl() {
  const { status, score } = usePlayer();
  const dispatch = usePlayerDispatch();

  const leftControls = () => {
    switch (status) {
      case "ready":
        return (<>
          <ControlBtn
            tooltip="Auto Play"
            Icon={TbVinyl}
            onClick={() => dispatch({ type: "auto_play" })} />
          <ControlBtn
            tooltip="Practice Mode"
            Icon={RiMusicLine}
            onClick={() => dispatch({ type: "practice" })} />
        </>);
      case "playing":
        return (<>
          <ControlBtn
            tooltip="Restart"
            Icon={TbRotate}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlBtn
            tooltip="Pause"
            Icon={TbPlayerPause}
            onClick={() => dispatch({ type: "pause" })} />
          <ControlHint hint="Playing" />
        </>);
      case "paused":
        return (<>
          <ControlBtn
            tooltip="Restart"
            Icon={TbRotate}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlHint hint="Paused" />
        </>);
      case "done":
        return (<>
          <ControlBtn
            tooltip="Restart"
            Icon={TbRotate}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlHint hint="End of play" />
        </>);
      case "autoplaying":
        return (<>
          <ControlBtn
            tooltip="Stop"
            Icon={TbPlayerStop}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlHint hint="Auto playing" />
        </>);
      case "practicing":
        return (<>
          <ControlBtn
            tooltip="Stop"
            Icon={TbPlayerStop}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlHint hint="Practicing" />
        </>);
      default:
        throw panic("unreachable");
    }
  };

  const rightControls = () => {
    return (<>
      <ControlBtn
        tooltip="Adjust"
        Icon={TbAdjustments}
        onClick={() => dispatch({ type: "open_adjustments" })} />
      <ControlBtn
        tooltip="Record"
        Icon={RiRecordCircleLine}
        onClick={() => dispatch({ type: "open_recorder" })} />
      <ControlBtn
        tooltip="Settings"
        Icon={RiSettings3Line}
        onClick={() => dispatch({ type: "open_settings" })} />
      <ControlBtn
        tooltip="Zen Mode"
        Icon={TbMaximize}
        onClick={toggleZenMode} />
    </>);
  }


  return (
    <div className="h-10 mb-10 flex justify-between items-center 
      text-xl font-mono border-b-2 border-[#eaf1f3]/25 zen-hoverable">

      <div className="flex-1 flex items-center gap-3">{leftControls()}</div>

      <button onClick={() => dispatch({ type: "open_chooser" })}
        className="flex-1 flex-grow-[2] text-center px-2 py-1 rounded text-base
        hover:bg-[#495755]/20 focus-visible:outline-2 focus-visible:outline 
        focus-visible:outline-[#eaf1f3] focus-visible:outline-offset-2">
        {score.name}
      </button>

      <div className="flex-1 flex justify-end gap-3 items-center">
        {rightControls()}
      </div>

    </div>
  );
}

interface ControlBtnProps {
  tooltip: string;
  Icon: IconType;
  onClick: () => void;
}

function ControlBtn({ tooltip, onClick, Icon }: ControlBtnProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick();
    e.currentTarget.blur();
  }
  return (
    <div className="relative group rounded h-6">
      <button key={tooltip} aria-label={tooltip} onClick={handleClick}
        className="peer focus-visible:outline-2 focus-visible:outline 
          focus-visible:outline-[#eaf1f3] focus-visible:outline-offset-2">
        <Icon />
      </button>
      <div className="absolute -top-9 -translate-x-1/2 left-1/2 
        invisible group-hover:visible peer-focus-visible:visible
        w-max text-base bg-[#495755]/50 text-[#eaf1f3] px-2.5 py-px rounded
        after:absolute after:top-full after:left-1/2 after:border-4 after:-ml-1
        after:border-transparent after:border-t-[#495755]/50">
        {tooltip}
      </div>
    </div>
  );
}

function ControlHint({ hint }: { hint: string }) {
  return (
    <div className="text-base leading-none text-[#495755]/75">
      {hint}
    </div>
  );
}

function toggleZenMode() {
  if (document.body.classList.contains("zen-mode")) {
    if (document.fullscreenElement) document.exitFullscreen();
    document.body.classList.remove("zen-mode");
  } else {
    document.documentElement.requestFullscreen();
    document.body.classList.add("zen-mode");
  }
}

export default PlayerControl;
