import { useTranslation } from "react-i18next";
import { usePlayer, usePlayerDispatch } from "~/contexts/PlayerContext";
import Loading from "~/components/Loading";
import Error from "~/components/Error";
import parse, { type MusicScore } from "~/core/parser";
import pianoo from "~/core/pianoo";
import useExampleScores from "~/hooks/useExampleScores";
import range from "~/utils/range";
import panic from "~/utils/panic";

function PopupChooser() {
  const { score } = usePlayer();
  const dispatch = usePlayerDispatch();
  const { t } = useTranslation();
  const { exampleScores, isLoading, isError } = useExampleScores(range(1, 20));
  
  function setScore(newScore: MusicScore) {
    if (newScore.id != score!.id) {
      const [newParsedScore, syntaxErrors] = parse(newScore);
      if (syntaxErrors) panic("syntax error occurred");
      const sheetItems = pianoo.prepare(newParsedScore!);
      dispatch({ type: "set_score", score: newParsedScore!, sheetItems });
    }
  }

  return (
    <div className="absolute z-50 top-10 right-0 w-full h-full p-4 overflow-y-scroll
      bg-th-hover text-th-text backdrop-blur-lg rounded shadow-lg" >
      {/* <div className="flex gap-4 mb-4">
        <div className="px-4 py-1.5 bg-th-text text-th-bg flex-1 text-center rounded">{t("play.tab.exampleScores")}</div>
        <div className="px-4 py-1.5 bg-th-hover flex-1 text-center rounded">{t("play.tab.recentlyPlayed")}</div>
        <div className="px-4 py-1.5 bg-th-hover flex-1 text-center rounded">{t("play.tab.justPlay")}</div>
        <div className="px-4 py-1.5 bg-th-hover flex-1 text-center rounded">{t("play.tab.fromFile")}</div>
      </div> */}
      {
        isLoading ? <Loading /> :
        isError ? <Error msg={t("error.crash")} /> :
        exampleScores!.map(score => (
          <div key={score.id} className="px-4 py-1.5 hover:bg-th-hover rounded cursor-pointer flex"
            onClick={() => setScore(score)}>
            <span className="flex-[5]">{score.name}</span>
            <span className="flex-1">{score.tonality}</span>
            <span className="flex-1">{score.timesign[0]} / {score.timesign[1]}</span>
            <span className="flex-1">♩ = {score.tempo}</span>
          </div>
        ))
      }
    </div>
  );
}

export default PopupChooser;
