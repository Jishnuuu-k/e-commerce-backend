const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true }, // Custom Product ID
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Changed: Referencing Category
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Changed: Storing Subcategory Reference
    stock: { type: Number, required: true, default: 1 },
    image: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }
});

module.exports = mongoose.model('Product', ProductSchema);