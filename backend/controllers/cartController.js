// controllers/cartController.js
import userModel from '../models/userModel.js'
const addToCart = async (req, res) => {
  try {
    const { id, size, quantity } = req.body; // id = product id
    const userId = req.user; // from middleware

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if product with same id & size already exists in cart
    const existingIndex = user.cartData?.findIndex(
      (item) =>
        item?.itemId?.toString() === id.toString() && item.size === size
    );

    if (existingIndex > -1) {
      // product already exists → increase quantity
      user.cartData[existingIndex].quantity += Number(quantity);
    } else {
      // new entry → push
      user.cartData.push({
        itemId: id,
        size,
        quantity: Number(quantity),
      });
    }

    await user.save();

    // populate before sending response
    await user.populate("cartData.itemId");

    return res.status(200).json({
      message: "Cart updated successfully",
      cart: user.cartData, // fully populated
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { itemId, quantity } = req.body;
    console.log(itemId);

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItem = user.cartData.id(itemId); // find subdocument by _id
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity += Number(quantity);

    // Remove if quantity <= 0
    if (cartItem.quantity <= 0) {
      cartItem.deleteOne();
    }

    await user.save();

    // ✅ Populate before sending to frontend
    await user.populate("cartData.itemId");

    res.status(200).json({ cartData: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// getCart controller
const getUserCart = async (req, res) => {
  try {
    const userId = req.user;
    const user = await userModel.findById(userId).populate("cartData.itemId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.cartData); // populated cartData
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export {addToCart, getUserCart, updateCart}
