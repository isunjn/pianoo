import React, { useState } from "react";
import { TbCircleCheck, TbCircle } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import usePlayerStore from "~/store/usePlayerStore";
import pianoo from "~/core/pianoo";
import type { KeymapKind } from "~/config/keymap";
import { InstrumentKind } from "~/config/instrument";

function PopupSettings() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"Instrument" | "Keymap">("Keymap");

  return (
    <div
      className="absolute z-50 top-10 right-0 w-full h-full px-4
        bg-th-hover text-th-text backdrop-blur-lg rounded shadow-lg"
    >
      <div className="h-[12.5%] flex items-center gap-4">
        <TabBtn
          isActive={tab == "Keymap"}
          text={t("play.settings.keymap")}
          onClick={() => setTab("Keymap")}
        />
        <TabBtn
          isActive={tab == "Instrument"}
          text={t("play.settings.instrument")}
          onClick={() => setTab("Instrument")}
        />
      </div>

      <div className="h-[87.5%] overflow-y-auto">
        {tab == "Instrument" && <TabInstrument />}
        {tab == "Keymap" && <TabKeymap />}
      </div>
    </div>
  );
}

interface TabBtnProps {
  isActive: boolean;
  text: string;
  onClick: () => void;
}

function TabBtn({ isActive, text, onClick }: TabBtnProps) {
  const colorCls = isActive ? "bg-th-text text-th-bg" : "bg-th-hover";

  return (
    <button
      onClick={onClick}
      className={`${colorCls} px-4 py-1.5 flex-1 text-center rounded`}
    >
      {text}
    </button>
  );
}

interface SelectBtnProps {
  selected: boolean;
  text: string;
  onClick: () => void;
}

function SelectBtn({ selected, text, onClick }: SelectBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex justify-center items-center gap-4 px-4 py-1
        rounded border-2 bg-th-hover ${selected ? "border-th-text" :
        "border-th-hover group"}`}
    >
      {selected ? (
        <TbCircleCheck className="text-xl" />
      ) : (
        <TbCircle className="text-xl text-th-hover group-hover:text-th-text" />
      )}
      <div className="flex-1 whitespace-nowrap">{text}</div>
    </button>
  );
}

function TabKeymap() {
  const { t } = useTranslation();
  const keymap = usePlayerStore(state => state.keymap);
  const setKeymap = usePlayerStore(state => state.setKeymap);

  function changeKeymap(newKeymap: KeymapKind) {
    if (newKeymap != keymap) {
      const sheetItems = pianoo.setKeymap(newKeymap);
      setKeymap(newKeymap, sheetItems);
    }
  }

  return (<>
    <div className="flex justify-between py-4">
      <div className="flex gap-4">
        <SelectBtn
          selected={keymap == "standard"}
          text={t("play.keymap.standard")}
          onClick={() => changeKeymap("standard")}
        />
        <SelectBtn
          selected={keymap == "virtualpiano"}
          text="Virtual Piano"
          onClick={() => changeKeymap("virtualpiano")}
        />
      </div>
      <div>
        {/* TODO */}
        tonality
      </div>
    </div>
    <div>
      {/* TODO */}
    </div>
  </>);
}

function TabInstrument() {
  const { t } = useTranslation();
  const instrument = usePlayerStore(state => state.instrument);
  const setInstrument = usePlayerStore(state => state.setInstrument);
  const setStatus = usePlayerStore(state => state.setStatus);

  function changeInstrument(newInstrument: InstrumentKind) {
    if (newInstrument != instrument) {
      setStatus("loading");
      pianoo.setInstrument(newInstrument).then(() => {
        setInstrument(newInstrument);
      });
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SelectBtn
          selected={instrument == "piano-acoustic"}
          text={t("play.instrument.acousticPiano")}
          onClick={() => changeInstrument("piano-acoustic")}
        />
        <SelectBtn
          selected={instrument == "piano-upright"}
          text={t("play.instrument.uprightPiano")}
          onClick={() => changeInstrument("piano-upright")}
        />
        <SelectBtn
          selected={instrument == "guitar-acoustic"}
          text={t("play.instrument.acousticGuitar")}
          onClick={() => changeInstrument("guitar-acoustic")}
        />
        <SelectBtn
          selected={instrument == "guitar-electric"}
          text={t("play.instrument.electricGuitar")}
          onClick={() => changeInstrument("guitar-electric")}
        />
        <SelectBtn
          selected={instrument == "bass-electric"}
          text={t("play.instrument.electricBass")}
          onClick={() => changeInstrument("bass-electric")}
        />
        <SelectBtn
          selected={instrument == "harp"}
          text={t("play.instrument.harp")}
          onClick={() => changeInstrument("harp")}
        />
        <SelectBtn
          selected={instrument == "violin"}
          text={t("play.instrument.violin")}
          onClick={() => changeInstrument("violin")}
        />
        <SelectBtn
          selected={instrument == "cello"}
          text={t("play.instrument.cello")}
          onClick={() => changeInstrument("cello")}
        />
      </div>
    </div>
  );
}

export default PopupSettings;
