import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

function Searchbar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === '/collection' && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  if (!(showSearch && visible)) return null;

  return (
    <div className="w-full max-w-xl mx-auto my-4 px-4">
      <div className="flex items-center bg-white rounded-md shadow-md border border-gray-300 px-3 py-2">
        <input
          type="text"
          placeholder="Search products, categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())} // allow trailing spaces but trim start
          className="flex-grow text-gray-800 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-3 py-2"
          autoFocus
        />
        <button
          onClick={() => {
            setSearch('');
            setShowSearch(false);
          }}
          aria-label="Close Search"
          className="ml-3 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img src={assets.cross_icon} alt="Close Icon" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
