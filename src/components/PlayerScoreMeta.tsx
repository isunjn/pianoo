import type { MusicScore } from "~/core/types";
import { modes } from "~/core/mode";

interface PlayerScoreMetaProps {
  score: MusicScore;
}

function PlayerScoreMeta({ score }: PlayerScoreMetaProps) {
  return (
    <div className="h-44 flex justify-evenly items-center font-mono text-[#495755]/75">
      <div>{modes.get(score.keysign).display}</div>
      <div>{score.timesign[0]} / {score.timesign[1]}</div>
      <div>♩ = {score.tempo}</div>
    </div>
  );
}

export default PlayerScoreMeta;
