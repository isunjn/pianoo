export { INSTRUMENT_PIANO_ACOUSTIC } from "./piano-acoustic";
export { INSTRUMENT_PIANO_UPRIGHT } from "./piano-upright";
export { INSTRUMENT_GUITAR_ACOUSTIC } from "./guitar-acoustic";
export { INSTRUMENT_GUITAR_ELECTRIC } from "./guitar-electric";
export { INSTRUMENT_BASS_ELECTRIC } from "./bass-electric";
export { INSTRUMENT_HARP } from "./harp";
export { INSTRUMENT_CELLO } from "./cello";
export { INSTRUMENT_VIOLIN } from "./violin";

export type InstrumentKind =
  | "piano-acoustic"
  | "piano-upright"
  | "guitar-acoustic"
  | "guitar-electric"
  | "bass-electric"
  | "harp"
  | "cello"
  | "violin";
