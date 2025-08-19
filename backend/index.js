import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCd from './config/cloudinary.js';
const app=express();
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import userAuth from './middleware/userAuth.js';
import { addToCart, updateCart } from './controllers/cartController.js';
import { getUserCart } from './controllers/cartController.js';
import orderRouter from './routes/orderRoutes.js';
import { allOrders, codOrder, updateStatus, userOrders } from './controllers/orderController.js';
import adminAuth from './middleware/adminAuth.js';
connectCd();
const port=Number(process.env.PORT) || 4000


//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

// app.use('/api/cart', cartRouter);
app.post('/api/cart/add', userAuth, addToCart)
app.get('/api/cart/get', userAuth, getUserCart)
app.post('/api/cart/update', userAuth, updateCart)


app.post('/api/order/cod', userAuth, codOrder);
app.get('/api/order/getOrder', userAuth, userOrders);
app.get('/api/order/getAllOrder', adminAuth, allOrders);

app.post('/api/order/changeStatus', adminAuth, updateStatus);








connectDb().then(()=>
{
   app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
   })
}).catch((err)=>{
     console.error("Failed to connect to DB:", err);
})


