export type ThemeKind = 
  | "light"
  | "dark"
  | "desert"
  | "lavender"
  | "strawberry"
  | "nord"
  | "nord-light"
  | "botanical";

export const themes = new Map<ThemeKind, string>()
  .set("light", "Light")
  .set("dark", "Dark")
  .set("desert", "Desert")
  .set("lavender", "Lavender")
  .set("strawberry", "Strawberry")
  .set("nord", "Nord")
  .set("nord-light", "Nord Light")
  .set("botanical", "Botanical");
