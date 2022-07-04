import { createContext } from "react";
import * as Tone from "tone";

const InstrumentContext = createContext<Tone.Sampler | null>(null);

export default InstrumentContext;
