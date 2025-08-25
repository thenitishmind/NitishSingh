"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 font-bold text-xl">
              Nitish
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <a
              href="https://github.com/nitishsghh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-700 transition duration-300"
              aria-label="GitHub Profile"
            >
              <FaGithub className="h-6 w-6" />
            </a>
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenuAlt4 className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-gray-800 transition duration-300`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-300"
            onClick={toggleMenu}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-300"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-300"
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
          <a
            href="https://github.com/nitishsghh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-300"
            onClick={toggleMenu}
          >
            <FaGithub className="h-5 w-5 mr-2" /> GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 