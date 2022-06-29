import { Link } from "react-router-dom";
// import logo from "~/assets/svg/logo.svg";
import { TbPlaylist, TbMusic, TbCrosshair, TbHelp, TbUserCircle } from "react-icons/tb";

function Header() {
  return (
    <header className="flex justify-between items-center py-2">
      <Link className="text-xl" to="/">
        Pianoo
        {/* <img src={logo} alt="logo" className="w-6"/> */}
      </Link>
      <nav className="flex gap-1 items-center">
        <Link className="flex gap-1.5 items-center px-4 py-1 hover:bg-[#495755]/20 rounded" to="/">
          <TbMusic className="text-lg" /> Play
        </Link>
        <Link className="flex gap-1.5 items-center px-4 py-1 hover:bg-[#495755]/20 rounded" to="/scores">
          <TbPlaylist className="text-lg" /> Scores
        </Link>
        <Link className="flex gap-1.5 items-center px-4 py-1 hover:bg-[#495755]/20 rounded" to="/compose">
          <TbCrosshair className="text-lg" /> Compose
        </Link>
        <Link className="flex gap-1.5 items-center px-4 py-1 hover:bg-[#495755]/20 rounded" to="/help">
          <TbHelp className="text-lg" /> Help
        </Link>
        <Link className="flex gap-1.5 items-center px-4 py-1 hover:bg-[#495755]/20 rounded" to="/account">
          <TbUserCircle className="text-lg" /> Account
        </Link>
      </nav>
    </header>
  );
}

export default Header;
