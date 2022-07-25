import { useTranslation } from "react-i18next";

function Loading() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse">
        <div className="inline-block mr-4 animate-bounce">𝄞</div>
        {t("loading")}
      </div>
    </div>
  );
}

export default Loading;
