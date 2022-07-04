import { createContext } from "react";
import KEYMAP_STANDARD from "~/config/keymap/standard";
import type Keymap  from "~/config/keymap/type";

const KeymapContext = createContext<Keymap>(KEYMAP_STANDARD);

export default KeymapContext;
