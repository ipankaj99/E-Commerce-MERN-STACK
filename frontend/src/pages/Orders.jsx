import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Orders() {
  const { currency, token } = useContext(ShopContext);
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/order/getOrder", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setOrder(response.data.userOrders);
        } else {
          toast.error("Error: " + response.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err.response?.data || err.message);
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
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-4">
                {/* Order ID + Date */}
                <div>
                  <h2 className="text-lg font-bold">Order #{order._id.slice(-6)}</h2>
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

                {/* ✅ Status badge (top-right) */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b pb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        {currency}
                        {item.price} x {item.quantity} = {currency}
                        {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-4">
                <p>
                  <strong>Amount:</strong> ₹{order.amount}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {order.address.firstName} {order.address.lastName},{" "}
                  {order.address.street}, {order.address.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
