// controllers/categoriesController.js

// [C] CONTROLLER LAYER  —  reads req, calls Model, sends res
// Thin: no raw queries, no business rules, no formatting logic

const Category = require('../models/category.model')
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
// const mongoose = require('mongoose')


// GET /api/category  —  list all categories

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find()
    res.json({ status: "success", data: categories });
});


// GET /api/category/:id  —  fetch one category by ID
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);  // calls [M]
    if (!category) throw new AppError('category not found', 404);
    res.json({ status: 'success', data: category });         // [V] JSON View
});

// POST /api/category  —  create a new category
const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);         // calls [M]
  res.status(201).json({ status: 'success', data: category }); // [V]
});

// DELETE /api/category/:id  —  remove a category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new AppError('category not found', 404);
  res.json({ status: 'success', data: null });            // [V] JSON View
});

// PATCH /api/category/:id  —  update a category
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
        runValidators: true
    }
  );

  if (!category) {
    throw new AppError('category not found', 404);
  }

  res.json({status: 'success', data: category,});
});

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    getCategoryById,
    deleteCategory,
};