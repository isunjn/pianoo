import { TbAdjustments, TbKeyboard, TbMaximize, TbPlayerPause, TbPlayerPlay, TbPlayerStop, TbRotate } from "react-icons/tb";
import { RiMusicLine, RiRecordCircleLine, RiSettings3Line } from "react-icons/ri";
import type { PlayerState } from "~/components/Player";

interface PlayerControlProps {
  state: PlayerState;
  changeState: (newState: PlayerState) => void;
}

function PlayerControl({ state, changeState }: PlayerControlProps) {

  function changeStateTo(newState: PlayerState) {
    return () => changeState(newState);
  }

  return (
    <div className="flex justify-between items-center text-xl py-1.5 border-b-2 border-[#eaf1f3]/25">
      {/* left controls */}
      <div className="flex-1 flex items-center gap-3">
        {
          state == "idle" ? <button onClick={changeStateTo("autoplaying")} ><TbPlayerPlay /></button> :
          state == "playing" ? <button onClick={changeStateTo("paused")}><TbPlayerPause /></button> :
          state == "paused" ? <button onClick={changeStateTo("autoplaying")}><TbPlayerPlay /></button> :
          <button onClick={changeStateTo("idle")}><TbPlayerStop /></button>
        }
        {
          state == "playing" || state == "paused" ? <button onClick={changeStateTo("idle")}><TbRotate /></button> : null
        }
        {
          state == "playing" ? <div className="text-xs">Playing</div> :
          state == "paused" ? <div className="text-xs">Paused</div> :
          state == "autoplaying" ? <div className="text-xs">Auto playing</div> :
          null
        }
      </div>
      {/* song name */}
      <div className="flex-1 flex-grow-[2] text-center px-2 py-1 hover:bg-[#495755]/20 rounded text-base">
        龙の歌
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
