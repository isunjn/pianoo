import { K_THEME } from "~/constants/storage-keys";
import themes from "./themes";

export type ThemeKind = keyof typeof themes;

export interface Theme {
  bg: string;
  text: string;
  hint: string;
  hover: string;
  active: string;
  correct: string;
  error: string;
}

function setTheme(th: Theme) {
  const root = document.documentElement;
  root.style.setProperty("--th-bg", th.bg);
  root.style.setProperty("--th-text", th.text);
  root.style.setProperty("--th-hint", th.hint);
  root.style.setProperty("--th-hover", th.hover);
  root.style.setProperty("--th-active", th.active);
  root.style.setProperty("--th-correct", th.correct);
  root.style.setProperty("--th-error", th.error);
}

const appTheme = {
  initial: "Light" as ThemeKind,
  list: Object.keys(themes) as ThemeKind[],

  init(): ThemeKind {
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const defaultTheme = preferDark ? "Dark" : "Light";
    const choosenTheme = localStorage.getItem(K_THEME) as ThemeKind | null;
    const th = choosenTheme ?? defaultTheme;
    appTheme.initial = th;
    setTheme(themes[th]);
    return th;
  },

  changeTheme(th: ThemeKind) {
    setTheme(themes[th]);
    localStorage.setItem(K_THEME, th);
  }
}

export default appTheme;
