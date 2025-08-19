import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import axios from 'axios';
import { toast } from "react-toastify";
export const ShopContext = createContext();

function ShopContextProvider({ children }) {
  const currency = "$";
  const delivery_fee = 10;
  const backendURL=import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);

// On initial load, restore
useEffect(() => {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) setCartItems(JSON.parse(savedCart));
}, []);

useEffect(() => {
  const total = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0) * (item.itemId?.price || 0),
    0
  );
  setTotalPrice(total);
}, [cartItems]);



  const [orders, setOrders] = useState([]); // <- store all previous orders
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [products, setProducts]=useState([]);
   const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [changes, setChanges]=useState(false);

    const listProduct = async () => {
    try {
     
      const response = await axios.get('http://localhost:4000/api/product/list');

      if (response.status !== 200) {
       toast("Something went wrong, refresh the page");
        
      } else {
      console.log(response.data.allProducts);
        setProducts(response.data.allProducts);
      }
    } catch (err) {
      toast("Something went wrong: " + err.message);
    }
  };

  useEffect(() => {
    listProduct();
  }, []);

 
  
  const paymentOptions = [
    { id: "stripe", img: assets.stripe_logo, label: "Stripe" },
    { id: "razorpay", img: assets.razorpay_logo, label: "Razorpay" },
    { id: "cod", label: "Cash On Delivery" },
  ];

const increment = async (itemId) => {
  // 1️⃣ Update UI instantly
  setCartItems(prev =>
    prev.map(item =>
      item._id === itemId 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
      setChanges(!changes);


  setTotalPrice(prev =>
    cartItems.reduce(
      (acc, item) =>
        item._id === itemId 
          ? acc + (item.quantity + 1) * (item.itemId?.price || 0)
          : acc + (item.quantity * (item.itemId?.price || 0)),
      0
    )
  );

  // 2️⃣ Call backend to persist change
  try {
    await axios.post(
      "http://localhost:4000/api/cart/update",
      { itemId, quantity: 1 },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
    toast("Failed to update cart on server");
  }
};
const decrement = async (itemId) => {
  // 1️⃣ Update UI instantly
  setCartItems(prev =>
    prev.map(item =>
      item._id === itemId 
        ? { ...item, quantity: item.quantity -1 }
        : item
    )
   
  );
   setChanges(!changes);

  setTotalPrice(prev =>
    cartItems.reduce(
      (acc, item) =>
        item._id === itemId 
          ? acc + (item.quantity -1 ) * (item.itemId?.price || 0)
          : acc + (item.quantity * (item.itemId?.price || 0)),
      0
    )
  );

  // 2️⃣ Call backend to persist change
  try {
    await axios.post(
      "http://localhost:4000/api/cart/update",
      { itemId, quantity: -1 },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
    toast("Failed to update cart on server");
  }
};




// const decrement = async (itemId, size) => {
//   // 1️⃣ Update UI instantly
//   setCartItems(prev =>
//     prev
//       .map(item =>
//         item.itemId._id === itemId && item.size === size
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//       .filter(item => item.quantity > 0) // remove items with 0 quantity
//   );

//   setTotalPrice(prev =>
//     cartItems.reduce(
//       (acc, item) =>
//         item.itemId._id === itemId && item.size === size
//           ? acc + (item.quantity - 1) * (item.itemId?.price || 0)
//           : acc + (item.quantity * (item.itemId?.price || 0)),
//       0
//     )
//   );

//   // 2️⃣ Call backend to persist change
//   try {
//     await axios.post(
//       "http://localhost:4000/api/cart/update",
//       { itemId, size, quantity: -1 },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     toast("Failed to update cart on server");
//   }
// };



 async function AddToCart(id, size, quantity) {
        if (!token) {
    toast("You must login first!");
    return;
  }
  try {

    const response = await axios.post(
      "http://localhost:4000/api/cart/add",
       { id, size, quantity: Number(quantity) },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (response.status >= 200 && response.status<=299) {
      setCount(0);
      toast("Added to cart Successfully");
      setChanges(!changes);
      
    } else {
      setCount(0);
      toast("Something went wrong, Try Again");
    }
  } catch (err) {
    console.error("AddToCart error:", err.response?.data || err.message);
    setCount(0);
    toast("Something went wrong, Try Again"+ err.message);
  }
}


  function placeOrder() {
    if (cartItems.length === 0 || !paymentMethod) return;

    // Add cart items to orders with payment method and date
    const newOrder = cartItems.map(item => ({
      ...item,
      paymentType: paymentMethod,
      date: new Date().toISOString(),
    }));

    setOrders(prev => [...prev, ...newOrder]); // 
    setCartItems([]); 
    setPaymentMethod(""); 
    setTotalPrice(0);
    navigate('/orders');
  }

  function clearCart() {
    setCartItems([]);
  }

  const value = {
    products,
    increment, decrement,
    currency,
    delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    AddToCart, cartItems, setCartItems,
    orders, setOrders, // expose orders
    count, setCount,
    totalPrice, setTotalPrice,
    navigate, token,setToken,
    paymentMethod, setPaymentMethod, paymentOptions,
    placeOrder, clearCart, backendURL, changes,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export default ShopContextProvider;
