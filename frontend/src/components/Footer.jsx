import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-4 sm:mx-10 md:mx-16 lg:mx-20 mt-32 border-t border-slate-100 pt-16 pb-8 text-sm text-slate-600">
      
      {/* Grid Configuration Matrix Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-[2.5fr_1fr_1fr] gap-12 lg:gap-16 mb-12">
        
        {/* Left Section: Brand Intro */}
        <div className="flex flex-col gap-5">
          <img 
            onClick={() => handleNavigation(`/`)} 
            className="cursor-pointer w-10 sm:w-12 h-auto object-contain active:scale-95 transition-transform" 
            src={assets.logo} 
            alt="Company Brand Logo" 
          />
          <p className="w-full md:w-5/6 lg:w-4/5 text-slate-400 leading-relaxed font-normal">
            Your trusted healthcare partner ensuring a seamless bridge between verified top medical professionals and patients globally. Book slots, instant live chats, and manage history efficiently.
          </p>
        </div>

        {/* Center Section: Company Internal Links */}
        <div>
          <h3 className="text-slate-800 font-bold text-base tracking-wide mb-5 uppercase text-xs">Doclo</h3>
          <ul className="flex flex-col gap-3 font-medium text-slate-500">
            <li className="hover:text-indigo-600 transition-colors cursor-pointer w-fit" onClick={() => handleNavigation(`/`)}>Home</li>
            <li className="hover:text-indigo-600 transition-colors cursor-pointer w-fit" onClick={() => handleNavigation(`/about`)}>About Us</li>
            <li className="hover:text-indigo-600 transition-colors cursor-pointer w-fit" onClick={() => handleNavigation(`/contact`)}>Contact Us</li>
            <li className="hover:text-indigo-600 transition-colors cursor-pointer w-fit" onClick={() => handleNavigation(`/privacy-policy`)}>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section: Contact Touchpoints */}
        <div>
          <h3 className="text-slate-800 font-bold text-base tracking-wide mb-5 uppercase text-xs">Get In Touch</h3>
          <ul className="flex flex-col gap-3 font-medium text-slate-500">
            <li className="hover:text-slate-800 transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +92 (300) 123-4567
            </li>
            <li className="hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-2 break-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@doclo.com
            </li>
          </ul>
        </div>

      </div>

      {/* Underline Copyright Bar Context footer */}
      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
        <p>© 2024-{currentYear} Doclo. All Rights Reserved.</p>
        <p className="flex gap-4">
          <span className="cursor-pointer hover:text-slate-600">Terms of Service</span>
          <span className="cursor-pointer hover:text-slate-600">Cookie Settings</span>
        </p>
      </div>

    </div>
  );
};

export default Footer;