export type LangKind = "en" | "zh-CN";

type LangName = string;

const langs: Record<LangKind, LangName> = {
  "en": "English",
  "zh-CN": "简体中文",
};

export const langList = Object.entries(langs) as readonly [
  LangKind,
  LangName
][];

export function getLangName(lang: LangKind): LangName {
  return langs[lang];
}
