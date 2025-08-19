// SideBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function SideBar() {
  const linkClasses =
    "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200";

  return (
    <div
      className="
        bg-white shadow-lg h-full
        w-16 sm:w-20 md:w-56 
        flex flex-col pt-8 px-3 
        border-r border-black
        transition-all duration-300
      "
    >
      <div className="flex flex-col gap-4">
        <NavLink
          to="/addProduct"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? "bg-gray-200" : ""}`
          }
        >
          <img src={assets.add_icon} alt="Add Item" className="w-6 h-6" />
          <p className="hidden md:block font-medium">Add Item</p>
        </NavLink>

        <NavLink
          to="/listProduct"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? "bg-gray-200" : ""}`
          }
        >
          <img src={assets.order_icon} alt="List Item" className="w-6 h-6" />
          <p className="hidden md:block font-medium">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? "bg-gray-200" : ""}`
          }
        >
          <img src={assets.order_icon} alt="Orders" className="w-6 h-6" />
          <p className="hidden md:block font-medium">Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
