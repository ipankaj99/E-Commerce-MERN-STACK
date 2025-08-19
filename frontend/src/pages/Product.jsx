import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { id } = useParams();
 
  const { products, currency, AddToCart, count, setCount } = useContext(ShopContext);
  const [productItem, setProductItem] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isClick, setIsClick] = useState(false);


  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => (prev === 0 ? 0 : prev - 1));
  };

useEffect(() => {
    if (products && products.length > 0) {
        const foundProduct = products.find((item) => item._id.toString() === id);
        console.log(foundProduct);
        setProductItem(foundProduct || null);
    }
}, [id, products]);


  useEffect(() => {
    if (productItem && productItem.images && productItem.images.length > 0) {
      setProductImage(productItem.images[0]);
    }
  }, [productItem]);

  if (!productItem)
    return <p className="text-center mt-10 text-gray-700">Loading product...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: thumbnails */}
        <div className="flex md:flex-col gap-3 justify-center md:justify-start">
          {productItem.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover cursor-pointer rounded-md transition
                ${
                  image === productImage
                    ? "ring-2 ring-blue-600 ring-offset-2"
                    : "border border-gray-300 hover:opacity-80"
                }`}
              onClick={() => setProductImage(image)}
            />
          ))}
        </div>

        {/* Middle: large image */}
        <div className="flex-1 flex items-center justify-center">
          {productImage && (
            <img
              src={productImage}
              alt="selected"
              className="max-w-full max-h-[500px] object-contain rounded-md shadow-lg"
            />
          )}
        </div>

        {/* Right: details */}
        <div className="flex-1 flex flex-col justify-start space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{productItem.name}</h1>
          <div className="flex items-center space-x-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-5 h-5" />
            ))}
            <img src={assets.star_dull_icon} alt="dull star" className="w-5 h-5" />
            <p className="text-gray-600 ml-2">(122)</p>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {currency} {productItem.price}
          </h2>
          <p className="text-gray-700">{productItem.description}</p>

          <div>
            <h3 className="text-lg font-medium mb-2">Select Size</h3>
            <div className="flex gap-3 flex-wrap">
              {productItem.sizes.map((value) => (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedSize(value);
                    setCount(1);
                  }}
                  className={`px-4 py-2 border rounded-md transition
                    ${
                      selectedSize === value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                    }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Count Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={decrement}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl select-none"
              aria-label="decrement"
            >
              -
            </button>
            <p className="w-8 text-center text-lg font-semibold">{count}</p>
            <button
              onClick={increment}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xl select-none"
              aria-label="increment"
            >
              +
            </button>
          </div>

          <button
            disabled={!selectedSize || isClick}
            onClick={() => {
              setIsClick(true);
              AddToCart(id, selectedSize, count);
              setTimeout(() => {
                setIsClick(false);
              }, 1500);
            }}
            className={`w-full py-3 rounded-md text-white font-semibold transition
    ${
      selectedSize && !isClick
        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        : "bg-gray-400 cursor-not-allowed"
    }`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-12 space-y-4">
        <div className="border-b border-gray-300 pb-2">
          <h3 className="text-xl font-semibold text-gray-900">Description</h3>
          <p className="text-gray-600 mt-1">Reviews (122)</p>
        </div>
        <div className="text-gray-700 space-y-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
            ipsa debitis...
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            id ullam...
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
        <RelatedProducts
    products={products}
    category={productItem.category}
    subCategory={productItem.subCategory}
    currentId={productItem._id}
/>

      </div>
    </div>
  );
}

export default Product;
