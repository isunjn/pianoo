import { K_THEME } from "~/constants/storage-keys";

interface Theme {
  bg: string;
  text: string;
  hint: string;
  hover: string;
  active: string;
  correct: string;
  error: string;
}

const LIGHT: Theme = {
  bg: "240 240 240",
  text: "90 90 90",
  hint: "90 90 90",
  hover: "120 120 120 / .15",
  active: "120 120 120 / .15",
  correct: "90 90 90",
  error: "187 100 100",
};

const DARK: Theme = {
  bg: "30 30 30",
  text: "150 150 150",
  hint: "150 150 150",
  hover: "100 100 100 / .25",
  active: "100 100 100 / .3",
  correct: "150 150 150",
  error: "187 100 100",
};

const DESERT: Theme = {
  bg: "235 220 203",
  text: "162 92 92",
  hint: "162 92 92",
  hover: "162 92 92 / .15",
  active: "162 92 92 / .25",
  correct: "162 92 92",
  error: "242 77 77",
};

const LAVENDER: Theme = {
  bg: "173 166 194",
  text: "228 227 233",
  hint: "47 42 65 / .3",
  hover: "47 42 65 / .15",
  active: "47 42 65 / .25",
  correct: "228 227 233",
  error: "185 30 55",
};

const BOTANICAL: Theme = {
  bg: "123 156 152",
  text: "234 241 243",
  hint: "73 87 85 / .75",
  hover: "73 87 85 / .25",
  active: "73 87 85 / .25",
  correct: "206 229 208",
  error: "246 201 180",
};

const OCEAN: Theme = {
  bg: "196 221 255",
  text: "76 124 229",
  hint: "128 181 255",
  hover: "76 124 229 / .15",
  active: "76 124 229 / .25",
  correct: "76 124 229",
  error: "187 100 100",
};

const CANDY: Theme = {
  bg: "250 227 217",
  text: "138 198 209",
  hint: "255 182 185",
  hover: "138 198 209 / .15",
  active: "255 182 185 / .25",
  correct: "138 198 209",
  error: "186 26 30",
};

const DARLING: Theme = {
  bg: "254 200 205",
  text: "255 255 255",
  hint: "163 0 0 / .5",
  hover: "163 0 0 / .15",
  active: "163 0 0 / .25",
  correct: "255 255 255",
  error: "186 100 100",
};

const NORD: Theme = {
  bg: "59 66 82",
  text: "129 161 193",
  hint: "129 161 193",
  hover: "129 161 193 / .25",
  active: "129 161 193 / .25",
  correct: "216 222 233 / .25",
  error: "191 97 106",
};

const ARCTIC: Theme = {
  bg: "242 244 248",
  text: "129 161 193",
  hint: "94 129 172 / .75",
  hover: "129 161 193 / .15",
  active: "129 161 193 / .15",
  correct: "143 188 187",
  error: "191 97 106",
};

export type ThemeKind =
  | "Light"
  | "Dark"
  | "Desert"
  | "Lavender"
  | "Botanical"
  | "Ocean"
  | "Candy"
  | "Darling"
  | "Nord"
  | "Arctic";

const themes: Record<ThemeKind, Theme> = {
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

function setTheme(th: Theme) {
  const root = document.documentElement;
  root.style.setProperty("--th-bg", `rgba(${th.bg})`);
  root.style.setProperty("--th-text", `rgba(${th.text})`);
  root.style.setProperty("--th-hint", `rgba(${th.hint})`);
  root.style.setProperty("--th-hover", `rgba(${th.hover})`);
  root.style.setProperty("--th-active", `rgba(${th.active})`);
  root.style.setProperty("--th-correct", `rgba(${th.correct})`);
  root.style.setProperty("--th-error", `rgba(${th.error})`);
}

const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
const defaultTheme = preferDark.matches ? "Dark" : "Light";
const choosenTheme = localStorage.getItem(K_THEME) as ThemeKind | null;

export const initialTheme = choosenTheme ?? defaultTheme;
setTheme(themes[initialTheme]);

export const themeList = Object.keys(themes) as readonly ThemeKind[];

export function changeTheme(th: ThemeKind) {
  setTheme(themes[th]);
  localStorage.setItem(K_THEME, th);
}
