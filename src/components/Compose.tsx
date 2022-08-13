import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TbLink } from "react-icons/tb";
import tonalities, { TonalityKind } from "~/core/tonality";
import parse, { type MusicScore, type SyntaxErr } from "~/core/parser";
import usePlayerStore from "~/store/usePlayerStore";
import pianoo from "~/core/pianoo";
import panic from "~/utils/panic";
import {
  K_COMPOSE_ERRORS,
  K_COMPOSE_NAME,
  K_COMPOSE_TONALITY,
  K_COMPOSE_TIMESIGN_1,
  K_COMPOSE_TIMESIGN_2,
  K_COMPOSE_TEMPO,
  K_COMPOSE_CONTENT,
} from "~/constants/storage-keys";

interface ComposeFormElements extends HTMLFormControlsCollection {
  scoreName: HTMLInputElement;
  tonality: HTMLSelectElement;
  timesign1: HTMLInputElement;
  timesign2: HTMLInputElement;
  tempo: HTMLInputElement;
  content: HTMLTextAreaElement;
}

function retrievalLocal(key: string, defaultValue: string) {
  const item = localStorage.getItem(key);
  return item ? item : defaultValue;
}

function Compose() {
  const setScore = usePlayerStore(state => state.setScore);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const scoreName = retrievalLocal(K_COMPOSE_NAME, "Composing...");
  const tonality = retrievalLocal(K_COMPOSE_TONALITY, "1 = C");
  const timesign1 = retrievalLocal(K_COMPOSE_TIMESIGN_1, "4");
  const timesign2 = retrievalLocal(K_COMPOSE_TIMESIGN_2, "4");
  const tempo = retrievalLocal(K_COMPOSE_TEMPO, "88");
  const content = retrievalLocal(
    K_COMPOSE_CONTENT,
    "0 0 0 6_ 7_ | +1. 7_ +1 +3 | 7- 0 3 | 6. 5_ 6 +1 | 5- 0"
  );
  const errorsStr = retrievalLocal(K_COMPOSE_ERRORS, "");
  const [errors, setErrors] = useState<string[]>(
    errorsStr == "" ? [] : (JSON.parse(errorsStr) as string[])
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const elements = e.currentTarget.elements as ComposeFormElements;
    const scoreName = elements.scoreName.value;
    const tonality = elements.tonality.value as TonalityKind;
    const timesign1 = parseInt(elements.timesign1.value);
    const timesign2 = parseInt(elements.timesign2.value);
    const tempo = parseInt(elements.tempo.value);
    const content = elements.content.value;

    const errors = [];

    if (scoreName.trim() == "") errors.push(t("compose.error.nameEmpty"));
    if (!timesign1 || !timesign2) errors.push(t("compose.error.timesignEmpty"));
    if (!tempo) errors.push(t("compose.error.tempoEmpty"));
    if (content.trim() == "") errors.push(t("compose.error.contentEmpty"));

    const score: MusicScore = {
      id: 0,
      name: scoreName,
      tonality,
      timesign: [timesign1, timesign2],
      tempo: tempo,
      content,
    };
    const [parsedScore, syntaxErrors] = parse(score);
    if (syntaxErrors) {
      syntaxErrors.map(syntaxErrToMsg).forEach(err => errors.push(err));
    }

    if (parsedScore!.parsed.flat().every(item => item.kind == "rest")) {
      errors.push(t("compose.error.noNoteOrChord"));
    }

    if (errors.length > 0) {
      localStorage.setItem(K_COMPOSE_ERRORS, JSON.stringify(errors));
      setErrors(errors);
    } else {
      localStorage.removeItem(K_COMPOSE_ERRORS);
      const sheetItems = pianoo.prepare(parsedScore!);
      setScore(parsedScore!, sheetItems);
      navigate("/");
    }
  }

  function syntaxErrToMsg(err: SyntaxErr) {
    switch (err.code) {
      case "E11":
        return `\`${err.item}\`: ${t("error.syntax.E11")}`;
      case "E12":
        return `\`${err.item}\`: ${t("error.syntax.E12")}: \`${err.note}\``;
      case "E21":
        return `\`${err.item}\`: ${t("error.syntax.E21")}`;
      case "E22":
        return `\`${err.item}\`: ${t("error.syntax.E22")}`;
      case "E23":
        return `\`${err.item}\`: ${t("error.syntax.E23")}`;
      case "E31":
        return `\`${err.item}\`: ${t("error.syntax.E31")}`;
      case "E32":
        return `\`${err.item}\`: ${t("error.syntax.E32")}`;
      case "E33":
        return `\`${err.item}\`: ${t("error.syntax.E33")}: \`${err.length}\``;
      case "E34":
        return `\`${err.item}\`: ${t("error.syntax.E34")}: \`${err.length}\``;
      default:
        throw panic("unreachable");
    }
  }

  function perpsist(key: string) {
    return (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      localStorage.setItem(key, e.currentTarget.value);
    };
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="font-mono w-full lg:w-5/6 mx-auto my-8 space-y-6"
    >
      <div className="w-full space-y-6 md:space-y-0 md:flex md:justify-between">
        <div className="w-full md:w-1/2 flex justify-between gap-6">
          <label htmlFor="scoreName">{t("compose.name")}:</label>
          <input
            name="scoreName"
            id="scoreName"
            type="text"
            defaultValue={scoreName}
            onChange={perpsist(K_COMPOSE_NAME)}
            className="w-80 px-2 py-0.5 rounded flex-1 bg-th-hover 
            focus-visible:outline-none"
          ></input>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 flex justify-between">
          <label htmlFor="tonality">{t("compose.tonality")}:</label>
          <select
            name="tonality"
            id="tonality"
            defaultValue={tonality}
            onChange={perpsist(K_COMPOSE_TONALITY)}
            className="w-28 px-1 py-1 rounded
              bg-th-hover focus-visible:outline-none"
          >
            {tonalities.kinds().map(kind => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full space-y-6 md:space-y-0 md:flex md:justify-between">
        <div className="w-full md:w-1/2 flex justify-between">
          <label htmlFor="timesign1">{t("compose.timesign")}:</label>
          <div className="flex">
            <input
              name="timesign1"
              id="timesign1"
              type="number"
              min="1"
              max="16"
              defaultValue={timesign1}
              onChange={perpsist(K_COMPOSE_TIMESIGN_1)}
              className="w-16 px-2 py-0.5 rounded
                bg-th-hover focus-visible:outline-none"
            ></input>
            <span className="mx-2">/</span>
            <input
              name="timesign2"
              type="number"
              min="1"
              max="16"
              defaultValue={timesign2}
              onChange={perpsist(K_COMPOSE_TIMESIGN_2)}
              className="w-16 px-2 py-0.5 rounded
                bg-th-hover focus-visible:outline-none"
            ></input>
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 flex justify-between">
          <label htmlFor="tempo">{t("compose.tempo")}:</label>
          <input
            name="tempo"
            id="tempo"
            type="number"
            min="40"
            max="220"
            defaultValue={tempo}
            onChange={perpsist(K_COMPOSE_TEMPO)}
            className="w-28 ml-4 px-2 py-0.5 rounded
          bg-th-hover focus-visible:outline-none"
          ></input>
        </div>
      </div>

      <div>
        <label htmlFor="content">{t("compose.content")}:</label>
        <textarea
          name="content"
          id="content"
          defaultValue={content}
          onChange={perpsist(K_COMPOSE_CONTENT)}
          className="w-full h-64 p-4 rounded bg-th-hover whitespace-pre
            focus-visible:outline-none"
        ></textarea>
      </div>

      {errors.length > 0 && (
        <div className="border-2 border-th-error text-th-error border-dashed rounded p-4 space-y-2">
          {errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Link
          to="/help#how-to-compose"
          className="h-min border-b-2 border-th-text"
        >
          {t("compose.hint")}
          <TbLink className="inline ml-2" />
        </Link>
        <button
          type="submit"
          className="rounded px-6 py-1 bg-th-text text-th-bg"
        >
          {errors.length > 0 ? t("compose.retry") : t("compose.play")}
        </button>
      </div>
    </form>
  );
}

export default Compose;
