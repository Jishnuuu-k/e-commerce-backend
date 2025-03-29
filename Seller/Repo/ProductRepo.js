const Category = require('../Model/CategoryModel');
const ProductModel = require("../Model/ProductModel");
const AdminModel = require("../Model/AdminModel")


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

module.exports.createCategory = async (categoryData) => {
    return await Category.create(categoryData);
};


module.exports.getCategories = async (_id) => {
    try {
        const CheckCategory = await Category.find({_id})
        return CheckCategory
    } catch (error) {
        console.log(error)
    }
}

// Add a new product with custom product ID
module.exports.createProduct = async (data) => {
    try {
        const existingProduct = await ProductModel.findOne({ productId: data.productId });
        if (existingProduct) {
            throw new Error("Product ID already exists. Choose a different one.");
        }

        return await ProductModel.create(data);
    } catch (error) {
        console.log("Error creating product:", error);
        throw error;
    }
};

// Get all products
module.exports.getAllProducts = async () => {
    try {
        return await ProductModel.find();
    } catch (error) {
        console.log("Error fetching products:", error);
    }
};

// Get a single product by productId
module.exports.getProductById = async (productId) => {
    try {
        return await ProductModel.findOne({ productId });
    } catch (error) {
        console.log("Error fetching product:", error);
    }
};

// Update a product by productId
module.exports.updateProduct = async (productId, data) => {
    try {
        return await ProductModel.findOneAndUpdate({ productId }, data, { new: true });
    } catch (error) {
        console.log("Error updating product:", error);
    }
};

// Delete a product by productId
module.exports.deleteProduct = async (productId) => {
    try {
        return await ProductModel.findOneAndDelete({ productId });
    } catch (error) {
        console.log("Error deleting product:", error);
    }
};
