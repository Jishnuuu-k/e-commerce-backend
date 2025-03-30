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
    description: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


module.exports = mongoose.model('Subcategory', subcategorySchema);