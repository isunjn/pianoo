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
import usePlayerStore from "~/store/usePlayerStore";
import panic from "~/utils/panic";

function PlayerControl() {
  const status = usePlayerStore(state => state.status);
  const score = usePlayerStore(state => state.score);
  const setStatus = usePlayerStore(state => state.setStatus);
  const setPopuping = usePlayerStore(state => state.setPopuping);
  const { t } = useTranslation();

  const leftControls = () => {
    switch (status) {
      case "ready":
        return (
          <>
            <ControlBtn
              tooltip={t("play.btn.autoPlay")}
              Icon={TbVinyl}
              onClick={() => setStatus("autoplaying")}
            />
            <ControlBtn
              tooltip={t("play.btn.practiceMode")}
              Icon={RiMusicLine}
              onClick={() => setStatus("practicing")}
            />
          </>
        );
      case "playing":
        return (
          <>
            <ControlBtn
              tooltip={t("play.btn.autoPlay")}
              Icon={TbVinyl}
              onClick={() => setStatus("autoplaying")}
            />
            <ControlBtn
              tooltip={t("play.btn.restart")}
              Icon={TbRotate}
              onClick={() => setStatus("ready")}
            />
          </>
        );
      case "done":
        return (
          <>
            <ControlBtn
              tooltip={t("play.btn.restart")}
              Icon={TbRotate}
              onClick={() => setStatus("ready")}
            />
            <ControlHint hint={t("play.btn.hint.endOfPlay")} />
          </>
        );
      case "autoplaying":
        return (
          <>
            <ControlBtn
              tooltip={t("play.btn.stop")}
              Icon={TbPlayerStop}
              onClick={() => setStatus("ready")}
            />
            <ControlHint hint={t("play.btn.hint.autoPlaying")} />
          </>
        );
      case "practicing":
        return (
          <>
            <ControlBtn
              tooltip={t("play.btn.stop")}
              Icon={TbPlayerStop}
              onClick={() => setStatus("ready")}
            />
            <ControlHint hint={t("play.btn.hint.practicing")} />
          </>
        );
      case "justplaying":
        return (
          <>
            <ControlBtn
              tooltip={t("play.btn.stop")}
              Icon={TbPlayerStop}
              onClick={() => setStatus("ready")}
            />
            <ControlHint hint={t("play.btn.hint.justPlaying")} />
          </>
        );
      default:
        throw panic("unreachable");
    }
  };

  const rightControls = () => {
    return (
      <>
        <ControlBtn
          tooltip={t("play.btn.adjust")}
          Icon={TbAdjustments}
          onClick={() => setPopuping("adjustments")}
        />
        {/* <ControlBtn
        tooltip="Record"
        Icon={RiRecordCircleLine}
        onClick={() => setPopuping("record")} /> */}
        <ControlBtn
          tooltip={t("play.btn.settings")}
          Icon={RiSettings3Line}
          onClick={() => setPopuping("settings")}
        />
        <ControlBtn
          tooltip={t("play.btn.focusMode")}
          Icon={TbMaximize}
          onClick={toggleFocusMode}
        />
      </>
    );
  };

  return (
    <div className="pb-10 zen-hoverable">
      <div
        className="h-10 flex justify-between items-center 
        text-xl font-mono border-b-2 border-th-hint"
      >
        <div className="flex-1 flex items-center gap-3">{leftControls()}</div>

        {status != "justplaying" && (
          <button
            onClick={() => setPopuping("chooser")}
            className="flex-1 flex-grow-[2] text-center px-2 py-1 rounded text-base
              hover:bg-th-hover focus-visible:outline-2 focus-visible:outline 
              focus-visible:outline-th-text focus-visible:outline-offset-2"
          >
            {score!.name}
          </button>
        )}

        <div className="flex-1 flex justify-end gap-3 items-center">
          {rightControls()}
        </div>
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
      <button
        key={tooltip}
        aria-label={tooltip}
        onClick={handleClick}
        className="peer focus-visible:outline-2 focus-visible:outline 
          focus-visible:outline-th-text focus-visible:outline-offset-2"
      >
        <Icon />
      </button>
      <div
        className="absolute -top-12 -translate-x-1/2 left-1/2
        invisible group-hover:visible peer-focus-visible:visible
        w-max text-base bg-th-hover px-4 py-1 rounded
        after:absolute after:top-full after:left-1/2 after:border-4 after:-ml-1
        after:border-transparent after:border-t-th-hover"
      >
        {tooltip}
      </div>
    </div>
  );
}

function ControlHint({ hint }: { hint: string }) {
  return <div className="text-base leading-none text-th-hint">{hint}</div>;
}

function toggleFocusMode() {
  if (document.body.classList.contains("zen-mode")) {
    if (document.fullscreenElement) document.exitFullscreen();
    document.body.classList.remove("zen-mode");
  } else {
    document.documentElement.requestFullscreen();
    document.body.classList.add("zen-mode");
  }
}

export default PlayerControl;
