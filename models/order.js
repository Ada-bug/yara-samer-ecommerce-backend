const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            name: {
                type: String,
                required: true
            },

            quantity: {
                type: Number,
                required: true
            },

            price: {
                type: Number,
                required: true
            }
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "pending",
            "shipped",
            "delivered",
            "cancelled"
        ],
        default: "pending"
    },

    shippingAddress: {
        fullName: {
            type: String,
            required: true
        },

        street: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        }
    }

}, {
    timestamps: true
});
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;