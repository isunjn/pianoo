export type LangKind = "en" | "zh-CN";

export const langs = new Map<LangKind, string>()
  .set("en", "English")
  .set("zh-CN", "简体中文");
