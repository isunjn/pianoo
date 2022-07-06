import type { MusicScore } from "~/core/types";

interface PlayerScoreMetaProps {
  score: MusicScore;
}

function PlayerScoreMeta({ score }: PlayerScoreMetaProps) {
  return (
    <div className="h-44 flex justify-evenly items-center font-mono text-[#495755]/75">
      <div>{score.keySignature}</div>
      <div>{score.timeSignature}</div>
      <div>♩ = {score.bpm}</div>
    </div>
  );
}

export default PlayerScoreMeta;
