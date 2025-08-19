import express from 'express';
import  {codOrder, stripeOrder, razorpayOrder, allOrders, userOrders, updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import userAuth from '../middleware/adminAuth.js'
const orderRouter=express.Router();

orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// orderRouter.post('/cod', userAuth  ,codOrder);
orderRouter.post('/stripe', userAuth  ,stripeOrder);
orderRouter.post('/razorpay', userAuth  ,razorpayOrder);


orderRouter.post('/userorders', userAuth, userOrders);

export default orderRouter;


