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
orderRoutes.route("/mine").get(protect , isAdmin , getMyOrders);
orderRoutes.route("/:id").get(protect  ,  getOrderById);
orderRoutes.route("/:id/pay").put(protect , updateOrderToPaid);
orderRoutes.route("/:id/deliver").put(protect , updateOrderToDelivered);

export default orderRoutes;
