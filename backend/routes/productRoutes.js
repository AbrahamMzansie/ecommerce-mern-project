import express, { Router } from "express";
const productRoutes = express.Router();
import { getProducts , getProductById } from "../controllers/productController.js";

productRoutes.route("/" ).get(getProducts);
productRoutes.route("/:id").get(getProductById);

export default productRoutes;
