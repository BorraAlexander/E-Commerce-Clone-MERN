import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @des  Get all products
// @route  GET/api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  // pagination
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  // search ?keyword=phone
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  // get products
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  // send response
  res.send({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @des  Get product by id
// @route  GET/api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.send(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @des   Create a product
// @route  POST/api/products
// @access Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    description: "sample description",
    countInStock: 0,
    numReviews: 0,
    rating: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @des  Update product
// @route  PUT/api/products/:id
// @access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  // Get data from request body
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  // Get product by ID
  const product = await Product.findById(req.params.id);

  // If product found, update product data with values from request body (if provided)
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  }
  // If product not found, send error response
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @des  Delete product
// @route  DELETE/api/products/:id
// @access Private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  // Get product by ID
  const product = await Product.findById(req.params.id);

  // If product found, delete product
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({
      message: "Product deleted successfully",
    });
  }
  // If product not found, send error response
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  // Get data from request body
  const { rating, comment } = req.body;

  // Get product by ID
  const product = await Product.findById(req.params.id);

  // If product found, create new review
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    );

    // If user already reviewed product, send error response
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    // If user has not reviewed product, create new review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      createdAt: Date.now(),
      user: req.user._id,
    };

    // Add review to product
    product.reviews.push(review);

    // Update product
    product.numReviews = product.reviews.length;

    // Calculate average rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // Save product
    await product.save();
    // Send response
    res.status(201).json({ message: "Review added" });
  }
  // If product not found, send error response
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
