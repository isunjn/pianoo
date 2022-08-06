import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TbArrowRight } from "react-icons/tb";
import usePlayerStore from "~/store/usePlayerStore";
import Loading from "~/components/Loading";
import Error from "~/components/Error";
import parse, { type MusicScore } from "~/core/parser";
import pianoo from "~/core/pianoo";
import { useExampleScores } from "~/hooks/useExampleScore";
import range from "~/utils/range";
import panic from "~/utils/panic";

function PopupChooser() {
  const { t } = useTranslation();
  const status = usePlayerStore(state => state.status);
  const [tab, setTab] = useState<"ExampleScores" | "JustPlay">(
    status == "justplaying" ? "JustPlay" : "ExampleScores"
  );

  return (
    <div
      className="absolute z-50 top-10 right-0 w-full h-full px-4
        bg-th-hover text-th-text backdrop-blur-lg rounded shadow-lg"
    >
      <div className="h-[12.5%] flex items-center gap-4">
        <TabBtn
          isActive={tab == "ExampleScores"}
          text={t("play.tab.exampleScores")}
          onClick={() => setTab("ExampleScores")}
        />
        <TabBtn
          isActive={tab == "JustPlay"}
          text={t("play.tab.justPlay")}
          onClick={() => setTab("JustPlay")}
        />
      </div>

      <div className="h-[87.5%] overflow-y-auto pb-4">
        {tab == "ExampleScores" && <TabExampleScores />}
        {tab == "JustPlay" && <TabJustPlay />}
      </div>
    </div>
  );
}

interface TabBtnProps {
  isActive: boolean;
  text: string;
  onClick: () => void;
}

function TabBtn({ isActive, text, onClick }: TabBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 flex-1 text-center rounded
        ${isActive ? "bg-th-text text-th-bg" : "bg-th-hover"}`}
    >
      {text}
    </button>
  );
}

function TabExampleScores() {
  const { scores, isLoading, isError } = useExampleScores(range(1, 20));
  const currentScore = usePlayerStore(state => state.score);
  const setScore = usePlayerStore(state => state.setScore);
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
    <>
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
    </>
  );
}

function TabJustPlay() {
  const { t } = useTranslation();
  const setStatus = usePlayerStore(state => state.setStatus);
  const setPopuping = usePlayerStore(state => state.setPopuping);

  function handleClick() {
    setStatus("justplaying");
    setPopuping("none");
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <div>{t("play.tab.hint.justPlay")}</div>
      <button
        onClick={handleClick}
        className="px-8 py-2 rounded bg-th-hover text-th-text text-xl group"
      >
        <TbArrowRight className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}

export default PopupChooser;
