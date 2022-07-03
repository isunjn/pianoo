import { TbAdjustments, TbKeyboard, TbMaximize, TbPlayerPause, TbPlayerPlay, TbPlayerStop, TbRotate } from "react-icons/tb";
import { RiMusicLine, RiRecordCircleLine, RiSettings3Line } from "react-icons/ri";
import type { PlayerState } from "~/components/Player";
import type { MusicScore } from "~/core/type";

interface PlayerControlProps {
  state: PlayerState;
  changeState: (newState: PlayerState) => void;
  score: MusicScore;
}

function PlayerControl({ state, changeState, score }: PlayerControlProps) {

  function changeStateTo(newState: PlayerState) {
    return () => changeState(newState);
  }

  return (
    <div className="flex justify-between items-center text-xl py-1.5 border-b-2 border-[#eaf1f3]/25">
      {/* left controls */}
      <div className="flex-1 flex items-center gap-3">
        {/* TODO: disable buttons if score is null */}
        {
          state == "ready" ? <button key="autoplay" aria-label="auto play" onClick={changeStateTo("autoplaying")} ><TbPlayerPlay /></button> :
          state == "playing" ? <button key="pause" aria-label="pause" onClick={changeStateTo("paused")}><TbPlayerPause /></button> :
          state == "paused" ? <button key="autoplay" aria-label="auto play" onClick={changeStateTo("autoplaying")}><TbPlayerPlay /></button> :
          <button key="stop" aria-label="stop auto play" onClick={changeStateTo("ready")}><TbPlayerStop /></button>
        }
        {
          state == "playing" || state == "paused" ? <button key="restart" aria-label="restart" onClick={changeStateTo("ready")}><TbRotate /></button> : null
        }
        {
          state == "playing" ? <div className="text-xs">Playing</div> :
          state == "paused" ? <div className="text-xs">Paused</div> :
          state == "autoplaying" ? <div className="text-xs">Auto playing</div> :
          null
        }
      </div>
      {/* song name */}
      <div className="flex-1 flex-grow-[2] text-center px-2 py-1 hover:bg-[#495755]/20 rounded text-sm">
        {score.name}
      </div>
      {/* right controls */}
      <div className="flex-1 flex justify-end gap-3 items-center">
        <button><RiMusicLine /></button> {/* display note name or piano keyboard */}
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
