import { Link } from "react-router-dom";
import { TbBrandGithub, TbBrandTwitter, TbFileText, TbShieldLock, TbMail, TbGitMerge, TbPalette, TbLanguageHiragana } from "react-icons/tb";
import type { IconBaseProps } from "react-icons";
import type { ComponentType } from "react";

function Footer() {
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
        <button className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded">
          <TbLanguageHiragana className="text-base" />English
        </button>
        <button className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded">
          <TbPalette className="text-base" />Orange
        </button>
        <Link className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" to="/about">
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
    <a className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" href={href}>
      <Icon className="text-base" /> {name}
    </a>
  );
}

export default Footer;
