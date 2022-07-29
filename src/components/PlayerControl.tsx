import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const leftControls = () => {
    switch (status) {
      case "ready":
        return (<>
          <ControlBtn
            tooltip={t("play.btn.autoPlay")}
            Icon={TbVinyl}
            onClick={() => dispatch({ type: "auto_play" })} />
          <ControlBtn
            tooltip={t("play.btn.practiceMode")}
            Icon={RiMusicLine}
            onClick={() => dispatch({ type: "practice" })} />
        </>);
      case "playing":
        return (<>
          <ControlBtn
            tooltip={t("play.btn.restart")}
            Icon={TbRotate}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlBtn
            tooltip={t("play.btn.pause")}
            Icon={TbPlayerPause}
            onClick={() => dispatch({ type: "pause" })} />
          <ControlHint hint={t("play.btn.hint.playing")} />
        </>);
      case "paused":
        return (<>
          <ControlBtn
            tooltip={t("play.btn.restart")}
            Icon={TbRotate}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlHint hint={t("play.btn.hint.paused")} />
        </>);
      case "done":
        return (<>
          <ControlBtn
            tooltip={t("play.btn.restart")}
            Icon={TbRotate}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlHint hint={t("play.btn.hint.endOfPlay")} />
        </>);
      case "autoplaying":
        return (<>
          <ControlBtn
            tooltip={t("play.btn.stop")}
            Icon={TbPlayerStop}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlHint hint={t("play.btn.hint.autoPlaying")} />
        </>);
      case "practicing":
        return (<>
          <ControlBtn
            tooltip={t("play.btn.stop")}
            Icon={TbPlayerStop}
            onClick={() => dispatch({ type: "reset" })} />
          <ControlHint hint={t("play.btn.hint.practicing")} />
        </>);
      default:
        throw panic("unreachable");
    }
  };

  const rightControls = () => {
    return (<>
      <ControlBtn
        tooltip={t("play.btn.adjust")}
        Icon={TbAdjustments}
        onClick={() => dispatch({ type: "open_adjustments" })} />
      {/* <ControlBtn
        tooltip="Record"
        Icon={RiRecordCircleLine}
        onClick={() => dispatch({ type: "open_recorder" })} /> */}
      <ControlBtn
        tooltip={t("play.btn.settings")}
        Icon={RiSettings3Line}
        onClick={() => dispatch({ type: "open_settings" })} />
      <ControlBtn
        tooltip={t("play.btn.zenMode")}
        Icon={TbMaximize}
        onClick={toggleZenMode} />
    </>);
  }


  return (
    <div className="h-10 mb-10 flex justify-between items-center 
      text-xl font-mono border-b-2 border-th-hint zen-hoverable">

      <div className="flex-1 flex items-center gap-3">{leftControls()}</div>

      <button onClick={() => dispatch({ type: "open_chooser" })}
        className="flex-1 flex-grow-[2] text-center px-2 py-1 rounded text-base
        hover:bg-th-hover focus-visible:outline-2 focus-visible:outline 
        focus-visible:outline-th-text focus-visible:outline-offset-2">
        {score!.name}
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
          focus-visible:outline-th-text focus-visible:outline-offset-2">
        <Icon />
      </button>
      <div className="absolute -top-9 -translate-x-1/2 left-1/2
        invisible group-hover:visible peer-focus-visible:visible
        w-max text-base bg-th-hover text-th-text px-2.5 pb-0.5 pt-[3px] rounded
        after:absolute after:top-full after:left-1/2 after:border-4 after:-ml-1
        after:border-transparent after:border-t-th-hover">
        {tooltip}
      </div>
    </div>
  );
}

function ControlHint({ hint }: { hint: string }) {
  return (
    <div className="text-base leading-none text-th-hint">
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
