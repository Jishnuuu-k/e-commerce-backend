const AdminModel = require("../Model/AdminModel")
const Category  = require("../Model/CategoryModel")          
const Subcategory  = require("../Model/Subcategory")          
const ProductModel    = require("../Model/ProductModel")
const user = require("../../Users/Model/Usermodel")

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

module.exports.getCategoryFn = async () => {
    try {
        const findCategories = await Category.find({}).populate("subcategories", "name");
        return findCategories
    } catch (error) {
        console.log(error)
    }
}

module.exports.getUsersFn = async () => {
    try {
        const findusers = await user.find({});
        return findusers
    } catch (error) {
        console.log(error)
    }
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

exports.createProductFn = async (productData) => {
    const newProduct = new ProductModel(productData);
    return await newProduct.save();
  };
  
  exports.updateProductFn = async (productId, updateFields) => {
    return await ProductModel.findByIdAndUpdate(productId, updateFields, { new: true });
  };
  
  exports.deleteProductFn = async (productId) => {
    return await ProductModel.findByIdAndDelete(productId);
  };
  
  exports.getProductByIdFn = async (subcategoryId) => {
    try {
        return await ProductModel.find({ subcategory: subcategoryId }); 
    } catch (error) {
        console.log(error)
    }
};
