const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true },

  subcategories: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subcategory' }],
  createdAt: { 
    type: Date, 
    default: Date.now }
});


module.exports = mongoose.model('Category', categorySchema);