
import asyncHandler from "../middleware/asyncHandler.js";
import ProductModel from "../models/productModel.js";


const getProducts = asyncHandler(async (req , res)=>{
    const products = await ProductModel.find({});
    res.json(products);
})


const getProductById = asyncHandler(async (req , res)=>{
    const product = await ProductModel.findById(req.params.id);
    if (product) {
     return res.json(product);
    }
    res.status(404);
    throw new Error("Product not found");
})

export {getProducts , getProductById}