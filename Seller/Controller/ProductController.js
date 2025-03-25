const path = require("path");
const AdminModel = require("../Model/AdminModel")
const {createCategory ,getCategories } = require("../Repo/ProductRepo")
const { AdminReg, AdminLog, addProduct, fetchAllProducts, fetchProductById, modifyProduct, removeProduct } = require("../Usecase/ProductUsecase");

exports.AdminRegistration = async (req, res) => {
    try {
        await AdminReg(req.body)
        res.json({ message: "Admin registered successfully!", success: true });
    } catch (error) {
        console.log(error)
    }
}

exports.AdminLogin = async (req,res) => {
    try {
    let response = await AdminLog(req.body)
    console.log(response)

        if (response.error) {
            return res.status(401).json({
                success: false,
                message: response.error
            });
        }

        res.json({
            success: true,
            message: "Login successful!",
            token: response.token,
            user: {
                Fullname: response.admin.Fullname,
                Email: response.admin.Email,
                Username: response.admin.Username
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.createCategory = async (req, res) => {
    try {
        const newCategory = await createCategory(req.body); // ✅ Calling Repo Function
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategories = async (req,res) => {
    try {
        const CategoryId = req.body
        const categories = await getCategories(CategoryId);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createProduct = async (req, res) => {
    try {
        if (!req.body.productId) {
            return res.status(400).json({ success: false, message: "Product ID is required." });
        }

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized. Token missing or invalid." });
        }

        // 🔴 Check if the logged-in user is actually an admin
        const isAdmin = await AdminModel.findById(req.user.userId);
        if (!isAdmin) {
            return res.status(403).json({ success: false, message: "Access Denied. Only sellers can add products." });
        }

        const imageUrl = req.file ? req.file.path : "";

        const newProduct = await addProduct({
            ...req.body,
            image: imageUrl,
            createdBy: req.user.userId // Save the admin ID
        });

        res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
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
