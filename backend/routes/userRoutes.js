import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const userRoutes = express.Router();
import {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} from "../controllers/userController.js";

userRoutes.route("/").post(registerUser).get(protect, isAdmin, getUsers);
userRoutes.post("/logout", logOutUser);
userRoutes.post("/login", authUser);
userRoutes
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
userRoutes
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);

export default userRoutes;
