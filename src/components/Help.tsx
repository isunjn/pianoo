import { useTranslation } from "react-i18next";

function Help() {
  const { t } = useTranslation();

  return (
    <article className="w-full lg:w-3/4 mx-auto my-12 space-y-16">

      <section>
        <p><strong>pianoo</strong> {t("help.s1")}</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4" id="how-to-play">
          {t("help.s2.title")}
        </h2>
        <ol className="list-disc ml-8">
          <li>{t("help.s2.list.1")}</li>
          <li>{t("help.s2.list.2")}</li>
          <li>{t("help.s2.list.3")}</li>
          <li>{t("help.s2.list.4")}</li>
          <li>{t("help.s2.list.5")}</li>
          <li>{t("help.s2.list.6")}</li>
        </ol>
      </section>

      <section className="space-y-8">
        <h2 className="text-xl font-bold mb-4" id="how-to-compose">
          {t("help.s3.title")}
        </h2>
        <p>{t("help.s3.p1.1")}</p>
        <p>{t("help.s3.p1.2")}</p>
        <p>{t("help.s3.p1.3")}</p>
        <p>{t("help.s3.p1.4")}</p>
        <p><strong>{t("help.s3.list.title")}</strong></p>
        <ol className="list-decimal ml-8">
          <li>{t("help.s3.list.1")}</li>
          <li>{t("help.s3.list.2")}</li>
          <li>{t("help.s3.list.3")}</li>
          <li>{t("help.s3.list.4")}</li>
        </ol>

        <p><strong>{t("help.s3.syntax.title")}</strong></p>
        <p>{t("help.s3.syntax.num")}</p>
        <p>{t("help.s3.syntax.rest")}</p>
        <p>{t("help.s3.syntax.barline")}</p>
        <div>
          <p>{t("help.s3.syntax.octave")}</p>
          <img className="rounded"
            src="imgs/octave.png"
            alt="octave syntax" />
        </div>
        <div>
          <p>{t("help.s3.syntax.length")}</p>
          <img className="rounded"
            src="imgs/length.png"
            alt="note length syntax" />
        </div>
        <div>
          <p>{t("help.s3.syntax.accitental.title")}</p>
          <p>{t("help.s3.syntax.accitental.p")}</p>
          <img className="rounded"
            src="imgs/accidental.png"
            alt={t("help.s3.syntax.accitental.alt")} />
        </div>
        <div>
          <p>{t("help.s3.syntax.examples.title")}</p>
          <img className="rounded"
            src="imgs/examples.png"
            alt={t("help.s3.syntax.examples.alt")} />
        </div>
        <div>
          <p>{t("help.s3.syntax.chord.title")}</p>
          <p>{t("help.s3.syntax.chord.p")}</p>
          <img className="rounded"
            src="imgs/chord.png"
            alt={t("help.s3.syntax.chord.alt")} />
        </div>
        <div>
          <p>{t("help.s3.syntax.tuplet.title")}</p>
          <p>{t("help.s3.syntax.tuplet.p.1")}</p>
          <p>{t("help.s3.syntax.tuplet.p.2")}</p>
          <p>{t("help.s3.syntax.tuplet.p.3")}</p>
          <img className="rounded"
            src="imgs/tuplet.png"
            alt={t("help.s3.syntax.tuplet.alt")} />
        </div>
        <div>
          <p>{t("help.s3.syntax.chordTuplet.title")}</p>
          <img className="rounded"
            src="imgs/chord-tuplet.png"
            alt={t("help.s3.syntax.chordTuplet.alt")} />
        </div>
        <p>{t("help.s3.syntax.p2.1")}</p>
        <p>{t("help.s3.syntax.p2.2")}</p>
        <p>{t("help.s3.syntax.p2.3")}</p>
        <p>{t("help.s3.syntax.p2.4")}</p>
        <p>{t("help.s3.syntax.p2.5")}</p>
      </section>

    </article>
  );
}

export default Help;
