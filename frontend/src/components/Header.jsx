import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="bg-gray-100 fixed top-0 left-0 z-20 w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link className="logo flex items-center gap-2" to="/">
          <img src={logo} alt="logo" className="w-10" />
          <span className="block font-semibold text-2xl">
            Stay<span className="text-primary">H</span>ome
          </span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
