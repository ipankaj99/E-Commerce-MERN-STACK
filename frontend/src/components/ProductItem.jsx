import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

function ProductItem({ item }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${item._id}`}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-white flex flex-col max-w-[180px] mx-auto"
    >
      <div className="w-full aspect-square overflow-hidden">
        <img
          src={item.images?.[0]}
          alt={item.name || "Image not available"}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-900 truncate">{item.name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
        <p className="text-lg font-bold text-gray-900 mt-auto pt-4">
          <span>{currency}</span>{item.price}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;
