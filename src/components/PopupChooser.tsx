import { MusicScore } from "~/core/types";
import * as examples from "~/examples";
import tonalityMap from "~/core/tonality";

interface PopupChooserProps {
  changeScore: (score: MusicScore) => void;
}

function PopupChooser({ changeScore }: PopupChooserProps) {
  return (
    <div className="absolute z-50 top-10 right-0 w-full max-h-full p-4 overflow-y-scroll
      text-[#eaf1f3] bg-[#495755]/20 backdrop-blur-lg rounded shadow-lg" >
      <div className="flex gap-4 mb-4">
        {/* TODO */}
        <div className="px-4 py-1.5 bg-[#eaf1f3]/75 text-[#7b9c98] flex-1 text-center rounded">Example Scores</div>
        <div className="px-4 py-1.5 bg-[#495755]/20 flex-1 text-center rounded">Recently Played</div>
        <div className="px-4 py-1.5 bg-[#495755]/20 flex-1 text-center rounded">Just Play</div>
        <div className="px-4 py-1.5 bg-[#495755]/20 flex-1 text-center rounded">From File</div>
      </div>
      {
        Object.values(examples).map(score => (
          <div key={score.id} className="px-4 py-1.5 hover:bg-[#495755]/20 rounded cursor-pointer flex"
            onClick={() => changeScore(score as MusicScore)}>
            <span className="flex-[5]">{score.name}</span>
            <span className="flex-1">{tonalityMap.get((score as MusicScore).tonality)?.display}</span>
            <span className="flex-1">{score.timesign[0]} / {score.timesign[1]}</span>
            <span className="flex-1">♩ = {score.tempo}</span>
          </div>
        ))
      }
    </div>
  )
}

export default PopupChooser;
