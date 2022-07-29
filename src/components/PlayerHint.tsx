import { useTranslation } from "react-i18next";
import { TbRotate } from "react-icons/tb";
import { usePlayer } from "~/contexts/PlayerContext";

function PlayerHint() {
  const { status } = usePlayer();
  const { t } = useTranslation();
  
  return (
    <div className="h-12 flex justify-center items-center gap-4 font-mono
      zen-hoverable text-th-text">
      {status == "done" && <>
        <div>{t("play.hint.restart")}</div>
        <TbRotate className="text-xl" />
      </>}
      {/* TODO: more hint messages */}
    </div>
  );
}

export default PlayerHint;
