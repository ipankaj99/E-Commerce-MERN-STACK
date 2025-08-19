import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Minus, Plus } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

function Cart() {
  const {
    cartItems,
    setCartItems,
    currency,
    increment,
    decrement,
    totalPrice,
    setTotalPrice,
    navigate,
    token, changes
  } = useContext(ShopContext);

  // Fetch cart on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
          
         
        const response = await axios.get("http://localhost:4000/api/cart/get", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // filter out invalid items
         
          setCartItems(response.data);
          toast("Cart fetched successfully");
        } else {
          toast("Something went wrong, Try Again");
        }
      } catch (err) {
        console.error("GetCart error:", err.response?.data || err.message);
        toast("Something went wrong, Try Again");
      }
    };

    fetchData();
  }, []);

  // Calculate total price
 
  if (!cartItems || cartItems.length === 0) {
    return (
      <p className="text-center text-gray-500 font-medium mt-10">
        No items in cart
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="space-y-6 pb-28">
        {cartItems.map((item) =>
          item.itemId ? (
            <div
              key={`${item.itemId._id}-${item.size}`}
              className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-md w-28 h-28">
                <img
                  src={item.itemId?.images?.[0] || "/placeholder.png"}
                  alt={item.itemId?.name || "Product"}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-[200px]">
                <p className="font-semibold text-lg">
                  {item.itemId?.name || "Product name missing"}
                </p>
                <p className="text-gray-500 text-sm mt-1 line-clamp-3">
                  {item.itemId?.description || "No description"}
                </p>

                {/* Info */}
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-700 flex-wrap">
                  <span className="bg-gray-100 px-3 py-1 rounded-md">
                    Size: {item.size}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-md">
                    Price: {currency}
                    {item.itemId?.price || 0}
                  </span>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">
                    <button
                      onClick={() =>
                        decrement(item._id)
                      }
                      className="bg-gray-200 hover:bg-gray-300 p-1 rounded transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold">{item.quantity || 0}</span>
                    <button
                      onClick={() =>
                        increment(item._id)
                      }
                      className="bg-gray-200 hover:bg-gray-300 p-1 rounded transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}

        {/* Sticky Cart Summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-lg">Total:</p>
            <p className="font-bold text-xl text-green-600">
              {currency}
              {totalPrice}
            </p>
          </div>
          <button
            onClick={() => navigate("/place-order")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
