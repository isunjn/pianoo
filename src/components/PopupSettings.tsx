import { useTranslation } from "react-i18next";
import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import pianoo from "~/core/pianoo";
import type { KeymapKind } from "~/config/keymap";
import React from "react";
import { InstrumentKind } from "~/config/instrument";

function PopupSettings() {
  const { keymap, instrument } = usePlayer();
  const dispatch = usePlayerDispatch();
  const { t } = useTranslation();

  function handleKeymapChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newKeymap = e.target.value as KeymapKind;
    if (newKeymap != keymap) {
      const sheetItems = pianoo.setKeymap(newKeymap);
      dispatch({ type: "set_keymap", keymap: newKeymap, sheetItems });
    }
  }

  function handleInstrumentChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newInstrument = e.target.value as InstrumentKind;
    if (newInstrument != instrument) {
      dispatch({ type: "start_to_load_instrument" });
      pianoo.setInstrument(newInstrument).then(() => {
        dispatch({ type: "set_instrument", instrument: newInstrument });
      });
    }
  }

  return (
    <div className="absolute z-50 top-10 right-0 w-80 px-4 py-6 space-y-8
      backdrop-blur bg-th-hover text-th-text rounded shadow-lg">
      
      <div>
        <label htmlFor="keymap" className="w-full flex items-center justify-between">
          {t("play.settings.keymap")}: 
          <select id="keymap" onChange={handleKeymapChange}
            value={keymap} 
            className="bg-th-hover rounded px-4 py-1.5">
            <option className="bg-th-hover text-th-text" value="standard">{t("play.keymap.standard")}</option>
            <option className="bg-th-hover text-th-text" value="virtualpiano">VirtualPiano</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="instrument" className="w-full flex items-center justify-between">
          {t("play.settings.instrument")}: 
          <select id="instrument" onChange={handleInstrumentChange}
            value={instrument}
            className="bg-th-hover rounded px-4 py-1.5">
            <option className="bg-th-hover text-th-text" value="piano-acoustic">{t("play.instrument.acousticPiano")}</option>
            <option className="bg-th-hover text-th-text" value="piano-upright">{t("play.instrument.uprightPiano")}</option>
            <option className="bg-th-hover text-th-text" value="guitar-acoustic">{t("play.instrument.acousticGuitar")}</option>
            <option className="bg-th-hover text-th-text" value="guitar-electric">{t("play.instrument.electricGuitar")}</option>
            <option className="bg-th-hover text-th-text" value="bass-electric">{t("play.instrument.electricBass")}</option>
            <option className="bg-th-hover text-th-text" value="harp">{t("play.instrument.harp")}</option>
            <option className="bg-th-hover text-th-text" value="cello">{t("play.instrument.cello")}</option>
            <option className="bg-th-hover text-th-text" value="violin">{t("play.instrument.violin")}</option>
          </select>
        </label>
      </div>
    
    </div>
  );
}

export default PopupSettings;
