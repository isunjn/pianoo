import { Link } from "react-router-dom";
import { TbPlaylist, TbMusic, TbCrosshair, TbHelp, TbUserCircle } from "react-icons/tb";
import type { IconBaseProps } from "react-icons";
import type { ComponentType } from "react";

function Header() {
  return (
    <header className="flex justify-between items-center py-2">
      <Link className="text-xl" to="/"> Pianoo </Link>
      <nav className="flex gap-1 items-center">
        <TabBtn to="/" name="Play" Icon={TbMusic} />
        <TabBtn to="/scores" name="Scores" Icon={TbPlaylist} />
        <TabBtn to="/compose" name="Compose" Icon={TbCrosshair} />
        <TabBtn to="/help" name="Help" Icon={TbHelp} />
        <TabBtn to="/account" name="Account" Icon={TbUserCircle} />
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
    <Link className="flex gap-1.5 items-center px-4 py-1 hover:bg-[#495755]/20 rounded" to={to}>
      <Icon className="text-lg" /> {name}
    </Link>
  );
}

export default Header;
