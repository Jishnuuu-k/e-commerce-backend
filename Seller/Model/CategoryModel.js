const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    subCategoryName: { type: String, required: true }
});

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    subcategories: [SubcategorySchema] // Array of subcategories
});

module.exports = mongoose.model('Category', CategorySchema);