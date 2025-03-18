const ProductModel = require("../Model/ProductModel");

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
