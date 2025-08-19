import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


function ListProduct({token}) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

 const deleteProduct = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await axios.delete(`http://localhost:4000/api/product/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Successfully deleted");
      setProducts(prev => prev.filter((item) => item._id !== id));
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    toast.error("Server Error: " + message);
  }
};

  

  const listProduct = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/product/list');

      if (response.status !== 200) {
        setError("Something went wrong, refresh the page");
        
      } else {
        setError(null);
        setProducts(response.data.allProducts);
      }
    } catch (err) {
      setError("Something went wrong: " + err.message);
    }
  };

  useEffect(() => {
    listProduct();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h2>
                  <p className="text-gray-500 mb-2">{product.category}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-blue-600 font-bold text-lg">${product.price}</p>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={()=>deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products added yet</p>
      )}
    </div>
  );
}

export default ListProduct;
