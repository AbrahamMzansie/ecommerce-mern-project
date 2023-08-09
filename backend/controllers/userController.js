import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import UserModel from "../models/userModel.js";


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,    
  });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET , {
        expiresIn: "30d"
    });
    res.cookie("jwt" , token , {
        sameSite : "strict",
        secure :process.env.NODE_ENV != "development",
        maxAge : 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
    })
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
 
});

const registerUser = asyncHandler(async (req, res) => {
  // const register = await UserModel.findById(req.params.id);
  // if (register) {
  return res.send("register User");
  // }
  // res.status(404);
  // throw new Error("User not found");
});

const logOutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt" , "" , {
        httpOnly : true,
        expires : new Date(0),

    })
    res.status(200).json({
      message: "Successfully logged out"
    });
});

const getUserProfile = asyncHandler(async (req, res) => {
  // const products = await UserModel.find({});
  res.send("user profile");
});

const updateUserProfile = asyncHandler(async (req, res) => {
  // const products = await UserModel.find({});
  res.send("update user profile");
});

const getUsers = asyncHandler(async (req, res) => {
  // const products = await UserModel.find({});
  res.send("get users");
});

const getUserById = asyncHandler(async (req, res) => {
  // const products = await UserModel.find({});
  res.send("get users by id");
});

const deleteUser = asyncHandler(async (req, res) => {
  // const products = await UserModel.find({});
  res.send("user deleted successfully");
});

const updateUser = asyncHandler(async (req, res) => {
  // const products = await UserModel.find({});
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
