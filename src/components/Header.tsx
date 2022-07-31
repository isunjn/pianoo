import { useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  TbPlaylist,
  TbMusic,
  TbCrosshair,
  TbHelp,
  TbUserCircle,
  TbMenu2,
  TbX,
} from "react-icons/tb";
import type { IconBaseProps } from "react-icons";

function Header() {
  return (
    <header className="pt-4 flex justify-between items-end zen-invisible">
      <Link
        to="/"
        className="focus-visible:outline-2 focus-visible:outline
        focus-visible:outline-th-text focus-visible:outline-offset-2 group"
      >
        <div className="text-xl mb-1">
          pianoo
          <span
            className="ml-3.5 inline-block sm:text-2xl
            sm:group-hover:animate-spin"
          >
            𝄞
          </span>
          <span className="hidden sm:inline-block -ml-4">𝄚𝄚𝄚𝄚</span>
        </div>
        <div className="hidden sm:block text-xs text-th-hint">
          music on your keyboard
        </div>
      </Link>
      <Nav />
    </header>
  );
}

function Nav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative">
      <button onClick={() => setOpen(!open)} className="z-50 sm:hidden">
        {open ? <TbX className="text-lg" /> : <TbMenu2 className="text-lg" />}
      </button>
      <div
        className={`${open ? "" : "hidden"} flex z-50 bg-th-bg rounded w-max
        absolute top-full mt-2 right-0 flex-col gap-4 shadow-lg p-2
        sm:flex sm:static sm:mt-0 sm:flex-row sm:gap-0 sm:shadow-none sm:p-0`}
      >
        <TabBtn to="/" name={t("header.play")} Icon={TbMusic} />
        {/* <TabBtn to="/scores" name="Scores" Icon={TbPlaylist} /> */}
        <TabBtn to="/compose" name={t("header.compose")} Icon={TbCrosshair} />
        <TabBtn to="/help" name={t("header.help")} Icon={TbHelp} />
        {/* <TabBtn to="/account" name="Account" Icon={TbUserCircle} /> */}
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="z-10 fixed top-0 left-0 w-screen h-screen"
        ></div>
      )}
    </nav>
  );
}

interface TabBtnProps {
  to: string;
  name: string;
  Icon: ComponentType<IconBaseProps>;
}

function TabBtn({ to, name, Icon }: TabBtnProps) {
  return (
    <Link
      to={to}
      className="flex gap-1.5 items-center px-4 py-1 rounded
      hover:bg-th-hover focus-visible:outline-2 focus-visible:outline
      focus-visible:outline-th-text focus-visible:outline-offset-2"
    >
      <Icon className="text-lg" /> {name}
    </Link>
  );
}

export default Header;
