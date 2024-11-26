import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 10 ? setSticky(true) : setSticky(false);
    });
  }, []);

  return (
    <header
      className={`fixed z-10 w-full transition-all duration-300 ${
        sticky ? "after-scroll" : "before-scroll "
      }`}
    >
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
