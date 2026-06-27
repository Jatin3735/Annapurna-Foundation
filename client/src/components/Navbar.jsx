import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="font-poppins font-bold text-2xl text-primary flex items-center gap-3">
              <img src="/images/logo.png" alt="" className='w-[60px] h-[50px] '/>
              Annapurna<span className="text-accent">Foundation</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-accent font-medium transition">Home</Link>
            <Link to="/gallery" className="text-gray-700 hover:text-accent font-medium transition">Gallery</Link>
            <Link to="/register" className="text-gray-700 hover:text-accent font-medium transition">Volunteer</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-accent focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Home</Link>
            <Link to="/gallery" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Gallery</Link>
            <Link to="/register" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50">Volunteer Registration</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
