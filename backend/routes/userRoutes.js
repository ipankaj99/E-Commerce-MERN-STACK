import express from "express";
import { loginUser, createUser, adminLogin } from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.post('/login', loginUser)
userRouter.post('/signup', createUser);
userRouter.post('/admin', adminLogin);



export default userRouter