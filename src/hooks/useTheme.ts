import { useState } from "react";
import type { ThemeKind } from "~/config/theme";

function useTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = prefersDark ? "dark" : "light";
  const choosenTheme = localStorage.getItem("theme") as ThemeKind | null;

  const [theme, setTheme] = useState<ThemeKind>(choosenTheme ?? defaultTheme);

  function changeTheme(theme: ThemeKind) {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }

  return { theme, changeTheme };
}

export default useTheme;
