import { usePlayer } from "~/contexts/PlayerContext";
import panic from "~/utils/panic";

function PlayerScoreMeta() {
  const { score, tonality, tempo } = usePlayer();

  if (!score) throw panic("score is null");

  return (
    <div className="h-24 px-4 flex justify-between items-center font-mono text-th-hint zen-hoverable">
      <div>
        {
          tonality == score.tonality ? score.tonality :
          <>
            <span className="line-through mr-8">{score.tonality}</span>
            <span>{tonality}</span>
          </>
        }
      </div>
      <div>{score.timesign[0]} / {score.timesign[1]}</div>
      <div>
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
