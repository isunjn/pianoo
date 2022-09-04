interface Instrument {
  kind: string;
  notes: string[];
}

const INSTRUMENT_PIANO_ACOUSTIC: Instrument = {
  kind: "piano-acoustic",
  notes: [
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "D#2",
    "D#3",
    "D#4",
    "D#5",
    "D#6",
    "F#2",
    "F#3",
    "F#4",
    "F#5",
    "F#6",
  ],
};

const INSTRUMENT_PIANO_UPRIGHT: Instrument = {
  kind: "piano-upright",
  notes: [
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "D#2",
    "D#3",
    "D#4",
    "D#5",
    "D#6",
    "F#2",
    "F#3",
    "F#4",
    "F#5",
    "F#6",
  ],
};

const INSTRUMENT_GUITAR_ACOUSTIC: Instrument = {
  kind: "guitar-acoustic",
  notes: [
    "A2",
    "A3",
    "A4",
    "A#2",
    "A#3",
    "A#4",
    "B2",
    "B3",
    "B4",
    "C3",
    "C4",
    "C5",
    "C#3",
    "C#4",
    "C#5",
    "D2",
    "D3",
    "D4",
    "D5",
    "D#2",
    "D#3",
    "D#4",
    "E2",
    "E3",
    "E4",
    "F2",
    "F3",
    "F4",
    "F#2",
    "F#3",
    "F#4",
    "G2",
    "G3",
    "G4",
    "G#2",
    "G#3",
    "G#4",
  ],
};

const INSTRUMENT_GUITAR_ELECTRIC: Instrument = {
  kind: "guitar-electric",
  notes: [
    "A2",
    "A3",
    "A4",
    "A5",
    "C3",
    "C4",
    "C5",
    "C6",
    "C#2",
    "D#3",
    "D#4",
    "D#5",
    "E2",
    "F#2",
    "F#3",
    "F#4",
    "F#5",
  ],
};

const INSTRUMENT_BASS_ELECTRIC: Instrument = {
  kind: "bass-electric",
  notes: [
    "A#1",
    "A#2",
    "A#3",
    "A#4",
    "C#1",
    "C#2",
    "C#3",
    "C#4",
    "C#5",
    "E1",
    "E2",
    "E3",
    "E4",
    "G1",
    "G2",
    "G3",
    "G4",
  ],
};

const INSTRUMENT_HARP: Instrument = {
  kind: "harp",
  notes: [
    "A2",
    "A4",
    "A6",
    "B1",
    "B3",
    "B5",
    "B6",
    "C3",
    "C5",
    "D2",
    "D4",
    "D6",
    "D7",
    "E1",
    "E3",
    "E5",
    "F2",
    "F4",
    "F6",
    "F7",
    "G1",
    "G3",
    "G5",
  ],
};

const INSTRUMENT_CELLO: Instrument = {
  kind: "cello",
  notes: [
    "A2",
    "A3",
    "A4",
    "A#2",
    "A#3",
    "A#4",
    "B2",
    "B3",
    "B4",
    "C2",
    "C3",
    "C4",
    "C5",
    "C#3",
    "C#4",
    "D2",
    "D3",
    "D4",
    "D#2",
    "D#3",
    "D#4",
    "E2",
    "E3",
    "E4",
    "F2",
    "F3",
    "F4",
    "F#3",
    "F#4",
    "G2",
    "G3",
    "G#2",
    "G#3",
    "G#4",
  ],
};

const INSTRUMENT_VIOLIN: Instrument = {
  kind: "violin",
  notes: [
    "A3",
    "A4",
    "A5",
    "A6",
    "C4",
    "C5",
    "C6",
    "C7",
    "E4",
    "E5",
    "E6",
    "G3",
    "G4",
    "G5",
    "G6",
  ],
};

export type InstrumentKind =
  | "piano-acoustic"
  | "piano-upright"
  | "guitar-acoustic"
  | "guitar-electric"
  | "bass-electric"
  | "harp"
  | "cello"
  | "violin";

const instruments: Record<InstrumentKind, Instrument> = {
  "piano-acoustic": INSTRUMENT_PIANO_ACOUSTIC,
  "piano-upright": INSTRUMENT_PIANO_UPRIGHT,
  "guitar-acoustic": INSTRUMENT_GUITAR_ACOUSTIC,
  "guitar-electric": INSTRUMENT_GUITAR_ELECTRIC,
  "bass-electric": INSTRUMENT_BASS_ELECTRIC,
  "harp": INSTRUMENT_HARP,
  "cello": INSTRUMENT_CELLO,
  "violin": INSTRUMENT_VIOLIN,
};

export function getInstrumentUrls(instrumentKind: InstrumentKind) {
  const instrument = instruments[instrumentKind];
  const folder = instrument.kind;
  const noteUrlPairs = instrument.notes.map((note): [string, string] => [
    note,
    `${folder}/${note.replace("#", "s")}.mp3`,
  ]);
  return Object.fromEntries(noteUrlPairs);
}
