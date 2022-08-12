import PopupChooser from "~/components/PopupChooser";
import PopupAdjustments from "~/components/PopupAdjustments";
import PopupRecorder from "~/components/PopupRecorder";
import PopupSettings from "~/components/PopupSettings";
import usePlayerStore from "~/store/usePlayerStore";

function PlayerPopup() {
  const popuping = usePlayerStore(state => state.popuping);
  const setPopuping = usePlayerStore(state => state.setPopuping);

  return (
    <>
      {popuping == "chooser" ? (
        <PopupChooser />
      ) : popuping == "adjustments" ? (
        <PopupAdjustments />
      ) : popuping == "recorder" ? (
        <PopupRecorder />
      ) : popuping == "settings" ? (
        <PopupSettings />
      ) : null}
      {/* a click outside of the popup will close it */}
      {popuping != "none" && (
        <div
          onClick={() => setPopuping("none")}
          className="fixed top-0 left-0 w-screen h-screen z-10"
        ></div>
      )}
    </>
  );
}

export default PlayerPopup;
