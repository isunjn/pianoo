import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import player from "~/core/player";
import type { KeymapKind } from "~/config/keymap";
import React from "react";
import { InstrumentKind } from "~/config/instrument";

function PopupSettings() {
  const { keymap, instrument } = usePlayer();
  const dispatch = usePlayerDispatch();

  function handleKeymapChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newKeymap = e.target.value as KeymapKind;
    if (newKeymap != keymap) {
      const sheetItems = player.setKeymap(newKeymap);
      dispatch({ type: "set_keymap", keymap: newKeymap, sheetItems });
    }
  }

  function handleInstrumentChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newInstrument = e.target.value as InstrumentKind;
    if (newInstrument != instrument) {
      player.setInstrument(newInstrument).then(() => {
        // TODO: loading indicator
        dispatch({ type: "set_instrument", instrument: newInstrument });
      });
    }
  }

  return (
    <div className="absolute z-50 top-10 right-0 w-80 px-4 py-6 space-y-8
      backdrop-blur bg-[#495755]/20 text-[#eaf1f3] rounded shadow-lg">
      
      <div>
        <label htmlFor="keymap" className="w-full flex items-center justify-between">
          Keymap: 
          <select id="keymap" onChange={handleKeymapChange}
            value={keymap} 
            className="bg-[#495755]/20 rounded px-4 py-1.5">
            <option value="standard">Standard</option>
            <option value="virtualpiano">Virtual Piano</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="instrument" className="w-full flex items-center justify-between">
          Instrument: 
          <select id="instrument" onChange={handleInstrumentChange}
            value={instrument}
            className="bg-[#495755]/20 rounded px-4 py-1.5">
            <option value="piano-acoustic">Acoustic Piano</option>
            <option value="piano-upright">Upright Piano</option>
            <option value="guitar-acoustic">Acoustic Guitar</option>
            <option value="guitar-electric">Electric Guitar</option>
            <option value="bass-electric">Electric Bass</option>
            <option value="harp">Harp</option>
            <option value="cello">Cello</option>
            <option value="violin">Violin</option>
          </select>
        </label>
      </div>
    
    </div>
  );
}

export default PopupSettings;
