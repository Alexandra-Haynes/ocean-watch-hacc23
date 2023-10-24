import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white font-bold text-2xl">
          Logo
        </a>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Submit Report
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Articles
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Stats
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
