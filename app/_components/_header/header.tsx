// Header.jsx
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Navbar from './_navbar/navbar';
import Search from './_search/search'; 

const Header = () => {
  return (
    <div>
      {/* Existing header content */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faMobile} />
            <span className="font-bold">123-456-7890</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <span className="font-bold">info@example.com</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          <nav className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              Theme FAQ's
            </a>
            <a href="#" className="hover:text-gray-300">
              Need Help
            </a>
          </nav>
          <div className="relative">
            <select className="bg-transparent border-none hover:text-gray-500 lg:w-24">
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </header>

      {/* Search component below the header */}
      <Search />

      {/* Navbar component below the search */}
      <Navbar />
    </div>
  );
};

export default Header;
