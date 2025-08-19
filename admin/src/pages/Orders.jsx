import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Orders({ token }) {
  const currency = "$";
  const [orders, setOrder] = useState([]);

  const changeStatus=async(e, id)=>{
     try {
       const value=e.target.value;
        const response = await axios.post(
          "http://localhost:4000/api/order/changeStatus",{value, id},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast("Successfully updated");
        } else {
          toast.error("Error: " + response.data.message);
        }
      } catch (err) {
        console.error(
          "Failed to update orders:",
          err.response?.data || err.message
        );
        toast.error("Something went wrong: " + err.message);
      }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/order/getAllOrder",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setOrder(response.data.userOrders);
        } else {
          toast.error("Error: " + response.data.message);
        }
      } catch (err) {
        console.error(
          "Failed to fetch orders:",
          err.response?.data || err.message
        );
        toast.error("Something went wrong: " + err.message);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  // ✅ helper: color-coded status badge
  const getStatusStyle = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-yellow-100 text-yellow-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-6 shadow-md bg-white"
            >
              {/* Header: Order ID + Date + Status */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <select onChange={(e)=>changeStatus(e,order._id)} >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Dispatch">Dispatch</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delieverd</option>

                </select>
              </div>

              {/* Order Items */}
              <div className="space-y-3 border-t border-b py-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {currency}
                        {item.price} x {item.quantity} = {currency}
                        {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p>
                  <strong className="text-gray-700">Amount:</strong>{" "}
                  ₹{order.amount}
                </p>
                <p>
                  <strong className="text-gray-700">Payment:</strong>{" "}
                  {order.paymentMethod}
                </p>

                {/* Address section styled like label */}
                <div className="sm:col-span-2 mt-2 bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-1">Shipping Address</p>
                  <p>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state} -{" "}
                    {order.address.zipcode}
                  </p>
                  <p>{order.address.country}</p>
                  <p className="text-gray-600">📞 {order.address.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
