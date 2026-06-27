import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-poppins font-bold text-2xl mb-4">Annapurna<span className="text-accent">Foundation</span></h3>
            <p className="text-gray-300">
              Dedicated to providing food to underprivileged children and ending child hunger.
            </p>
          </div>
          <div>
            <h4 className="font-poppins font-bold text-lg mb-4">Contact Us</h4>
            <p className="text-gray-300 mb-2">Amar-Garh Colony Kaithal, Haryana</p>
            <p className="text-gray-300 mb-2">Phone: +91 7419921792</p>
            <p className="text-gray-300">Email: info@annapurnafoundation.org</p>
          </div>
          <div>
            <h4 className="font-poppins font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent transition"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-accent transition"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-accent transition"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-accent transition"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Annapurna Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
