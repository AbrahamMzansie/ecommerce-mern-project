import asyncHandler from "../middleware/asyncHandler.js";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);    
      req.user = await UserModel.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
});

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, you are not admin");
  }
};
