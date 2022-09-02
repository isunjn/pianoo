import { useTranslation } from "react-i18next";
import usePlayerStore from "~/store/usePlayerStore";
import pianoo from "~/core/pianoo";
import { tonalityList, type TonalityKind } from "~/core/tonality";

function PopupAdjustments() {
  const status = usePlayerStore(state => state.status);
  const volume = usePlayerStore(state => state.volume);
  const setVolume = usePlayerStore(state => state.setVolume);
  const tempo = usePlayerStore(state => state.tempo);
  const setTempo = usePlayerStore(state => state.setTempo);
  const tonality = usePlayerStore(state => state.tonality);
  const setTonality = usePlayerStore(state => state.setTonality);

  const { t } = useTranslation();

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const volume = parseInt(e.target.value);
    pianoo.setVolume(volume);
    setVolume(volume);
  }

  function handleTempoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const tempo = parseInt(e.target.value);
    pianoo.setTempo(tempo);
    setTempo(tempo);
  }

  function handleTonalityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const tonality = e.target.value as TonalityKind;
    const sheetItems = pianoo.transpose(tonality);
    setTonality(tonality, sheetItems);
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

      {status != "justplaying" && (
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
      )}

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
            className="bg-th-hover rounded px-4 py-1.5 outline-none"
          >
            {tonalityList.map(tonalityKind => (
              <option key={tonalityKind} value={tonalityKind}>
                {tonalityKind}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default PopupAdjustments;
