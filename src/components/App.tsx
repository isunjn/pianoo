import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import * as Tone from "tone";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import INSTRUMENT_PIANO_ACOUSTIC from "~/config/instrument/piano-acoustic";

interface InstrumentContext {
  instrument: Tone.Sampler | null;
  changeInstrument: (newInstrument: string) => void;
}

export function useInstrument() {
  return useOutletContext<InstrumentContext>();
}

function App() {
  const [instrument, setInstrument] = useState<Tone.Sampler | null>(null);

  useEffect(() => {
    const instrument = new Tone.Sampler({
      urls: INSTRUMENT_PIANO_ACOUSTIC,
      onload: () => setInstrument(instrument),
    }).toDestination();
  }, []);

  function handleInstrumentChange(instrument: string) {
    // const set = (urls: Record<string, string>) => {
    //   const instrument: Tone.Sampler = new Tone.Sampler({
    //     urls: urls,
    //     onload: () => setInstrument(instrument),
    //   }).toDestination();
    // }

    // switch(instrument) {
    //   case "piano-acoustic": import("~/config/instrument/piano-acoustic").then(mod => set(mod.default)); break;
    //   // TODO: add more instruments
    // }
  }

  return (
    <div className="m-auto px-4 py-6 max-w-5xl h-screen flex flex-col justify-between text-[#eaf1f3]">
      <Header />
      <main className="w-full">
        <Outlet context={{
          instrument,
          changeInstrument: handleInstrumentChange,
        }} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
