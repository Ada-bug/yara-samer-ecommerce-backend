const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true , "what the product id?"],
    index: true
  },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;