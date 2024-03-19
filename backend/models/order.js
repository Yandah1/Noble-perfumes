const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define sub-document schema for order items
const OrderItemSchema = new Schema({
    quantity: Number,
    product: String
});

// Define main schema for orders
const OrderSchema = new Schema({
    orderItems: [OrderItemSchema],
    shippingAddress1: String,
    shippingAddress2: String,
    city: String,
    zip: String,
    country: String,
    phone: String,
    user: {
        name: String,
        phone: String,
        email: String
    },
    transactionId: String,
    status: String
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;