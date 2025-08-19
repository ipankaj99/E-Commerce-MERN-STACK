import React, { useContext, useEffect} from "react";
import { useForm } from "react-hook-form";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { ListOrderedIcon } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
function PlaceOrder() {
  const { totalPrice, navigate, paymentOptions, placeOrder , cartItems, setCartItems,  token, products} = useContext(ShopContext);



  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange", // ensures validation updates immediately
  });

  // watch paymentMethod selection
  const selectedPayment = watch("paymentMethod");

const onSubmit = async (data) => {
  try {
    let orderItems = [];

    // Loop through cart items
    for (const cartItem of cartItems) {
      const { itemId, size, quantity } = cartItem;

      console.log("cart items is"+cartItems);

      // Check if product still exists in DB
    const product = products.find((p) => p._id === itemId._id);

 
      console.log(product +"is");
      console.log(cartItems+ " is")
      if (!product) {
        console.warn(`Product with id ${itemId._id} not found. Skipping...`);
        continue; // skip this cart item
      }


      // Push valid item to orderItems
      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        size,
        quantity,
        image:product.images[0],
      
      });
    }

    if (orderItems.length === 0) {
      alert("No valid items available for order.");
      return;
    }

    // Combine delivery info into a single address object
    const addressObj = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      street: data.street,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      country: data.country,
    };

    // Prepare final order payload
    const orderPayload = {
      items: orderItems,
      amount: orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      address: addressObj, // now sending a single object
      paymentMethod: data.paymentMethod,
    };

    // Send to backend
    const response = await axios.post(
      "http://localhost:4000/api/order/cod",
      orderPayload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Order placed:", response.data);
    toast.success("Order placed successfully!");
    setCartItems([]);
    
    navigate("/orders");
  } catch (err) {
    console.error("Order error:", err.response?.data || err.message);
    toast.error(
      "Something went wrong while placing order: " +
        (err.response?.data?.message || err.message)
    );
  }
};




  return (
    <div className="flex gap-10 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-3">
        {/* DELIVERY INFO */}
        <Title text1="DELIVERY" text2="INFORMATION___" />

        <input
          type="text"
          placeholder="First name"
          className="border p-2 w-full rounded"
          {...register("firstName", {
            required: "First name is required",
            pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters are allowed" },
          })}
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

        <input
          type="text"
          placeholder="Last name"
          className="border p-2 w-full rounded"
          {...register("lastName", {
            required: "Last name is required",
            pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters are allowed" },
          })}
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Street"
          className="border p-2 w-full rounded"
          {...register("street", { required: "Street is required" })}
        />
        {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border p-2 w-full rounded"
            {...register("city", {
              required: "City name is required",
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters are allowed" },
            })}
          />
          <input
            type="text"
            placeholder="State"
            className="border p-2 w-full rounded"
            {...register("state", {
              required: "State is required",
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters are allowed" },
            })}
          />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="ZipCode"
            className="border p-2 w-full rounded"
            {...register("zipcode", {
              required: "Zipcode is required",
              pattern: { value: /^[0-9]{5,6}$/, message: "Enter a valid zipcode" },
            })}
          />
          <input
            type="text"
            placeholder="Country"
            className="border p-2 w-full rounded"
            {...register("country", {
              required: "Country name is required",
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters are allowed" },
            })}
          />
        </div>

        <input
          type="text"
          placeholder="Phone No."
          className="border p-2 w-full rounded"
          {...register("phone", {
            required: "Phone number is required",
            pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" },
          })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        {/* CART TOTAL */}
        <div>
          <Title text1="CART" text2="TOTALS___" />
          <div className="flex justify-between border p-3 rounded">
            <p>Total</p>
            <p className="font-semibold">${totalPrice}</p>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div>
          <Title text1="PAYMENT" text2="METHOD___" />
          <div className="flex flex-col gap-3">
            {paymentOptions.map((option) => (
              <label
                key={option.id}
                className="p-3 border rounded cursor-pointer flex items-center gap-3"
              >
                <input
                  type="radio"
                  value={option.id}
                  {...register("paymentMethod", { required: "Select a payment method" })}
                  className="mr-2"
                />
                {option.img && <img src={option.img} alt={option.label} className="w-16" />}
                <p>{option.label}</p>
              </label>
            ))}
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={!isValid || !selectedPayment}
          className={`w-full py-2 rounded text-white transition 
            ${isValid && selectedPayment ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
          `}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default PlaceOrder;
