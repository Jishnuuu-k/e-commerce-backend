const path = require("path");
const { addProduct, fetchAllProducts, fetchProductById, modifyProduct, removeProduct } = require("../Usecause/ProductUsecase");

exports.createProduct = async (req, res) => {
    try {
        if (!req.body.productId) {
            return res.status(400).json({ success: false, message: "Product ID is required." });
        }

        // Check if an image file was uploaded
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const newProduct = await addProduct({ ...req.body, image: imagePath, createdBy: req.user.userId });

        res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await fetchAllProducts();
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await fetchProductById(req.params.productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        let updatedData = { ...req.body };

        // If a new image is uploaded, update the image path
        if (req.file) {
            updatedData.image = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await modifyProduct(req.params.productId, updatedData);
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.json({ success: true, message: "Product updated", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await removeProduct(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
