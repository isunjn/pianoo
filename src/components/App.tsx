import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import * as Tone from "tone";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import InstrumentContext from "~/contexts/instrument";
import KeymapContext from "~/contexts/keymap";
import type Keymap from "~/config/keymap/type";
import KEYMAP_STANDARD from "~/config/keymap/standard";
import INSTRUMENT_PIANO_ACOUSTIC from "~/config/instrument/piano-acoustic";
 
function App() {
  const [keymap, setKeymap] = useState<Keymap>(KEYMAP_STANDARD);
  const [instrument, setInstrument] = useState<Tone.Sampler | null>(null);

  useEffect(() => {
    const instrument = new Tone.Sampler({
      urls: INSTRUMENT_PIANO_ACOUSTIC,
      onload: () => setInstrument(instrument),
    }).toDestination();
  }, []);

/*   function handleInstrumentChange(instrument: string) {
    const set = (urls: Record<string, string>) => {
      const instrument: Tone.Sampler = new Tone.Sampler({
        urls: urls,
        onload: () => setInstrument(instrument),
      }).toDestination();
    }

    switch(instrument) {
      case "piano-acoustic": import("~/config/instrument/piano-acoustic").then(mod => set(mod.default)); break;
      // TODO: add more instruments
    }
  }

  function handleKeymapChange(keymap: string) {
    switch(keymap) {
      case "standard": import("~/config/keymap/standard").then(mod => setKeymap(mod.default)); break;
      // TODO: add more keymaps
    }
  } */

  return (
    <div className="m-auto px-4 py-6 max-w-5xl h-screen flex flex-col justify-between text-[#eaf1f3]">
      <Header />
      <main className="w-full">
        <InstrumentContext.Provider value={instrument}>
          <KeymapContext.Provider value={keymap}>
            <Outlet />
          </KeymapContext.Provider>
        </InstrumentContext.Provider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
