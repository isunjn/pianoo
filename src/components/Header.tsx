import { Link } from "react-router-dom";
import { TbPlaylist, TbMusic, TbCrosshair, TbHelp, TbUserCircle } from "react-icons/tb";
import type { IconBaseProps } from "react-icons";
import type { ComponentType } from "react";

function Header() {
  return (
    <header className="flex justify-between items-end zen-invisible">
      <Link to="/" className="focus-visible:outline-2 focus-visible:outline
        focus-visible:outline-theme-text focus-visible:outline-offset-2">
        <div className="text-xl mb-1">
          pianoo
          <span className="ml-3.5 text-2xl">𝄞</span>
          <span className="-ml-4">𝄚𝄚𝄚𝄚</span>
        </div>
        <div className="text-xs text-theme-hint">music on your keyboard</div>
      </Link>
      <nav className="flex gap-1 items-center">
        <TabBtn to="/" name="Play" Icon={TbMusic} />
        {/* <TabBtn to="/scores" name="Scores" Icon={TbPlaylist} /> */}
        <TabBtn to="/compose" name="Compose" Icon={TbCrosshair} />
        <TabBtn to="/help" name="Help" Icon={TbHelp} />
        {/* <TabBtn to="/account" name="Account" Icon={TbUserCircle} /> */}
      </nav>
    </header>
  );
}

interface TabBtnProps {
  to: string;
  name: string;
  Icon: ComponentType<IconBaseProps>;
}

function TabBtn({ to, name, Icon }: TabBtnProps) {
  return (
    <Link to={to} className="flex gap-1.5 items-center px-4 py-1 rounded
      hover:bg-theme-hover focus-visible:outline-2 focus-visible:outline
      focus-visible:outline-theme-text focus-visible:outline-offset-2">
      <Icon className="text-lg" /> {name}
    </Link>
  );
}

export default Header;
