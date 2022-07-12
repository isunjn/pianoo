import { TbAdjustments, TbKeyboard, TbMaximize, TbPlayerPause, TbPlayerStop, TbRotate, TbFlag3, TbVinyl } from "react-icons/tb";
import { RiMusicLine, RiRecordCircleLine, RiSettings3Line } from "react-icons/ri";
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
          <button  key="autoplay" aria-label="Auto Play" onClick={changeStateTo("autoplaying")}><TbVinyl /></button>
          <button key="practice" aria-label="Practice Mode" onClick={changeStateTo("practicing")}><RiMusicLine /></button>
        </>);
      case "playing":
        return (<>
          <button key="restart" aria-label="Restart" onClick={changeStateTo("ready")}><TbRotate /></button>
          <button key="pause" aria-label="Pause" onClick={changeStateTo("paused")}><TbPlayerPause /></button>
          <div className="text-base text-[#495755]/75">Playing</div> {/* TODO: show time spent */}
        </>);
      case "paused":
        return (<>
          <button key="restart" aria-label="Restart" onClick={changeStateTo("ready")}><TbRotate /></button>
          <div className="text-base text-[#495755]/75">Paused</div>
        </>);
      case "done": 
        return (<>
          <button key="restart" aria-label="Restart" onClick={changeStateTo("ready")}><TbRotate /></button>
          <div className="text-base text-[#495755]/75">End of play</div>
        </>);
      case "autoplaying":
        return (<>
          <button key="stop" aria-label="Stop" onClick={changeStateTo("ready")}><TbPlayerStop /></button>
          <div className="text-base text-[#495755]/75">Auto playing</div>
        </>);
      case "practicing":
        return (<>
          <button key="stop" aria-label="Stop" onClick={changeStateTo("ready")}><TbPlayerStop /></button>
          <div className="text-base text-[#495755]/75">Practicing</div>
        </>);
      default: 
        throw panic("unreachable");
    }
  };

  return (
    <div className="h-10 mb-10 flex justify-between items-center text-xl font-mono border-b-2 border-[#eaf1f3]/25 zen-hoverable">
      {/* left controls */}
      <div className="flex-1 flex items-center gap-3">{leftControls()}</div>
      {/* song name */}
      <div className="flex-1 flex-grow-[2] text-center px-2 py-1 hover:bg-[#495755]/20 rounded text-base cursor-pointer"
        onClick={changePopupingTo("chooser")} >
        {score.name}
      </div>
      {/* right controls */}
      <div className="flex-1 flex justify-end gap-3 items-center">
        <button onClick={changePopupingTo("adjustments")}><TbAdjustments /></button>
        <button><RiRecordCircleLine /></button>
        <button onClick={toggleZenMode}><TbMaximize /></button> 
        <button onClick={changePopupingTo("settings")}><RiSettings3Line /></button>
      </div>
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
