const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");


const generateOrderNumber = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `ORD-${random}`;
};


// POST /api/orders - checkout cart
const checkout = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne()
        .populate("items.product");


    if (!cart || cart.items.length === 0) {
        throw new AppError(
            "Cart is empty.",
            400
        );
    }


    // Check stock before creating order
    for (const item of cart.items) {

        const product = await Product.findById(item.product._id);


        if (!product) {
            throw new AppError(
                `${item.product.name} no longer exists.`,
                404
            );
        }


        if (product.stock < item.quantity) {
            throw new AppError(
                `Not enough stock for ${product.name}.`,
                400
            );
        }
    }


    // Create order
    const order = await Order.create({

        orderNumber: generateOrderNumber(),

        items: cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.price
        })),

        totalPrice: cart.totalPrice,

        shippingAddress: req.body.shippingAddress
    });


    // Reduce product stock
    for (const item of cart.items) {

        await Product.findByIdAndUpdate(
            item.product._id,
            {
                $inc: {
                    stock: -item.quantity
                }
            }
        );
    }


    // Empty cart
    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();


    res.status(201).json({
        status: "success",
        data: order
    });
});



// GET /api/orders
const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find();

    res.json({
        status: "success",
        data: orders
    });
});



// GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
        .populate({
            path: "items.product",
            select: "name price"
        });


    if (!order) {
        throw new AppError(
            "Order not found.",
            404
        );
    }


    res.json({
        status: "success",
        data: order
    });
});



// PATCH /api/orders/:id/status
const updateOrderStatus = asyncHandler(async (req, res) => {

    const allowedStatuses = [
        "pending",
        "shipped",
        "delivered",
        "cancelled"
    ];


    const { status } = req.body;


    if (!allowedStatuses.includes(status)) {
        throw new AppError(
            "Invalid order status.",
            400
        );
    }


    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status
        },
        {
            new: true,
            runValidators: true
        }
    );


    if (!order) {
        throw new AppError(
            "Order not found.",
            404
        );
    }


    res.json({
        status: "success",
        data: order
    });
});



module.exports = {
    checkout,
    getOrders,
    getOrderById,
    updateOrderStatus
};