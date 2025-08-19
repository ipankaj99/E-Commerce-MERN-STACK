import mongoose from 'mongoose';
import 'dotenv/config'
const connectDb=async()=>
{
   try{
       
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connecetd successfully");
   }
   catch(err)
   {
         console.log("Error in connection"+err);
          process.exit(1); 
   }
}

export default connectDb;