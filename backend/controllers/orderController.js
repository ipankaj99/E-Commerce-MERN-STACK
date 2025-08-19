import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
const codOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId  = req.user; // ✅ fixed (no parenthesis)
    console.log(userId);
  console.log("i am executed");
    const orderData = await orderModel.create({
      userId,
      items,
      amount : Number(amount),
      address,
      paymentMethod: "COD",
      payment: false,
      date: new Date(), // ✅ fixed
    });

    // ✅ clear user cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.status(200).json({ message: "Order placed successfully", order: orderData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

const stripeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId  = req.user; // ✅ fixed (no parenthesis)
    console.log(userId);
  console.log("i am executed");
    const orderData = await orderModel.create({
      userId,
      items,
      amount : Number(amount),
      address,
      paymentMethod: "STRIPE",
      payment: true,
      date: new Date(), // ✅ fixed
    });

    // ✅ clear user cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.status(200).json({ message: "Order placed successfully", order: orderData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
const razorpayOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId  = req.user; // ✅ fixed (no parenthesis)
    console.log(userId);
  console.log("i am executed");
    const orderData = await orderModel.create({
      userId,
      items,
      amount : Number(amount),
      address,
      paymentMethod: "RAZORPAY",
      payment: true,
      date: new Date(), // ✅ fixed
    });

    // ✅ clear user cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.status(200).json({ message: "Order placed successfully", order: orderData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


const allOrders=async(req, res)=>{
    try{
      const userOrders = await orderModel.find();
      if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ message: "No orders founds" });
    }
      return res.status(200).json({userOrders});
    }
    catch(err)
    {
       return res.status(500).json({message:"Something went wrong, Internal server error"+err.message});
    }

}

const userOrders=async(req, res)=>{
    try{
  console.log("order get executed");
      const id=req.user;


      const userOrders = await orderModel.find({ userId: id });

      if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
      return res.status(200).json({userOrders});
    }
    catch(err)
    {
       return res.status(500).json({message:"Something went wrong, Internal server error"+err.message});
    }

}

// order status update
const updateStatus = async (req, res) => {
  try {
    const { value, id } = req.body; // value = new status, id = orderId

    // Find the order
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update status
    order.status = value;

    // Save updated order
    await order.save();

    return res.status(200).json({ message: "Status updated successfully", order });
  } catch (err) {
    console.error("Error updating order status:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {codOrder, stripeOrder, razorpayOrder, allOrders, userOrders, updateStatus}





