import { useTranslation } from "react-i18next";
import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import pianoo from "~/core/pianoo";
import tonalities from "~/core/tonality";
import type { TonalityKind } from "~/core/tonality";

function PopupAdjustments() {
  const { volume, tempo, tonality } = usePlayer();
  const dispatch = usePlayerDispatch();
  const { t } = useTranslation();

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const volume = parseInt(e.target.value);
    pianoo.setVolume(volume);
    dispatch({ type: "set_volume", volume });
  }

  function handleTempoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const tempo = parseInt(e.target.value);
    pianoo.setTempo(tempo);
    dispatch({ type: "set_tempo", tempo });
  }

  function handleTonalityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const tonality = e.target.value as TonalityKind;
    const sheetItems = pianoo.transpose(tonality);
    dispatch({ type: "set_tonality", tonality, sheetItems });
  }

  // TODO: use custom component
  return (
    <div
      className="absolute z-50 top-10 right-0 w-80 px-4 py-6 space-y-8 
      backdrop-blur bg-th-hover text-th-text rounded shadow-lg"
    >
      <div>
        <label
          htmlFor="volume"
          className="w-full flex items-center justify-between"
        >
          {t("play.adjust.volume")}: <div>{volume} %</div>
        </label>
        <input
          type="range"
          id="volume"
          min="0"
          max="100"
          className="w-full"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>

      <div>
        <label
          htmlFor="tempo"
          className="w-full flex items-center justify-between"
        >
          {t("play.adjust.tempo")}: <div>{tempo} BPM</div>
        </label>
        <input
          type="range"
          id="tempo"
          min="40"
          max="220"
          className="w-full"
          value={tempo}
          onChange={handleTempoChange}
        />
      </div>

      <div>
        <label
          htmlFor="tonality"
          className="w-full flex items-center justify-between"
        >
          {t("play.adjust.tonality")}:
          <select
            id="tonality"
            value={tonality}
            onChange={handleTonalityChange}
            className="bg-th-hover rounded px-4 py-1.5"
          >
            {tonalities.kinds().map(kind => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default PopupAdjustments;
