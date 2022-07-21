import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import player from "~/core/player";
import tonalities from "~/core/tonality";
import type { TonalityKind } from "~/core/tonality";

function PopupAdjustments() {
  const { volume, tempo, tonality } = usePlayer();
  const dispatch = usePlayerDispatch();

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const volume = parseInt(e.target.value);
    player.setVolume(volume);
    dispatch({ type: "set_volume", volume });
  }

  function handleTempoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const tempo = parseInt(e.target.value);
    player.setTempo(tempo);
    dispatch({ type: "set_tempo", tempo });
  }

  function handleTonalityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const tonality = e.target.value as TonalityKind;
    const sheetItems = player.transpose(tonality);
    dispatch({ type: "set_tonality", tonality, sheetItems });
  }

  // TODO: use custom component
  return (
    <div className="absolute z-50 top-10 right-0 w-72 px-4 py-6 space-y-8 
      backdrop-blur bg-[#495755]/20 text-[#eaf1f3] rounded shadow-lg">
    
      <div>
        <label htmlFor="volume" className="w-full flex items-center justify-between">
          Volume: <div>{volume} %</div>
        </label>
        <input type="range" id="volume" min="0" max="100" className="w-full"
          value={volume} onChange={handleVolumeChange}/>
      </div>

      <div>
        <label htmlFor="tempo" className="w-full flex items-center justify-between">
          Tempo: <div>{tempo} BPM</div>
        </label>
        <input type="range" id="tempo" min="40" max="220" className="w-full"
          value={tempo} onChange={handleTempoChange}/>
      </div>
      
      <div>
        <label htmlFor="tonality" className="w-full flex items-center justify-between">
          Tonality: 
          <select id="tonality" value={tonality} 
            onChange={handleTonalityChange}
            className="bg-[#495755]/20 rounded px-4 py-1.5">
            {tonalities.kinds().map(kind => 
              <option key={kind} value={kind} className="bg-[#495755]/25">
                {kind}
              </option>)
            }
          </select>
        </label>
      </div>
    
    </div>
  );
}

export default PopupAdjustments;
