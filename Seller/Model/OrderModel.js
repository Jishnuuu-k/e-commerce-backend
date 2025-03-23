const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true  // Ensures each product has a unique ID
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
