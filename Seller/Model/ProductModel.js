const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },

  images: [{
    public_id: String, 
    url: String       
  }],
  
  subcategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subcategory', 
    required: true 
  },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);