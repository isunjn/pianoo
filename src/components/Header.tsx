import { Link } from "react-router-dom";
import logo from "~/assets/svg/logo.svg";

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" className="w-8" />
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="list">Score List</Link>
        <Link to="compose">Compose</Link>
        <Link to="about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
