const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const connectDB = require('../db/connect');

const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require("../models/Order");

const products = require('../data/seedProducts');
const categories = require('../data/seedCategories');

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log("Cleanup :< ...");
        // Delete existing documents
        await Order.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});

        console.log("Seeding :> ...");
        // Insert sample documents
        const insertedCategories = await Category.insertMany(categories);
        const insertedProducts = await Product.insertMany(products);
        // const insertedOrders = await Order.insertMany(orders);

        console.log(`Categories added: ${insertedCategories.length}, Products added: ${insertedProducts.length}.`);
        // Orders:  ${insertedOrders.length}
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

seedDatabase();