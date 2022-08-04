import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerScoreMeta from "~/components/PlayerScoreMeta";
import PlayerHint from "~/components/PlayerHint";
import PlayerPopup from "~/components/PlayerPopup";
import Loading from "~/components/Loading";
import Error from "~/components/Error";
import { usePianooStatus } from "~/components/App";
import pianoo from "~/core/pianoo";
import parse from "~/core/parser";
import { useExampleScore } from "~/hooks/useExampleScore";
import usePlayerStore from "~/store/usePlayerStore";
import { K_SCORE_ID } from "~/constants/storage-keys";
import panic from "~/utils/panic";
import detectIsMobile from "~/utils/detectIsMobile";

const isMobile = detectIsMobile();
const initialScoreIdStr = localStorage.getItem(K_SCORE_ID);
const initialScoreId = initialScoreIdStr ? parseInt(initialScoreIdStr) : 1;

function Player() {
  const pianooStatus = usePianooStatus();
  const status = usePlayerStore(state => state.status);
  const setScore = usePlayerStore(state => state.setScore);
  const resetPlayer = usePlayerStore(state => state.reset);
  const { t } = useTranslation();
  const { score: initialScore, isError } = useExampleScore(initialScoreId);

  useEffect(() => {
    if (status == "idle" && initialScore) {
      const [parsedScore, syntaxErrors] = parse(initialScore);
      if (syntaxErrors) panic("syntax error occurred");
      const sheetItems = pianoo.prepare(parsedScore!);
      setScore(parsedScore!, sheetItems);
    }
  }, [status, initialScore, setScore]);

  useEffect(() => resetPlayer, [resetPlayer]);

  if (isMobile) {
    return (
      <p className="text-center">
        {t("error.mobileNotSupported.1")}
        <br />
        {t("error.mobileNotSupported.2")}
      </p>
    );
  }

  if (pianooStatus == "error" || isError) {
    return <Error msg={t("error.crash")} />;
  }

  if (pianooStatus == "idle" || status == "idle" || status == "loading") {
    return <Loading />;
  }

  return (
    <div className="relative mx-auto w-full lg:w-3/4">
      <PlayerControl />
      <PlayerSheet />
      <PlayerHint />
      <PlayerScoreMeta />
      <PlayerPopup />
    </div>
  );
}

export default Player;
