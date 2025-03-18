const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../Repo/ProductRepo");

module.exports.addProduct = async (data) => {
    try {
        return await createProduct(data);
    } catch (error) {
        console.log("Error in Usecase - addProduct:", error);
    }
};

module.exports.fetchAllProducts = async () => {
    try {
        return await getAllProducts();
    } catch (error) {
        console.log("Error in Usecase - fetchAllProducts:", error);
    }
};

module.exports.fetchProductById = async (productId) => {
    try {
        return await getProductById(productId);
    } catch (error) {
        console.log("Error in Usecase - fetchProductById:", error);
    }
};

module.exports.modifyProduct = async (productId, data) => {
    try {
        return await updateProduct(productId, data);
    } catch (error) {
        console.log("Error in Usecase - modifyProduct:", error);
    }
};

module.exports.removeProduct = async (productId) => {
    try {
        return await deleteProduct(productId);
    } catch (error) {
        console.log("Error in Usecase - removeProduct:", error);
    }
};
