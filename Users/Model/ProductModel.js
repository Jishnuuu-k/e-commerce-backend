const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    image: {
        type: String,  // Store image URL or path
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
