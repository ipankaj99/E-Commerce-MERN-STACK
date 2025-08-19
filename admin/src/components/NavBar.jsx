import React from 'react';
import { assets } from '../assets/assets';

function NavBar({setToken}) {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-sky-200 shadow-md z-50">
      {/* Logo */}
      <img src={assets.logo} alt="Logo" className="h-10 w-auto" />

      {/* Logout Button */}
      <button 
      onClick={()=>
      {
        setToken(null);
        localStorage.removeItem('token');

      }
      }
      className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300">
        
        Logout
      </button>
    </div>
  );
}

export default NavBar;
