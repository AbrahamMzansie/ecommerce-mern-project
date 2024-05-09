import express from "express";
const productRoutes = express.Router();
// import requestIp from 'request-ip';
// import useragent from 'express-useragent';
// import  geoip from 'geoip-lite';
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getTopProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";

productRoutes.route("/").get(getProducts).post(protect, isAdmin, createProduct);
productRoutes.get('/top', getTopProducts);
productRoutes
  .route("/:id")
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);
productRoutes.route("/:id/review").post(protect, createProductReview);

export default productRoutes;
