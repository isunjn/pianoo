import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import player from "~/core/player";
import type { KeymapKind } from "~/config/keymap";
import React from "react";
import { InstrumentKind } from "~/config/instrument";
import { K_INSTRUMENT, K_KEYMAP } from "~/constant/storage-keys";

function PopupSettings() {
  const { keymap, instrument } = usePlayer();
  const dispatch = usePlayerDispatch();
  const { t } = useTranslation();
  const [loadingInstrument, setLoadingInstrument] = useState(false);

  function handleKeymapChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newKeymap = e.target.value as KeymapKind;
    if (newKeymap != keymap) {
      localStorage.setItem(K_KEYMAP, newKeymap);
      const sheetItems = player.setKeymap(newKeymap);
      dispatch({ type: "set_keymap", keymap: newKeymap, sheetItems });
    }
  }

  function handleInstrumentChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newInstrument = e.target.value as InstrumentKind;
    if (newInstrument != instrument) {
      localStorage.setItem(K_INSTRUMENT, newInstrument);
      setLoadingInstrument(true);
      player.setInstrument(newInstrument).then(() => {
        dispatch({ type: "set_instrument", instrument: newInstrument });
        setLoadingInstrument(false);
      });
    }
  }

  return (
    <div className="absolute z-50 top-10 right-0 w-80 px-4 py-6 space-y-8
      backdrop-blur bg-theme-hover text-theme-text rounded shadow-lg">
      
      <div>
        <label htmlFor="keymap" className="w-full flex items-center justify-between">
          {t("play.settings.keymap")}: 
          <select id="keymap" onChange={handleKeymapChange}
            value={keymap} 
            className="bg-theme-hover rounded px-4 py-1.5">
            <option className="bg-theme-hover text-theme-text" value="standard">{t("play.keymap.standard")}</option>
            <option className="bg-theme-hover text-theme-text" value="virtualpiano">VirtualPiano</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="instrument" className="w-full flex items-center justify-between">
          {t("play.settings.instrument")}: 
          {loadingInstrument ? <div>{t("loading")}</div> :
            <select id="instrument" onChange={handleInstrumentChange}
              value={instrument}
              className="bg-theme-hover rounded px-4 py-1.5">
              <option className="bg-theme-hover text-theme-text" value="piano-acoustic">{t("play.instrument.acousticPiano")}</option>
              <option className="bg-theme-hover text-theme-text" value="piano-upright">{t("play.instrument.uprightPiano")}</option>
              <option className="bg-theme-hover text-theme-text" value="guitar-acoustic">{t("play.instrument.acousticGuitar")}</option>
              <option className="bg-theme-hover text-theme-text" value="guitar-electric">{t("play.instrument.electricGuitar")}</option>
              <option className="bg-theme-hover text-theme-text" value="bass-electric">{t("play.instrument.electricBass")}</option>
              <option className="bg-theme-hover text-theme-text" value="harp">{t("play.instrument.harp")}</option>
              <option className="bg-theme-hover text-theme-text" value="cello">{t("play.instrument.cello")}</option>
              <option className="bg-theme-hover text-theme-text" value="violin">{t("play.instrument.violin")}</option>
            </select>}
        </label>
      </div>
    
    </div>
  );
}

export default PopupSettings;
