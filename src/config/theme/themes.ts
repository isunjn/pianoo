import type { Theme } from "~/config/theme";

const LIGHT: Theme = {
  bg: "rgba(240 240 240)",
  text: "rgba(90 90 90)",
  hint: "rgba(90 90 90)",
  hover: "rgba(120 120 120 / .15)",
  active: "rgba(120 120 120 / .15)",
  correct: "rgba(90 90 90)",
  error: "rgba(187 100 100)",
};

const DARK: Theme = {
  bg: "rgba(30 30 30)",
  text: "rgba(150 150 150)",
  hint: "rgba(150 150 150)",
  hover: "rgba(100 100 100 / .25)",
  active: "rgba(100 100 100 / .3)",
  correct: "rgba(150 150 150)",
  error: "rgba(187 100 100)",
};

const DESERT: Theme = {
  bg: "rgba(235 220 203)",
  text: "rgba(162 92 92)",
  hint: "rgba(162 92 92)",
  hover: "rgba(162 92 92 / .15)",
  active: "rgba(162 92 92 / .25)",
  correct: "rgba(162 92 92)",
  error: "rgba(242 77 77)",
};

const LAVENDER: Theme = {
  bg: "rgba(173 166 194)",
  text: "rgba(228 227 233)",
  hint: "rgba(47 42 65 / .3)",
  hover: "rgba(47 42 65 / .15)",
  active: "rgba(47 42 65 / .25)",
  correct: "rgba(228 227 233)",
  error: "rgba(185 30 55)",
};

const BOTANICAL: Theme = {
  bg: "rgba(123 156 152)",
  text: "rgba(234 241 243)",
  hint: "rgba(73 87 85 / .75)",
  hover: "rgba(73 87 85 / .25)",
  active: "rgba(73 87 85 / .25)",
  correct: "rgba(206 229 208)",
  error: "rgba(246 201 180)",
};

const OCEAN: Theme = {
  bg: "rgba(196 221 255)",
  text: "rgba(76 124 229)",
  hint: "rgba(128 181 255)",
  hover: "rgba(76 124 229 / .15)",
  active: "rgba(76 124 229 / .25)",
  correct: "rgba(76 124 229)",
  error: "rgba(187 100 100)",
};

const CANDY: Theme = {
  bg: "rgba(250 227 217)",
  text: "rgba(138 198 209)",
  hint: "rgba(255 182 185)",
  hover: "rgba(138 198 209 / .15)",
  active: "rgba(255 182 185 / .25)",
  correct: "rgba(138 198 209)",
  error: "rgba(186 26 30)",
};

const DARLING: Theme = {
  bg: "rgba(254 200 205)",
  text: "rgba(255 255 255)",
  hint: "rgba(163 0 0 / .5)",
  hover: "rgba(163 0 0 / .15)",
  active: "rgba(163 0 0 / .25)",
  correct: "rgba(255 255 255)",
  error: "rgba(186 100 100)",
};

const NORD: Theme = {
  bg: "rgba(59 66 82)",
  text: "rgba(129 161 193)",
  hint: "rgba(129 161 193)",
  hover: "rgba(129 161 193 / .25)",
  active: "rgba(129 161 193 / .25)",
  correct: "rgba(216 222 233 / .25)",
  error: "rgba(191 97 106)",
};

const ARCTIC: Theme = {
  bg: "rgba(242 244 248)",
  text: "rgba(129 161 193)",
  hint: "rgba(94 129 172 / .75)",
  hover: "rgba(129 161 193 / .15)",
  active: "rgba(129 161 193 / .15)",
  correct: "rgba(143 188 187)",
  error: "rgba(191 97 106)",
};

const themes = {
  "Light": LIGHT,
  "Dark": DARK,
  "Desert": DESERT,
  "Lavender": LAVENDER,
  "Botanical": BOTANICAL,
  "Ocean": OCEAN,
  "Candy": CANDY,
  "Darling": DARLING,
  "Nord": NORD,
  "Arctic": ARCTIC,
};

export default themes;
