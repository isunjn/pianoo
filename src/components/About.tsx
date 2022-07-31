import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <article className="w-full lg:w-3/4 mx-auto">
      <h1 className="text-center text-xl mb-10">{t("about.title")}</h1>
      <p><strong>pianoo</strong> {t("about.p")}</p>
      
      <div className="my-32 rounded p-4 bg-th-hover">
        <p>🚧 pianoo is still in it&#39;s early stage of development,
          many features are still missing.</p>
        <p>If you are interested, you can check the development progress on
          <a href="https://github.com/users/isunjn/projects/1" 
            className="underline mx-1">github-project-page</a>
        </p>
      </div>
    </article>
  );
}

export default About;
