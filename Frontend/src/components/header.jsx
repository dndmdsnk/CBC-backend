import { NavLink } from "react-router-dom"; // <-- use NavLink
import logo from "../assets/logo.png";
import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-2 left-4 right-4 bg-white/40 backdrop-blur-md dark:bg-gray-900 z-20 border-b border-gray-200 dark:border-gray-600 shadow-[0_6px_10px_rgba(0,0,0,0.08),_0_-6px_10px_rgba(0,0,0,0.06),_6px_0_10px_rgba(0,0,0,0.06),_-6px_0_10px_rgba(0,0,0,0.06)] h-[80px] rounded-3xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse ml-1">
          <img src={logo} className="h-[60px] w-[80px] object-cover" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Glow Theory
          </span>
        </NavLink>

        {/* Buttons */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          <Link to="/cart" className="text-[30px] font-bold mx-4 text-green-500">
            <BsCart3/>

          </Link>

          <button
            type="button"
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Get started
          </button>

          {/* Hamburger button */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-green-500 rounded-lg md:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <div
          id="navbar-sticky"
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:items-center md:w-auto md:order-1 w-full`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 md:mt-0 font-medium border md:border-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-green-500 md:p-0" // active
                    : "block py-2 px-3 text-gray-900 hover:text-green-500 md:p-0 dark:text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-green-500 md:p-0"
                    : "block py-2 px-3 text-gray-900 hover:text-green-500 md:p-0 dark:text-white"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-green-500 md:p-0"
                    : "block py-2 px-3 text-gray-900 hover:text-green-500 md:p-0 dark:text-white"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-green-500 md:p-0"
                    : "block py-2 px-3 text-gray-900 hover:text-green-500 md:p-0 dark:text-white"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
