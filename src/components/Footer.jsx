import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { TbPlant2 } from 'react-icons/tb';

const Footer = () => {
  return (
    <footer className="bg-green-950 text-white py-10 px-6 w-full">
      <section className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between gap-8">
        {/* Brand Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="font-bold text-xl flex items-center gap-2">
            <TbPlant2 size={28} /> ScrapCo
          </h2>
          <p className="text-sm text-gray-300 mt-2 max-w-xs">
            Making buying and selling scrap materials effortless and reliable.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
              <FaFacebook size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
              <FaTwitter size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
        
        {/* Quick Links Section */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <hr className="w-12 border-green-400 my-2" />
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-green-400">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-green-400">About</a></li>
            <li><a href="#" className="text-gray-300 hover:text-green-400">Services</a></li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-semibold text-lg">Get in Touch</h3>
          <hr className="w-12 border-green-400 my-2" />
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-green-400">Contact Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-green-400">Get a Quote</a></li>
          </ul>
        </div>
      </section>
      
      {/* Bottom Section */}
      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} ScrapCo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
