import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import player from "~/core/player";
import type { KeymapKind } from "~/config/keymap";

function PopupSettings() {
  const { keymap } = usePlayer();
  const dispatch = usePlayerDispatch();

  function handleKeymapChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newKeymap = e.target.value as KeymapKind;
    if (newKeymap != keymap) {
      const sheetItems = player.setKeymap(newKeymap);
      dispatch({ type: "set_keymap", keymap: newKeymap, sheetItems });
    }
  }

  return (
    <div className="absolute z-50 top-10 right-0 w-72 px-4 py-6 space-y-8
      backdrop-blur bg-[#495755]/20 text-[#eaf1f3] rounded shadow-lg">
      <div>
        <label htmlFor="keymap" className="w-full flex items-center justify-between">
          Keymap: 
          <select id="keymap" onChange={handleKeymapChange}
            value={keymap == "standard" ? "standard" : "virtualpiano"} 
            className="bg-[#495755]/20 rounded px-4 py-1.5">
            <option value="standard">Standard</option>
            <option value="virtualpiano">Virtual Piano</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default PopupSettings;
