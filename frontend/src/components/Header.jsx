import { Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation";

const Header = () => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <header className="bg-white relative z-20 w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
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
