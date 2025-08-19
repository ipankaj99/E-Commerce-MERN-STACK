import mongoose from "mongoose";
import productModel from "./ProductModel.js";
const userSchema= new mongoose.Schema({
    name:{
        type:String,
         required:true
     },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
         type:String,
        required:true,
    },
    cartData: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "productModel" },
      size: String,
       quantity: Number,
    },
],
}, {minimize:false})

const userModel= mongoose.models.userModel || mongoose.model('userModel', userSchema);
export default userModel;