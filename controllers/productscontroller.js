// controllers/productsController.js

// [C] CONTROLLER LAYER  —  reads req, calls Model, sends res
// Thin: no raw queries, no business rules, no formatting logic

const Product      = require('../models/Product');        // imports [M]
const Category = require('../models/Category')
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const mongoose = require('mongoose')


// GET /api/products  —  list all products
const getProducts = asyncHandler(async (req, res) => {
    const {
        minPrice,
        maxPrice,
        category,
        search,
        inStock
    } = req.query;

    const filter = {};

    // Price
    if (minPrice || maxPrice) {
        filter.price = {
            ...(minPrice && { $gte: Number(minPrice) }),
            ...(maxPrice && { $lte: Number(maxPrice) })
        };
    }

    // Category
    if (category) {
        const categoryDoc = await Category.findOne({
            name: { $regex: `^${category}$`, $options: "i" }
            // apparently this makes the findOne case insensitive *>*
        });

        if (!categoryDoc) {
            throw new AppError("Category not found.", 404);
        }

        filter.category = categoryDoc._id;
    }

    // Brand
   // Search by name or description
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    // In Stock
    if (inStock !== undefined) {
        filter.inStock = inStock === "true";
    }

    const products = await Product.find(filter)
    .populate({ path: "category", select: "name description -_id" })

    res.json({status: "success", data: products });
});


// GET /api/products/:id  —  fetch one product by ID
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    .populate({ path: "category", select: "name description -_id" })
    if (!product) throw new AppError('Product not found', 404);
    res.json({ status: 'success', data: product });         // [V] JSON View
});

// POST /api/products  —  create a new product
const createProduct = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
    throw new AppError("Invalid category ID.", 400);
}
    const categoryExists = await Category.exists({
        _id: req.body.category,
    });
    if (!categoryExists) {
        throw new AppError("Category not found.", 404);
    }
    const product = await Product.create(req.body);         // calls [M]
    res.status(201).json({ status: 'success', data: product }); // [V]
});

// DELETE /api/products/:id  —  remove a product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new AppError('Product not found', 404);
  res.json({ status: 'success', data: null });            // [V] JSON View
});

// PATCH /api/product/:id  —  update a product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
        runValidators: true
    }
  );

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.json({status: 'success', data: product,});
});

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    getProductById,
    deleteProduct,
};