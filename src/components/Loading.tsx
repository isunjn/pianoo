import { useTranslation } from "react-i18next";

function Loading() {
  const { t } = useTranslation();

  return (
    <div className="w-fit fixed top-1/2 left-1/2
      -translate-x-1/2 -translate-y-1/2 animate-pulse">
      <div className="inline-block mr-4 animate-bounce">𝄞</div>
      {t("loading")}
    </div>
  );
}

export default Loading;
