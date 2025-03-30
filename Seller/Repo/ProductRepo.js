const AdminModel = require("../Model/AdminModel")
const Category  = require("../Model/CategoryModel")          
const Subcategory  = require("../Model/Subcategory")          
const ProductModel    = require("../Model/ProductModel")

module.exports.AdminRegFn = async (data) => {
    try {
        await AdminModel.create(data)
    } catch (error) {
        console.log(error)
    }
}

module.exports.AdminLogFn = async (Username) => {
    try {
        const Checkadmin = await AdminModel.findOne({Username})
        console.log(Checkadmin)
        return Checkadmin
    } catch (error) {
        console.log(error)
    }
}

module.exports.addCategoryFn = async (categoryData) => {
    return await Category.create(categoryData);
}

module.exports.addSubcategoryFn = async (categoryId, subcategoryData) => {
    const subcategory = await Subcategory.create({
        ...subcategoryData,
        category: categoryId
    });
    
    await Category.findByIdAndUpdate(
        categoryId,
        { $push: { subcategories: subcategory._id } }
    );
    
    return subcategory;
}

module.exports.createProductFn = async (productData) => {
    return await ProductModel.create(productData);
  };
  
  module.exports.updateProductFn = async (productId, updateData) => {
    return await ProductModel.findByIdAndUpdate(
      productId, 
      updateData, 
      { new: true, runValidators: true }  // Added validation
    );
  };
  
  module.exports.deleteProductFn = async (productId) => {
    return await ProductModel.findByIdAndDelete(productId);
  };
  
  module.exports.getProductByIdFn = async (productId) => {
    return await ProductModel.findById(productId);
  };