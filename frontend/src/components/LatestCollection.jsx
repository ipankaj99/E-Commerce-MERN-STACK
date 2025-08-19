import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {
  const [recent_Products, setRecent_Products] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    console.log("error");
    setRecent_Products(products.slice(0, 10));
  }, [products]);

  return (
    <div className="px-6 sm:px-[6vw] lg:px-[10vw] py-10">
      <div className="text-center mb-8">
        <Title text1="LATEST" text2="COLLECTIONS___" />
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rerum?
        </p>
      </div>

      {recent_Products && recent_Products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {recent_Products.map((item) => (
            <ProductItem key={item._id || item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Latest Collection Available</p>
      )}
    </div>
  );
}

export default LatestCollection;
