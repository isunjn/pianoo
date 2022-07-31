import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  TbBrandGithub,
  TbBrandTwitter,
  TbFileText,
  TbShieldLock,
  TbMail,
  TbGitMerge,
  TbPalette,
  TbLanguageHiragana,
} from "react-icons/tb";
import type { IconBaseProps } from "react-icons";
import type { ComponentType } from "react";
import appTheme, { type ThemeKind } from "~/config/theme";
import { langs, type LangKind } from "~/config/lang";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="py-4 flex flex-col-reverse sm:flex-row gap-4
      items-center justify-between text-sm zen-invisible"
    >
      <div className="w-max flex items-center">
        <FooterLink
          href="https://github.com/isunjn/pianoo"
          name="GitHub"
          Icon={TbBrandGithub}
        />
        <FooterLink
          href="mailto:isunjn@gmail.com"
          name={t("footer.contact")}
          Icon={TbMail}
        />
        {/* <FooterLink href="#" name="Twitter" Icon={TbBrandTwitter} /> */}
        {/* <FooterLink href="#" name="Terms" Icon={TbFileText} /> */}
        {/* <FooterLink href="#" name="Privacy" Icon={TbShieldLock} /> */}
      </div>
      <div className="w-max flex items-center">
        <LangBtn />
        <ThemeBtn />
        <Link
          to="/about"
          className="flex gap-1.5 items-center px-2 py-0.5 rounded
          hover:bg-th-hover focus-visible:outline-2 focus-visible:outline
          focus-visible:outline-th-text focus-visible:outline-offset-2"
        >
          <TbGitMerge className="text-base" />
          v0.1.0
        </Link>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  name: string;
  Icon: ComponentType<IconBaseProps>;
}

function FooterLink({ href, name, Icon }: FooterLinkProps) {
  return (
    <a
      href={href}
      className="flex gap-1.5 items-center px-2 py-0.5 rounded
    hover:bg-th-hover focus-visible:outline-2 focus-visible:outline
    focus-visible:outline-th-text focus-visible:outline-offset-2"
    >
      <Icon className="text-base" /> {name}
    </a>
  );
}

function LangBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage as LangKind;

  function changeLang(lang: LangKind) {
    if (currentLang != lang) {
      i18n.changeLanguage(lang);
      setIsOpen(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-1.5 items-center px-2 py-0.5 rounded
          hover:bg-th-hover focus-visible:outline-2 focus-visible:outline
          focus-visible:outline-th-text focus-visible:outline-offset-2"
      >
        <TbLanguageHiragana className="text-base" />
        {langs.get(currentLang)}
      </button>
      {isOpen && (
        <>
          <div
            className="absolute bottom-10 min-w-max max-h-96 z-50 overflow-auto
          backdrop-blur bg-th-hover rounded shadow"
          >
            {[...langs].map(([lang, name]) => (
              <div
                key={lang}
                onClick={() => changeLang(lang)}
                className="px-4 py-2 hover:bg-th-hover cursor-pointer"
              >
                {name}
              </div>
            ))}
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed top-0 left-0 w-screen h-screen z-10"
          ></div>
        </>
      )}
    </div>
  );
}

function ThemeBtn() {
  const [theme, setThemeKind] = useState<ThemeKind>(appTheme.initial);
  const [isOpen, setIsOpen] = useState(false);

  function changeThemeTo(newTheme: ThemeKind) {
    if (newTheme != theme) {
      appTheme.changeTheme(newTheme);
      setThemeKind(newTheme);
      setIsOpen(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-1.5 items-center px-2 py-0.5 rounded
        hover:bg-th-hover focus-visible:outline-2 focus-visible:outline
        focus-visible:outline-th-text focus-visible:outline-offset-2"
      >
        <TbPalette className="text-base" />
        {theme}
      </button>
      {isOpen && (
        <>
          <div
            className="absolute bottom-10 min-w-max max-h-96 z-50 overflow-auto
          backdrop-blur bg-th-hover rounded shadow"
          >
            {appTheme.list.map(th => (
              <div
                key={th}
                onClick={() => changeThemeTo(th)}
                className="px-4 py-2 hover:bg-th-hover cursor-pointer"
              >
                {th}
              </div>
            ))}
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed top-0 left-0 w-screen h-screen z-10"
          ></div>
        </>
      )}
    </div>
  );
}

export default Footer;
