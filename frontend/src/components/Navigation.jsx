import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <nav className="flex items-center justify-between gap-80">
      <ul className="links flex items-center font-medium">
        <li>
          <Link to="/rooms">Our Rooms</Link>
        </li>
        <li>
          <Link to="/facilities">Facilities</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
      <div className="auth flex gap-5">
        <Button className="w-24">
          <Link to="/login">Login</Link>
        </Button>
        <Button className="w-24">
          <Link to="/signup">Signup</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
