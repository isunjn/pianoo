import { usePlayer } from "~/contexts/PlayerContext";

function PlayerScoreMeta() {
  const { score, tonality, tempo } = usePlayer();

  return (
    <div className="h-40 flex items-center font-mono text-theme-hint zen-hoverable">
      <div className="flex-1 text-center">
        {
          tonality == score.tonality ? score.tonality :
          <>
            <span className="line-through mr-8">{score.tonality}</span>
            <span>{tonality}</span>
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
