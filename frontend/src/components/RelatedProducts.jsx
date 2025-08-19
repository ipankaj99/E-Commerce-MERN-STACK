import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

function RelatedProducts({ products, category, subCategory, currentId }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) {
      setRelated([]);
      return;
    }

    const newProducts = products
      .filter(
        (item) =>
          (item.category === category || item.subCategory === subCategory) &&
          item._id !== currentId // exclude current product
      )
      .slice(0, 5); // limit max 5 products

    setRelated(newProducts);
  }, [products, category, subCategory, currentId]);

  if (related.length === 0) {
    return <p className="text-center text-gray-600">No related products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {related.map((product) => (
        <ProductItem key={product._id || product.id} item={product} />
      ))}
    </div>
  );
}

export default RelatedProducts;
