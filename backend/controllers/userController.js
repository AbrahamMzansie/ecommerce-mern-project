import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import UserModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,
  });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
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
  const { name, email, password } = req.body;

  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Exist already");
  }

  const newUser = await UserModel.create({
    name,
    email,
    password,
  });
  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Successfully logged out",
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user._id;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({});
  if (users) {
    res.status(200).send(users);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const users = await UserModel.findById(req.params.id).select("-password");
  if (users) {
    res.status(200).send(users);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const deleteUser = await UserModel.findById(req.params.id);
  if (deleteUser) {
    if (deleteUser.isAdmin) {
      res.status(400);
      throw new Error("You cannot delete a admin user");
    }
  }
  const user = await UserModel.deleteOne({ _id: req.params.id });
  if (user.deletedCount === 1) {
    return res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (user) {
    console.log(req.body);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin =req.body.isAdmin ;    
    const updatedUser = await user.save();   
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
