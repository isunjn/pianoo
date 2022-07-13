import { TbAdjustments, TbMaximize, TbPlayerPause, TbPlayerStop, TbRotate, TbVinyl } from "react-icons/tb";
import { RiMusicLine, RiRecordCircleLine, RiSettings3Line } from "react-icons/ri";
import type { IconBaseProps } from "react-icons";
import type { ComponentType } from "react";
import type { PlayerState, PlayerPopuping } from "~/components/Player";
import type { MusicScore } from "~/core/types";
import panic from "~/utils/panic";

interface PlayerControlProps {
  state: PlayerState;
  changeState: (newState: PlayerState) => void;
  togglePopuping: (popuping: PlayerPopuping) => void;
  score: MusicScore;
}

function PlayerControl({ state, changeState, togglePopuping, score }: PlayerControlProps) {

  function changeStateTo(newState: PlayerState) {
    return () => changeState(newState);
  }

  function changePopupingTo(newPopuping: PlayerPopuping) {
    return () => togglePopuping(newPopuping);
  }

  const leftControls = () => {
    switch (state) {
      case "ready": 
        return (<>
          <ControlBtn tooltip="Auto Play" onClick={changeStateTo("autoplaying")} Icon={TbVinyl} />
          <ControlBtn tooltip="Practice Mode" onClick={changeStateTo("practicing")} Icon={RiMusicLine} />
        </>);
      case "playing":
        return (<>
          <ControlBtn tooltip="Restart" onClick={changeStateTo("ready")} Icon={TbRotate} />
          <ControlBtn tooltip="Pause" onClick={changeStateTo("paused")} Icon={TbPlayerPause} />
          <ControlHint hint="Playing" />
        </>);
      case "paused":
        return (<>
          <ControlBtn tooltip="Restart" onClick={changeStateTo("ready")} Icon={TbRotate} />
          <ControlHint hint="Paused" />
        </>);
      case "done": 
        return (<>
          <ControlBtn tooltip="Restart" onClick={changeStateTo("ready")} Icon={TbRotate} />
          <ControlHint hint="End of play" />
        </>);
      case "autoplaying":
        return (<>
          <ControlBtn tooltip="Stop" onClick={changeStateTo("ready")} Icon={TbPlayerStop} />
          <ControlHint hint="Auto playing" />
        </>);
      case "practicing":
        return (<>
          <ControlBtn tooltip="Stop" onClick={changeStateTo("ready")} Icon={TbPlayerStop} />
          <ControlHint hint="Practicing" />
        </>);
      default:
        throw panic("unreachable");
    }
  };

  return (
    <div className="h-10 mb-10 flex justify-between items-center 
      text-xl font-mono border-b-2 border-[#eaf1f3]/25 zen-hoverable">
      
      <div className="flex-1 flex items-center gap-3">{leftControls()}</div>
      
      <button onClick={changePopupingTo("chooser")}
        className="flex-1 flex-grow-[2] text-center px-2 py-1 rounded text-base
        hover:bg-[#495755]/20 focus-visible:outline-2 focus-visible:outline 
        focus-visible:outline-[#eaf1f3] focus-visible:outline-offset-2">
        {score.name}
      </button>
      
      <div className="flex-1 flex justify-end gap-3 items-center">
        <ControlBtn tooltip="Adjust" onClick={changePopupingTo("adjustments")} Icon={TbAdjustments} />
        {/* <ControlBtn tooltip="Record" onClick={() => undefined} Icon={RiRecordCircleLine} /> */}
        <ControlBtn tooltip="Settings" onClick={changePopupingTo("settings")} Icon={RiSettings3Line} />
        <ControlBtn tooltip="Zen Mode" onClick={toggleZenMode} Icon={TbMaximize} />
      </div>
    
    </div>
  );
}

interface ControlBtnProps {
  tooltip: string;
  onClick: () => void;
  Icon: ComponentType<IconBaseProps>;
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
  return <div className="text-base leading-none text-[#495755]/75">{hint}</div>;
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
