import express from "express";
const productRoutes = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";

import ProductModel from "../models/productModel.js";

productRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find({});
    res.json(products);
  })
);

productRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
     return res.json(product);
    }

    res.status(404).json({ message: "Product not found" });
  })
);

export default productRoutes;
