import { useEffect } from "react";
import PlayerControl from "~/components/PlayerControl";
import PlayerSheet from "~/components/PlayerSheet";
import PlayerScoreMeta from "~/components/PlayerScoreMeta";
import PlayerHint from "~/components/PlayerHint";
import PlayerPopup from "~/components/PlayerPopup";
import player from "~/core/player";
import { PlayerProvider, usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";

function Player() {
  const { status } = usePlayer();
  const dispatch = usePlayerDispatch();

  useEffect(() => {
    player.load().then(() => dispatch({ type: "loaded" }));
    // TODO: load score from backend
  }, [dispatch]);

  if (status == "idle") {
    return <div className="w-fit mx-auto">loading...</div>;
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

function PlayerWrapper() {
  return (
    <PlayerProvider>
      <Player />
    </PlayerProvider>
  );
}



export default PlayerWrapper;
