import asyncHandler from "../middleware/asyncHandler.js";
import ProductModel from "../models/productModel.js";
import AddressModel from "../models/addressModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGENATION_LIMIT || 8;

  const userAgent = req.get('User-Agent');

  const ipAddress = req.connection.remoteAddress;   

  if(req.query.latitude !=null && req.query.longitude !=null){
    const newAddress = new AddressModel({
      latitude: req.query.latitude,
      longtitude: req.query.longitude,
      ipAddress: ipAddress,
      userAgent: userAgent,
      description: "sample Description",
      image: "/images/sample.jpg",
      price: 0.0,
      stock: 0.0,
      category: "Sample Category",
      brand: "sample brand",
    });
    const createdNewAddress = await newAddress.save();

    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQ",createdNewAddress);
  }
  const page = Number(req.query.pageNumber) || 1;
  const keyWord = req.query.keyWord
    ? { name: { $regex: req.query.keyWord, $options: "i" } }
    : {};
  const count = await ProductModel.countDocuments({ ...keyWord });
  const products = await ProductModel.find({ ...keyWord })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.deleteOne({ _id: req.params.id });
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

const getTopProducts = asyncHandler(async (req, res) => {

  const userAgent = req.get('User-Agent');
    
    // console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB" , userAgent);
    // const locationResponse = await axios.get(`http://ip-api.com/json/${ip}`);
    // locationData = locationResponse.data;
    // console.log(`URL: ${url}, User Agent: ${userAgent}, IP: ${ip}`);
    // console.log('Location:', locationData);
  
  const product = await ProductModel.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(product);
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

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await ProductModel.findById(req.params.id);

  if (product) {
    const alreadyReview = product.reviews.find(
      (item) => item.user.toString() === req.user._id.toString()
    );

    if (alreadyReview) {
      res.status(400);
      throw new Error("You have already reviewed this product");
    }
    const reviews = {
      name: req.user.name,
      user: req.user._id,
      rating: Number(rating),
      comment: comment,
    };

    product.reviews.push(reviews);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getTopProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
