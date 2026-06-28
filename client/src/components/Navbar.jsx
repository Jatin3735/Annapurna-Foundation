import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-shrink-0"
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[60px] lg:h-[50px] object-contain"
            />

            <span className="font-poppins font-bold text-lg sm:text-xl lg:text-2xl text-primary whitespace-nowrap">
              Annapurna
              <span className="text-accent">Foundation</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-accent transition duration-200"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-accent font-medium transition"
            >
              About
            </Link>

            <Link
              to="/gallery"
              className="font-medium text-gray-700 hover:text-accent transition duration-200"
            >
              Gallery
            </Link>

            <Link
              to="/register"
              className="font-medium text-gray-700 hover:text-accent transition duration-200"
            >
              Volunteer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-accent transition"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-md"
          >
            <div className="px-4 py-3 space-y-1">
              <Link
                to="/"
                onClick={toggleMenu}
                className="block rounded-md px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 hover:text-accent transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={toggleMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50"
              >
                About
              </Link>

              <Link
                to="/gallery"
                onClick={toggleMenu}
                className="block rounded-md px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 hover:text-accent transition"
              >
                Gallery
              </Link>

              <Link
                to="/register"
                onClick={toggleMenu}
                className="block rounded-md px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 hover:text-accent transition"
              >
                Volunteer Registration
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;