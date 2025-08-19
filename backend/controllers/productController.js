import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/ProductModel.js';

const addProduct = async (req, res) => {
  try {
    console.log("add product called");
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 =req.files.image1 && req.files.image1[0];
    const image2 =req.files.image2 && req.files.image2[0];
    const image3 =req.files.image3 && req.files.image3[0];
    const image4 =req.files.image4 && req.files.image4[0];

    if(!image1 && !image2 && !image3 && !image4)
    {
        return res.status(400).json({message:"Please add atleast one image"});
    }

    const images=[image1, image2, image3, image4].filter((item)=>item!=undefined)

    let images_URL=await Promise.all(
        images.map(async(item)=>{
            let result=await cloudinary.uploader.upload(item.path, {resource_type:'image'});
            return result.secure_url;
        })

    )

    const productData=await productModel.create({
        name,
        description,
        category,
        price:Number(price),
        subCategory,
        bestseller:Boolean(bestseller),
      sizes: Array.isArray(sizes) ? sizes : [sizes],
        images:images_URL,
        date:new Date()
    })
    if(!productData)
    {
        return res.status(400).json({message:"Product dont added, try again"});
    }
    
    res.status(200).json({message:"Product added successfully"});

  } catch (err) {
    
    console.log(err.message);
    res.status(500).json({message:"Internal server Error"+ err.message})
  }
};

const removeProduct = async (req, res) => {
  try{
    const {id}=req.params;
    const deletedProduct= await productModel.findByIdAndDelete(id);
    if(!deletedProduct)
    {
      return res.status(404).json({message:"Product not found"});
    }
    res.status(200).json({message:"Deleted Successfully"});

  }catch(err)
  {
    res.status(500).json({message:"Internal server error"+err.message});
  }
  
};

const getProduct = async (req, res) => {
  try{
    const {id}=req.params;

    const product=await productModel.findById(id);

    if(!product)
    {
      return res.status(404).json({message:"cant find the product"});
    }
    return res.status(200).json({product})

  }catch(err)
  {
      res.status(500).json({message:"Internal server error"+err.message});
  }
  
};

const listProduct = async (req, res) => {
   try {
       const allProducts = await productModel.find();

       if (allProducts.length === 0) {
           return res.status(200).json({ message: "No products available", allProducts: [] });
       }

       return res.status(200).json({ allProducts });
   } catch (err) {
       return res.status(500).json({ message: "Internal server error: " + err.message });
   }
};


export { listProduct, addProduct, removeProduct, getProduct };
