require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const Product = require('./models/product.js')
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
// const mongoSanitize = require('express-mongo-sanitize'); --> it's not comp with express 5

// Initialize express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// mongo-sanitize:
// app.use(mongoSanitize()); --> i'll add it later

// Import routes
// const productRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories')
// note: why do we need both??? can't we just make ONE CRUD??
// it's really redundant in my opinion :[

// Use routes with a base path
// app.use('/api/products', productRoutes);
app.use('/api/categories', categoriesRoutes)

// Middleware:
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB using mongoose (replace with your connection string)
const connectDB = require('./db/connect');

// connectDB();

// Error handling middleware

//Start server
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
