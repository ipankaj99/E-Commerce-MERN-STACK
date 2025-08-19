import React, { useContext, useEffect, useState } from 'react';
;import Title from './Title';
import ProductItem from './ProductItem';
import { ShopContext } from '../context/ShopContext';

function BestSeller() {
  const [bestProducts, setBestProducts] = useState([]);
  const {products}=useContext(ShopContext);
  useEffect(() => {
    const productsData = products.filter((item) => item.bestseller === true);
    setBestProducts(productsData.slice(0, 5));
  }, [products]);

  return (
    <div className="px-6 sm:px-[6vw] lg:px-[10vw] py-10 bg-white">
      <div className="text-center mb-8">
        <Title text1="BEST" text2="SELLERS___" />
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rerum?
        </p>
      </div>

      {bestProducts && bestProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {bestProducts.map((item) => (
            <ProductItem key={item._id || item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">No Best Sellers Available</p>
      )}
    </div>
  );
}

export default BestSeller;
