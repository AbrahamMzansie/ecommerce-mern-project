import asyncHandler from "../middleware/asyncHandler.js";
import OrderModel from "../models/orderModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new OrderModel({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const myOrders = await OrderModel.find({ user: req.user._id });
  res.status(200).json(myOrders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    return res.status(200).json(order);
  }
  res.status(404);
  throw new Error("Order not found");
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json("update order to paid");
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const products = await OrderModel.find({});
  res.json("update order to  delivered");
});

const getAllOrders = asyncHandler(async (req, res) => {
  const products = await OrderModel.find({});
  res.json("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
