import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div
        className="nav flex justify-between flex-col bg-gray-100 fixed top-0 h-screen w-full max-w-80
          py-20 px-7 gap-5 xl:gap-80 transition-all duration-300"
        style={{ right: isOpen ? "0" : "-350px" }}
      >
        <ul className="links mt-8 flex-col flex  font-medium gap-6">
          <li>
            <Link to="/rooms">Rooms</Link>
          </li>
          <li>
            <Link to="/offers">Offers</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="auth flex justify-center gap-8">
          <Button className="w-24">
            <Link to="/login">Login</Link>
          </Button>
          <Button className="w-24">
            <Link to="/signup">Signup</Link>
          </Button>
        </div>
      </div>
      <button
        className="relative flex items-center justify-center text-gray-800"
        style={{ fontSize: "1.4rem" }}
        onClick={toggleMenu}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navigation;
