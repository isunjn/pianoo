import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerScoreMeta from "~/components/PlayerScoreMeta";
import PlayerHint from "~/components/PlayerHint";
import PlayerPopup from "~/components/PlayerPopup";
import Loading from "~/components/Loading";
import Error from "~/components/Error";
import player from "~/core/player";
import parse, { type MusicScore } from "~/core/parser";
import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import { K_SCORE_ID } from "~/constant/storage-keys";

function Player() {
  const { status } = usePlayer();
  const dispatch = usePlayerDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (status != "idle") return;
    /* backend not built yet, use static files in public/examples temporarily */
    let ignore = false;
    const id = localStorage.getItem(K_SCORE_ID) ?? "1";
    const loadScore = fetch(`/examples/${id.padStart(3, "0")}.json`)
      .then(r => r.json() as Promise<MusicScore>)
    Promise.all([loadScore, player.init()])
      .then(([score]) => {
        if (ignore) return;
        const parsedScore = parse(score);
        const sheetItems = player.prepare(parsedScore);
        dispatch({ type: "set_score", score: parsedScore, sheetItems });
      })
      .catch(() => setError(true));
    return () => { ignore = true; };
  }, [status, dispatch]);

  useEffect(() => {
    return () => dispatch({ type: "unmount" });
  }, [dispatch]);

  if (error) {
    return <Error msg={t("error.crash")} />;
  }

  if (status == "idle") {
    return <Loading />;
  }

  return (
    <div className="relative mx-auto w-3/4 select-none">
      <PlayerControl />
      <PlayerSheet />
      <PlayerHint />
      <PlayerScoreMeta />
      <PlayerPopup />
    </div>
  );
}

export default Player;
