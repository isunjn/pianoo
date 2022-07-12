import KEYMAP_STANDARD from "~/config/keymap/standard";
import KEYMAP_VIRTUALPIANO from "~/config/keymap/virtualpiano";
import type Keymap from "~/config/keymap/type";

interface PopupSettingsProps {
  keymap: Keymap;
  changeKeymap: (keymap: Keymap) => void;
}

function PopupSettings({ keymap, changeKeymap }: PopupSettingsProps) {
  return (
    <div className="absolute z-50 top-10 right-0 w-72 px-4 py-6 space-y-8
      backdrop-blur bg-[#495755]/20 text-[#eaf1f3] rounded shadow-lg">

      <div>
        <label htmlFor="keymap" className="w-full flex items-center justify-between">
          Keymap: 
          <select id="keymap" value={keymap == KEYMAP_STANDARD ? "Standard" : "Virtual Piano"} 
            onChange={(e) => changeKeymap(e.target.value == "Standard" ? KEYMAP_STANDARD : KEYMAP_VIRTUALPIANO)}
            className="bg-[#495755]/20 rounded px-4 py-1.5">
            <option value="Standard">Standard</option>
            <option value="Virtual Piano">Virtual Piano</option>
          </select>
        </label>
      </div>
    
    </div>
  );
}

export default PopupSettings;
