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
import parse, { type MusicScore } from "~/core/parser";
import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import { K_SCORE_ID } from "~/constants/storage-keys";
import panic from "~/utils/panic";
import detectIsMobile from "~/utils/detectIsMobile";

const isMobile = detectIsMobile();

function Player() {
  const pianooStatus = usePianooStatus();
  const { status } = usePlayer();
  const dispatch = usePlayerDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (status != "idle") return;
    /* backend not built yet, use static files in public/examples temporarily */
    let ignore = false;
    const id = localStorage.getItem(K_SCORE_ID) ?? "1";
    fetch(`/examples/${id.padStart(3, "0")}.json`)
      .then(r => r.json() as Promise<MusicScore>)
      .then(score => {
        if (ignore) return;
        const [parsedScore, syntaxErrors] = parse(score);
        if (syntaxErrors) panic("syntax error occurred");
        const sheetItems = pianoo.prepare(parsedScore!);
        dispatch({ type: "set_score", score: parsedScore!, sheetItems });
      })
      .catch(() => setError(true));
    return () => {
      ignore = true;
    };
  }, [status, dispatch]);

  useEffect(() => {
    return () => dispatch({ type: "unmount" });
  }, [dispatch]);

  if (isMobile) {
    return (
      <p className="text-center">
        {t("error.mobileNotSupported.1")}
        <br />
        {t("error.mobileNotSupported.2")}
      </p>
    );
  }

  if (pianooStatus == "error" || error) {
    return <Error msg={t("error.crash")} />;
  }

  if (
    pianooStatus == "idle" ||
    status == "idle" ||
    status == "loadingInstrument"
  ) {
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
