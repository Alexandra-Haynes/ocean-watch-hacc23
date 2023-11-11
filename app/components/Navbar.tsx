"use client";
import React, { useState } from "react";
import LoginButton from "./LoginButton";
import DonateButton from "./DonateButton";

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="w-full  mt-4 uppercase">
      <div className="flex justify-between items-center mx-6">
        <a href="#" className="text-white font-bold text-2xl">
          {" "}
          LOGO
          {/* <img src="/assets/logo.png" className="h-12" alt="Logo" />  */}
        </a>

        {/* Burger menu icon for small screens */}
        <div className="lg:hidden ">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? (
              // Render X icon when the menu is open
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              // Render burger icon when the menu is closed
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Overlay to capture clicks and close the menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 "
            onClick={toggleMenu}
          ></div>
        )}

        <ul
          className={`lg:flex lg:space-x-8 lg:items-center lg:justify-center font-semibold text-xl ${
            isMenuOpen
              ? "flex flex-col items-start justify-between gap-2 fixed pl-12 bg-slate-900 right-0 top-0 w-1/2 h-[400px] rounded-bl-md shadow-xl p-8"
              : "hidden"
          }`}
        >
          {" "}
          <li>
            <a
              href="#"
              className="text-white hover:shadow-lg pb-2
            hover:font-bold transition-all ease-in
         "
            >
              Home
            </a>
          </li>
          <li className="relative group">
            <a
              href="#"
              className="text-white hover:shadow-lg pb-2
            hover:font-bold transition-all ease-in
         "
            >
              About
            </a>
          </li>
          <li className="relative group">
            <a
              href="#"
              className="text-white hover:shadow-lg pb-2
            hover:font-bold transition-all ease-in
         "
            >
              Research
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:shadow-lg pb-2 
            hover:font-bold transition-all ease-in
         "
            >
              Products & Services
            </a>
          </li>
          {isMenuOpen && (
            <div>
              <li>
                <a
                  href="#"
                  className="text-yellow-400 hover:shadow-lg pb-2 
            hover:font-bold transition-all ease-in
         "
                >
                  Donate
                </a>
              </li>
            </div>
          )}
          <li>
            <a href="#">
              <LoginButton />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
