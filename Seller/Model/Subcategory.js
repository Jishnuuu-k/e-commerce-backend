const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

subcategorySchema.virtual('products', {
  ref: 'Product',  // Reference to the Product model
  localField: '_id',  // Local field (this subcategory's ID)
  foreignField: 'subcategory',  // Foreign field in the Product model (refers to subcategory)
  justOne: false  // This is an array, so set to false
});


module.exports = mongoose.model('Subcategory', subcategorySchema);