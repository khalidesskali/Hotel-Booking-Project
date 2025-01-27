import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { CiUser, CiBookmarkCheck } from "react-icons/ci";
import { LiaPowerOffSolid } from "react-icons/lia";
import { useAuth } from "./AuthProvider";
import { Avatar } from "./ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();
  const { user, logout } = useAuth();

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
        <NavigationMenu className="links mt-8 flex-col flex font-medium gap-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/rooms">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Rooms
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="auth flex justify-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <FaUserCircle
                    fontSize={30}
                    className="size-full cursor-pointer border border-[#e2e2e2]
                text-[#2563eb]"
                  />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <CiUser />
                    <span>Profile</span>
                    <DropdownMenuShortcut></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CiBookmarkCheck fontSize={30} />
                    <span>My Bookings</span>
                    <DropdownMenuShortcut></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LiaPowerOffSolid />
                    <span>Log out</span>
                    <DropdownMenuShortcut></DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button className="w-24 " variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button
                className="w-24 hover:text-white hover:bg-primary duration-300"
                variant="outline"
              >
                <Link to="/signup">Signup</Link>
              </Button>
            </>
          )}
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
