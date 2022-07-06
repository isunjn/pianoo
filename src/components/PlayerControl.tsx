import { TbAdjustments, TbKeyboard, TbMaximize, TbPlayerPause, TbPlayerStop, TbRotate, TbTree } from "react-icons/tb";
import { RiMusicLine, RiRecordCircleLine, RiSettings3Line } from "react-icons/ri";
import type { PlayerState } from "~/components/Player";
import type { MusicScore } from "~/core/types";
import panic from "~/utils/panic";

interface PlayerControlProps {
  state: PlayerState;
  changeState: (newState: PlayerState) => void;
  score: MusicScore;
}

function PlayerControl({ state, changeState, score }: PlayerControlProps) {

  function changeStateTo(newState: PlayerState) {
    return () => changeState(newState);
  }

  const leftControls = () => {
    switch (state) {
      case "ready": 
        return (<>
          <button  key="autoplay" aria-label="Auto Play" onClick={changeStateTo("autoplaying")}><RiMusicLine /></button>
          <button key="practice" aria-label="Practice Mode" onClick={changeStateTo("practicing")}><TbTree /></button>
        </>);
      case "playing":
        return (<>
          <button key="restart" aria-label="Restart" onClick={changeStateTo("ready")}><TbRotate /></button>
          <button key="pause" aria-label="Pause" onClick={changeStateTo("paused")}><TbPlayerPause /></button>
          <div className="text-xs">Playing</div> {/* TODO: show time spent */}
        </>);
      case "paused":
        return (<>
          <button key="restart" aria-label="Restart" onClick={changeStateTo("ready")}><TbRotate /></button>
          <div className="text-xs">Paused</div>
        </>);
      case "done": 
        return (<>
          <button key="restart" aria-label="Restart" onClick={changeStateTo("ready")}><TbRotate /></button>
          <div className="text-xs">End of play</div>
        </>);
      case "autoplaying":
        return (<>
          <button key="stop" aria-label="Stop" onClick={changeStateTo("ready")}><TbPlayerStop /></button>
          <div className="text-xs">Auto playing</div>
        </>);
      case "practicing":
        return (<>
          <button key="stop" aria-label="Stop" onClick={changeStateTo("ready")}><TbPlayerStop /></button>
          <div className="text-xs">Practicing</div>
        </>);
      default: 
        throw panic("unreachable");
    }
  };

  return (
    <div className="h-10 flex justify-between items-center text-xl border-b-2 border-[#eaf1f3]/25">
      {/* left controls */}
      <div className="flex-1 flex items-center gap-3">{leftControls()}</div>
      {/* song name */}
      <div className="flex-1 flex-grow-[2] text-center px-2 py-1 hover:bg-[#495755]/20 rounded text-sm">
        {score.name}
      </div>
      {/* right controls */}
      <div className="flex-1 flex justify-end gap-3 items-center">
        {/* <button><RiMusicLine /></button>  */}{/* display note name or piano keyboard */}
        <button><TbAdjustments /></button> {/* BPM volume transpose sustain  */}
        <button><RiRecordCircleLine /></button> {/* record */}
        <button><TbMaximize /></button> {/* focus mode */}
        <button><RiSettings3Line /></button> {/* settings */}
        {/* <button><TbKeyboard /></button> */}
      </div>
    </div>
  );
}

export default PlayerControl;
