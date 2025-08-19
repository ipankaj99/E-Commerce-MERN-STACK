import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { ShopContext } from '../context/ShopContext.jsx';

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // ✅ Properly destructure from context
  const { setShowSearch, showSearch, cartItems, token, setToken, setCartItems } = useContext(ShopContext);
  const navigate=useNavigate();
  

  
  const logOut=()=>{
     localStorage.removeItem('token');
     setToken('');
     setCartItems([]);
     navigate('/login');
  }

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md transition-colors duration-200 ${
      isActive
        ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
        : 'text-gray-700 hover:text-blue-600'
    }`;

  return (
    <div className="shadow-sm bg-white">
      <div className="flex items-center justify-between py-5 px-4 sm:px-[5vw] lg:px-[9vw] font-medium">
        
        {/* Logo */}
        <NavLink to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-36 cursor-pointer"
          />
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden sm:flex gap-6 text-sm">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/collection" className={linkClasses}>Collection</NavLink>
          <NavLink to="/about" className={linkClasses}>About</NavLink>
          <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
        </ul>

        {/* Right Side (Desktop) */}
        <div className="hidden sm:flex items-center gap-5">
          {/* Search */}
          <img
            src={assets.search_icon}
            alt="Search"
            onClick={() => !showSearch && setShowSearch(true)}
            className="w-5 cursor-pointer hover:opacity-80 transition"
          />

          {/* Profile Dropdown */}
          <div className="relative group">
                       <img 
            onClick={()=> token ? null : navigate('/login')}
              src={assets.profile_icon}
              alt="Profile"
              className="w-6 cursor-pointer hover:opacity-80 transition"
            />
             {token && (
    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
      <ul className="flex flex-col text-sm">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Profile</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={()=>navigate('/orders')}
        >Orders</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logOut}>Logout</li>
      </ul>
    </div>
  )}
</div>
          
            
          

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-6 cursor-pointer hover:opacity-80 transition"
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5" // Hamburger icon
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-2 text-sm border-t border-gray-200">
          <NavLink to="/" className={linkClasses} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/collection" className={linkClasses} onClick={() => setMobileMenuOpen(false)}>Collection</NavLink>
          <NavLink to="/about" className={linkClasses} onClick={() => setMobileMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={linkClasses} onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
          <hr className="my-2" />
          <span className="px-3 py-2">My Profile</span>
          <span className="px-3 py-2">Orders</span>
          <span className="px-3 py-2">Logout</span>
          <Link to="/cart" className="flex items-center gap-2 mt-2" onClick={() => setMobileMenuOpen(false)}>
            <img src={assets.cart_icon} alt="Cart" className="w-5" />
            <span>Cart {cartItems.length}</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
