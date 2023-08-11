import asyncHandler from "../middleware/asyncHandler.js";
import ProductModel from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({});
  res.status(200).json(products);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.deleteOne(req.params.id);
  console.log('MMMMMMMMMMMMMMMM');
  if (product.deletedCount === 1) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    return res.status(200).json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new ProductModel({
    name: "Sample name",
    user: req.user._id,
    countInStock: 0.0,
    numReviews: 0.0,
    description: "sample Description",
    image: "/images/sample.jpg",
    price: 0.0,
    stock: 0.0,
    category: "Sample Category",
    brand: "sample brand",
  });
  const createdProduct = await newProduct.save();
  res.status(200).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  const { name, countInStock, description, image, price, category, brand } =
    req.body;

  if (product) {
    product.name = name || product.name;
    product.countInStock = countInStock || product.countInStock;
    product.description = description || product.description;
    product.image = image || product.image;
    product.price = price || product.price;
    product.category = category || product.category;
    product.brand = brand || product.brand;

    const updatedProduct = await product.save();
    res.status(200).json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      image: updatedProduct.image,
      price: updatedProduct.price,
      countInStock: updatedProduct.countInStock,
      category: updatedProduct.category,
      brand: updatedProduct.brand,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getProducts, getProductById, createProduct, updateProduct , deleteProduct};
