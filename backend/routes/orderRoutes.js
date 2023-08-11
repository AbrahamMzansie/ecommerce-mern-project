import express from "express";
const orderRoutes = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from "../controllers/orderController.js";
import { isAdmin , protect } from "../middleware/authMiddleware.js";

orderRoutes.route("/").post(protect, addOrderItems).get(protect, isAdmin, getAllOrders);
orderRoutes.route("/mine").get(protect , getMyOrders);
orderRoutes.route("/:id").get(protect  ,  getOrderById);
orderRoutes.route("/:id/pay").put(protect , updateOrderToPaid);
orderRoutes.route("/:id/delivered").put(protect ,isAdmin ,  updateOrderToDelivered);

export default orderRoutes;
