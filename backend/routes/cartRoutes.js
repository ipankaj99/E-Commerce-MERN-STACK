import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'

const cartRouter=express.Router();


cartRouter.post('/add', userAuth, addToCart);
cartRouter.get('/get',userAuth , getUserCart)

cartRouter.post('/update', userAuth ,updateCart);

export default cartRouter;