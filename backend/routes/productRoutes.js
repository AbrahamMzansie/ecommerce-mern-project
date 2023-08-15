import express from "express";
const productRoutes = express.Router();
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview
} from "../controllers/productController.js";

productRoutes.route("/").get(getProducts).post(protect, isAdmin, createProduct);
productRoutes
  .route("/:id")
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);
  productRoutes.route("/:id/review").post(protect, createProductReview);

export default productRoutes;
