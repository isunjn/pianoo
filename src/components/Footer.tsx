import { useState } from "react";
import { Link } from "react-router-dom";
import { TbBrandGithub, TbBrandTwitter, TbFileText, TbShieldLock, TbMail, TbGitMerge, TbPalette, TbLanguageHiragana } from "react-icons/tb";
import type { IconBaseProps } from "react-icons";
import type { ComponentType } from "react";
import { themes, type ThemeKind } from "~/config/theme";

interface FooterPorps {
  theme: ThemeKind;
  setTheme: (theme: ThemeKind) => void;
}

function Footer({ theme, setTheme }: FooterPorps) {
  return (
    <footer className="flex justify-between text-sm zen-invisible">
      <div className="flex items-center">
        <FooterLink href="#" name="GitHub" Icon={TbBrandGithub} />
        <FooterLink href="#" name="Twitter" Icon={TbBrandTwitter} />
        <FooterLink href="#" name="Terms" Icon={TbFileText} />
        <FooterLink href="#" name="Privacy" Icon={TbShieldLock} />
        <FooterLink href="#" name="Contact" Icon={TbMail} />
      </div>
      <div className="flex items-center">
        <button className="flex gap-1.5 items-center px-2 py-0.5 rounded
          hover:bg-theme-hover focus-visible:outline-2 focus-visible:outline
          focus-visible:outline-theme-text focus-visible:outline-offset-2">
          <TbLanguageHiragana className="text-base" />English
        </button>
        <ThemeBtn theme={theme} setTheme={setTheme} />
        <Link to="/about" className="flex gap-1.5 items-center px-2 py-0.5 rounded
          hover:bg-theme-hover focus-visible:outline-2 focus-visible:outline
          focus-visible:outline-theme-text focus-visible:outline-offset-2" >
          <TbGitMerge className="text-base" />v0.1.0
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
    <a href={href} className="flex gap-1.5 items-center px-2 py-0.5 rounded
    hover:bg-theme-hover focus-visible:outline-2 focus-visible:outline
    focus-visible:outline-theme-text focus-visible:outline-offset-2">
      <Icon className="text-base" /> {name}
    </a>
  );
}

interface ThemeBtnPorps {
  theme: ThemeKind;
  setTheme: (theme: ThemeKind) => void;
}

function ThemeBtn({ theme, setTheme }: ThemeBtnPorps) {
  const [isOpen, setIsOpen] = useState(false);

  function changeTheme(newTheme: ThemeKind) {
    if (newTheme != theme) {
      setTheme(newTheme);
      setIsOpen(false);
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}
        className="flex gap-1.5 items-center px-2 py-0.5 rounded
        hover:bg-theme-hover focus-visible:outline-2 focus-visible:outline
        focus-visible:outline-theme-text focus-visible:outline-offset-2">
        <TbPalette className="text-base" />{themes.get(theme)}
      </button>
      {isOpen && (<>
        <div className="absolute bottom-10 min-w-max max-h-96 z-50 overflow-auto
          backdrop-blur bg-theme-hover rounded shadow">
          {[...themes].map(([kind, name]) => (
            <div key={kind} onClick={() => changeTheme(kind)}
              className="px-4 py-2 hover:bg-theme-hover cursor-pointer">
              {name}
            </div>
          ))}
        </div>
        <div onClick={() => setIsOpen(false)}
          className="fixed top-0 left-0 w-screen h-screen z-10"></div>
      </>)}
    </div>
  );
}


export default Footer;
