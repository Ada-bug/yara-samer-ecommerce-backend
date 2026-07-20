const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    }
});

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0,
        min: 0,
    },
},{ timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);


module.exports = Cart