import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="lg:flex-1">
      <div
        className={`nav ${
          isOpen ? "right-0" : "-right-80"
        } flex justify-between flex-col bg-gray-100 fixed top-0 h-screen w-full max-w-80
          py-20 px-7 gap-5 xl:gap-80 transition-all duration-300`}
        ref={navRef}
      >
        <ul className="links mt-8 flex-col flex font-medium gap-6">
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
          <Button className="w-24 " variant="outline">
            <Link to="/login">Login</Link>
          </Button>
          <Button
            className="w-24 hover:text-white hover:bg-primary duration-300"
            variant="outline"
          >
            <Link to="/signup">Signup</Link>
          </Button>
        </div>
      </div>
      <button
        className="relative flex items-center justify-center text-gray-800 lg:hidden"
        style={{ fontSize: "1.4rem" }}
        onClick={toggleMenu}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navigation;
