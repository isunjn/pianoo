import PopupChooser from "~/components/PopupChooser";
import PopupAdjustments from "~/components/PopupAdjustments";
import PopupRecorder from "~/components/PopupRecorder";
import PopupSettings from "~/components/PopupSettings";
import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";

function PlayerPopup() {
  const { popuping } = usePlayer();
  const dispatch = usePlayerDispatch();

  return (<>
    {
      popuping == "chooser" ?
        <PopupChooser /> :
        popuping == "adjustments" ?
          <PopupAdjustments /> :
          popuping == "recorder" ?
            <PopupRecorder /> :
            popuping == "settings" ?
              <PopupSettings /> :
              null
    }
    {/* a click outside of the popup will close it */}
    {
      popuping != "none" && <div onClick={() => dispatch({ type: "close_popup" })}
        className="fixed top-0 left-0 w-screen h-screen z-10"></div>
    }
  </>);
}

export default PlayerPopup;
