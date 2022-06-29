import { Link } from "react-router-dom";
import { TbBrandGithub, TbBrandTwitter, TbFileText, TbShieldLock, TbMail, TbGitMerge, TbPalette, TbLanguageHiragana } from "react-icons/tb";

function Footer() {
  return (
    <footer className="flex justify-between text-sm">
      <div className="flex items-center">
        <a className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" href="#">
          <TbBrandGithub className="text-base" />GitHub
        </a>
        <a className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" href="#">
          <TbBrandTwitter className="text-base" />Twitter
        </a>
        <a className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" href="#">
          <TbFileText className="text-base" />Terms
        </a>
        <a className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" href="#">
          <TbShieldLock className="text-base" />Privacy
        </a>
        <a className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" href="#">
          <TbMail className="text-base" />Contact
        </a>
      </div>
      <div className="flex items-center">
        <a className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" href="#">
          <TbLanguageHiragana className="text-base" />English
        </a>
        <a className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" href="#">
          <TbPalette className="text-base" />Orange
        </a>
        <Link className="flex gap-1.5 items-center px-2 py-0.5 hover:bg-[#495755]/20 rounded" to="/about">
          <TbGitMerge className="text-base" />v0.1.0
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
