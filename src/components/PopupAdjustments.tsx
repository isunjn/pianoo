import type { TonalityKind } from "~/core/types";
import tonalityMap from "~/core/tonality";

interface PopupAdjustmentsProps {
  volume: number;
  tempo: number;
  tonality: TonalityKind;
  changeVolume: (volume: number) => void;
  changeTempo: (tempo: number) => void;
  changeTonality: (tonality: TonalityKind) => void;
}

function PopupAdjustments(props: PopupAdjustmentsProps) {
  const { 
    volume,
    tempo,
    tonality,
    changeVolume,
    changeTempo,
    changeTonality
  } = props;

  // TODO: use custom component
  return (
    <div className="absolute z-50 top-10 right-0 w-72 px-4 py-6 space-y-8 
      backdrop-blur bg-[#495755]/20 text-[#eaf1f3] rounded shadow-lg">
    
      <div>
        <label htmlFor="volume" className="w-full flex items-center justify-between">
          Volume: <div>{volume} %</div>
        </label>
        <input type="range" id="volume" min="0" max="100" className="w-full"
          value={volume} onChange={(e) => changeVolume(Number(e.target.value))}/>
      </div>

      <div>
        <label htmlFor="tempo" className="w-full flex items-center justify-between">
          Tempo: <div>{tempo} BPM</div>
        </label>
        <input type="range" id="tempo" min="40" max="220" className="w-full"
          value={tempo} onChange={(e) => changeTempo(Number(e.target.value))}/>
      </div>
      
      <div>
        <label htmlFor="tonality" className="w-full flex items-center justify-between">
          Tonality: 
          <select id="tonality" value={tonality} 
            onChange={(e) => changeTonality(e.target.value as TonalityKind)}
            className="bg-[#495755]/20 rounded px-4 py-1.5">
            {[...tonalityMap.entries()].map(([kind, tonality]) => 
              <option key={kind} value={kind}>{tonality.display}</option>)}
          </select>
        </label>
      </div>
    
    </div>
  );
}

export default PopupAdjustments;
