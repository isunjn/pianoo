import "react-i18next";
import ns from "../public/locales/en/translation.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "ns";
    resources: {
      ns: typeof ns;
    };
  }
}
