import type { MusicScore, TonalityKind } from "~/core/types";
import tonalityMap from "~/core/tonality";

interface PlayerScoreMetaProps {
  score: MusicScore;
  tempo: number;
  tonality: TonalityKind;
}

function PlayerScoreMeta({ score, tempo, tonality }: PlayerScoreMetaProps) {
  return (
    <div className="h-44 flex items-center font-mono text-[#495755]/75 zen-hoverable">
      <div className="flex-1 text-center">
        {
          tonality == score.tonality ? tonalityMap.get(score.tonality)!.display :
          <>
            <span className="line-through mr-8">{tonalityMap.get(score.tonality)!.display}</span>
            <span>{tonalityMap.get(tonality)!.display}</span>
          </>
        }
      </div>
      <div className="flex-1 text-center">{score.timesign[0]} / {score.timesign[1]}</div>
      <div className="flex-1 text-center">
        {
          tempo == score.tempo ? `♩ = ${score.tempo}` :
          <>
            <span className="line-through mr-8">♩ = {score.tempo}</span>
            <span>♩ = {tempo}</span>
          </>
        }
      </div>
    </div>
  );
}

export default PlayerScoreMeta;
