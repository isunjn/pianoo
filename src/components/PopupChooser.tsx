import { useTranslation } from "react-i18next";
import usePlayerStore from "~/store/usePlayerStore";
import Loading from "~/components/Loading";
import Error from "~/components/Error";
import parse, { type MusicScore } from "~/core/parser";
import pianoo from "~/core/pianoo";
import { useExampleScores } from "~/hooks/useExampleScore";
import range from "~/utils/range";
import panic from "~/utils/panic";

function PopupChooser() {
  const currentScore = usePlayerStore(state => state.score);
  const setScore = usePlayerStore(state => state.setScore);
  const { scores, isLoading, isError } = useExampleScores(range(1, 20));
  const { t } = useTranslation();

  function handleSetScore(newScore: MusicScore) {
    if (newScore.id != currentScore!.id) {
      const [newParsedScore, syntaxErrors] = parse(newScore);
      if (syntaxErrors) panic("syntax error occurred");
      const sheetItems = pianoo.prepare(newParsedScore!);
      setScore(newParsedScore!, sheetItems);
    }
  }

  return (
    <div
      className="absolute z-50 top-10 right-0 w-full h-full p-4 overflow-y-scroll
      bg-th-hover text-th-text backdrop-blur-lg rounded shadow-lg"
    >
      {/* <div className="flex gap-4 mb-4">
        <div className="px-4 py-1.5 bg-th-text text-th-bg flex-1 text-center rounded">{t("play.tab.exampleScores")}</div>
        <div className="px-4 py-1.5 bg-th-hover flex-1 text-center rounded">{t("play.tab.recentlyPlayed")}</div>
        <div className="px-4 py-1.5 bg-th-hover flex-1 text-center rounded">{t("play.tab.justPlay")}</div>
        <div className="px-4 py-1.5 bg-th-hover flex-1 text-center rounded">{t("play.tab.fromFile")}</div>
      </div> */}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error msg={t("error.crash")} />
      ) : (
        scores!.map(score => (
          <div
            key={score.id}
            className="px-4 py-1.5 hover:bg-th-hover rounded cursor-pointer flex"
            onClick={() => handleSetScore(score)}
          >
            <span className="flex-[5]">{score.name}</span>
            <span className="flex-1">{score.tonality}</span>
            <span className="flex-1">
              {score.timesign[0]} / {score.timesign[1]}
            </span>
            <span className="flex-1">♩ = {score.tempo}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default PopupChooser;
