import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

function Footer() 
{
  const [visible, setVisible]=useState(true);
  const location=useLocation();
   useEffect(()=>{
      if(location.pathname=='/cart' || location.pathname=='/place-order')
      {
            setVisible(false);
      }
      else{
        setVisible(true);
      }
   })

  return visible ? (
    <footer className="bg-gray-900 text-gray-300 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto py-10 flex flex-col md:flex-row justify-between gap-10">
        
        {/* Left part */}
        <div className="md:flex-1">
          <div className="mb-6">
            <img src={assets.logo} alt="Logo" className="w-28 sm:w-32 object-contain" />
          </div>
          <p className="text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus in quos repellat saepe error. Officiis ab eveniet ratione dolor et ea, adipisci fuga voluptas quo possimus, alias enim cumque praesentium nobis veritatis voluptate! Officia necessitatibus quod alias ex vero quas.
          </p>
        </div>

        {/* Right part */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:flex-1 md:justify-end">
          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm sm:text-base">Company</h3>
            <ul className="space-y-2 text-xs sm:text-sm cursor-pointer">
              <li className="hover:text-white transition">Home</li>
              <li className="hover:text-white transition">About Us</li>
              <li className="hover:text-white transition">Delivery</li>
              <li className="hover:text-white transition">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm sm:text-base">Contact Us</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>+12 73322-34347</li>
              <li>contact@infoforward.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <hr className="border-gray-700" />
      <div className="text-center text-gray-500 text-xs sm:text-sm py-4">
        Copyright © 2025 @ forever.com - All Rights Reserved
      </div>
    </footer>
  ): null
}

export default Footer;
