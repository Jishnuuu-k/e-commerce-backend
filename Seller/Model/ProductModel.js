const mongoose = require('mongoose');

// Defines the Product document structure
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String], // Will store Cloudinary URLs
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Creates a model for the 'products' collection
module.exports = mongoose.model('Product', productSchema);