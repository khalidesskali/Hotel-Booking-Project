import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header className="bg-white fixed top-0 left-0 z-20 w-full">
      <div className="container mx-auto flex items-center justify-between gap-16 p-4 h-16">
        <Link className="logo flex items-center gap-2" to="/">
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
