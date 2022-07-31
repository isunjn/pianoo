import { usePlayer } from "~/contexts/PlayerContext";
import panic from "~/utils/panic";

function PlayerScoreMeta() {
  const { score, tonality, tempo } = usePlayer();

  if (!score) throw panic("score is null");

  return (
    <div className="h-20 px-2 flex justify-between items-center font-mono text-th-hint zen-hoverable">
      <div className="flex-1 text-left">
        {tonality == score.tonality ? (
          score.tonality
        ) : (
          <>
            <span className="line-through mr-8">{score.tonality}</span>
            <span>{tonality}</span>
          </>
        )}
      </div>
      <div className="flex-1 text-center">
        {score.timesign[0]} / {score.timesign[1]}
      </div>
      <div className="flex-1 text-right">
        {tempo == score.tempo ? (
          `♩ = ${score.tempo}`
        ) : (
          <>
            <span className="line-through mr-8">♩ = {score.tempo}</span>
            <span>♩ = {tempo}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerScoreMeta;
