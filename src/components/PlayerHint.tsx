import { useTranslation } from "react-i18next";
import { TbRotate } from "react-icons/tb";
import usePlayerStore from "~/store/usePlayerStore";

function PlayerHint() {
  const status = usePlayerStore(state => state.status);
  const { t } = useTranslation();

  return (
    <div
      className="h-20 flex justify-center items-center gap-4 font-mono
      zen-hoverable text-th-text"
    >
      {status == "done" && (
        <>
          <div>{t("play.hint.restart")}</div>
          <TbRotate className="text-xl" />
        </>
      )}
      {/* TODO: more hint messages */}
    </div>
  );
}

export default PlayerHint;
