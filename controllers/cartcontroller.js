const mongoose = require("mongoose");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");


// Get or create cart
const getOrCreateCart = async () => {
    let cart = await Cart.findOne()
        .populate("items.product");

    if (!cart) {
        cart = await Cart.create({
            items: [],
            totalPrice: 0
        });

        cart = await Cart.findById(cart._id)
            .populate("items.product");
    }

    return cart;
};


// Recalculate total
const calculateTotal = (cart) => {
    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
};


// GET /api/cart
const getCart = asyncHandler(async (req, res) => {
    const cart = await getOrCreateCart();

    res.json({
        status: "success",
        data: cart
    });
});


// POST /api/cart/items
const addItem = asyncHandler(async (req, res) => {

    const { productId } = req.body;


    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new AppError("Invalid product ID.", 400);
    }


    const product = await Product.findById(productId);


    if (!product) {
        throw new AppError("Product not found.", 404);
    }


    const quantity = Number(req.body.quantity) || 1;


    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new AppError(
            "Quantity must be at least 1.",
            400
        );
    }


    if (product.stock < quantity) {
        throw new AppError(
            `Only ${product.stock} item(s) available.`,
            400
        );
    }


    const cart = await getOrCreateCart();


    const existingItem = cart.items.find(
        item =>
            String(item.product._id || item.product) === String(product._id)
    );


    if (existingItem) {

        const newQuantity = existingItem.quantity + quantity;


        if (newQuantity > product.stock) {
            throw new AppError(
                `Cannot add more. Only ${product.stock} available.`,
                400
            );
        }


        existingItem.quantity = newQuantity;

    } else {

        cart.items.push({
            product: product._id,
            quantity,
            price: product.price
        });

    }


    calculateTotal(cart);

    await cart.save();


    res.json({
        status: "success",
        data: cart
    });
});


// PATCH /api/cart/items/:productId
const updateQuantity = asyncHandler(async (req, res) => {

    const cart = await getOrCreateCart();


    const item = cart.items.find(
        item =>
            String(item.product._id || item.product) === req.params.productId
    );


    if (!item) {
        throw new AppError(
            "Product not found in cart.",
            404
        );
    }


    const product = await Product.findById(req.params.productId);


    if (!product) {
        throw new AppError(
            "Product not found.",
            404
        );
    }


    const quantity = Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new AppError(
            "Quantity must be at least 1.",
            400
        );
    }


    if (quantity > product.stock) {
        throw new AppError(
            `Only ${product.stock} item(s) available.`,
            400
        );
    }


    item.quantity = quantity;


    calculateTotal(cart);

    await cart.save();


    res.json({
        status: "success",
        data: cart
    });
});


// DELETE /api/cart/items/:productId
const removeItem = asyncHandler(async (req, res) => {
    const cart = await getOrCreateCart();
    // btw i couldn't tell whether this decreased the qty or
    // removed item completely so uhhh here u go
    const item = cart.items.find(
        item =>
            String(item.product._id || item.product) === req.params.productId
    );


    if (!item) {
        throw new AppError(
            "Product not found in cart.",
            404
        );
    }


    // Decrease quantity by 1
    item.quantity -= 1;


    // Remove completely if quantity reaches 0
    if (item.quantity <= 0) {
        cart.items = cart.items.filter(
            cartItem =>
                String(cartItem.product._id || cartItem.product) !== req.params.productId
        );
    }


    calculateTotal(cart);

    await cart.save();


    res.json({
        status: "success",
        data: cart
    });
});
// here's the code that completey remove the item reqardless of qty:
//-------------------------------------------------------------------
// const removeItem = asyncHandler(async (req, res) => {

//     const cart = await getOrCreateCart();


//     const exists = cart.items.some(
//         item =>
//             String(item.product._id || item.product) === req.params.productId
//     );


//     if (!exists) {
//         throw new AppError(
//             "Product not found in cart.",
//             404
//         );
//     }


//     cart.items = cart.items.filter(
//         item =>
//             String(item.product._id || item.product) !== req.params.productId
//     );


//     calculateTotal(cart);

//     await cart.save();


//     res.json({
//         status: "success",
//         data: cart
//     });
// });
//-------------------------------------------------------------------

// DELETE /api/cart
const emptyCart = asyncHandler(async (req, res) => {

    const cart = await getOrCreateCart();


    cart.items = [];
    cart.totalPrice = 0;


    await cart.save();


    res.json({
        status: "success",
        data: cart
    });
});


module.exports = {
    getCart,
    addItem,
    updateQuantity,
    removeItem,
    emptyCart
};