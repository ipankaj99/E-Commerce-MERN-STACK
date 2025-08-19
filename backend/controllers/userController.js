import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const generateToken=(id)=>
{
   const token=jwt.sign({id}, process.env.JWT_SECRET_KEY, { expiresIn :"1d" });
   return token;
}
const loginUser=async(req, res)=>{
  try{
    
    const {email, password}=req.body;
    if(!email || !password)
    {
        return res.status(400).json({message:"All fileds are required"});
    } 

    const findEmail=await userModel.findOne({email});

    //find email
    if(!findEmail)
    {
        return res.status(404).json({message:"Account not exists with this email"});
    }

    const matchPassword=await bcrypt.compare(password, findEmail.password);
    if(!matchPassword)
    {
        return res.status(401).json({message:"password is wrong"});
    }
const token=generateToken(findEmail._id);
        return res.status(200).json({message:"User logged in successfully", token:token});


  }catch(err)
  {
     return res.status(500).json({message:"Try again something went wrong"+ err.message});
  }
}


const createUser=async(req, res)=>{
    try{
        
      const {name, email, password}=req.body;
      if(!name || !email || !password)
        {
            return res.status(400).json({message:"All feilds are required"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

      const findEmail=await userModel.findOne({email:email});
      if(findEmail)
      {
        return res.status(409).json({message:"User already exist"});
      }

       if(password.length<8)
        {
            return res.status(401).json({message:"Please enter a strong password"});
        }
      const hashpassword=await bcrypt.hash(password, Number(process.env.PASSWORD_HASH));

      const createdUser=await userModel.create({
        name, email, password:hashpassword
      })
      if(createdUser)
      {
        const token=generateToken(createdUser._id);
        return res.status(201).json({message:"User create successfully", token:token});
      }
         res.status(400).json({message:"Try again"});
    }
    catch(err)
    {
         res.status(500).json({message:"Try again"+ err.message});
    }
}

const adminLogin=async(req, res)=>{
 try{
   const {email, password}=req.body;

  if(!email || !password)
  {
    return res.status(402).json({message:"All fields are required"});
  }

  if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD)
  {
       return res.status(402).json({message:"Email or password does not match"})
  }
  const token=jwt.sign({email,role:"admin"}, process.env.JWT_SECRET_KEY, { expiresIn : "2h"});
  return res.status(200).json({token});


 }
 catch(err)
 {
       res.status(500).json({message:"Something went wrong"+err.message});
 }

}


export {loginUser , createUser, adminLogin};