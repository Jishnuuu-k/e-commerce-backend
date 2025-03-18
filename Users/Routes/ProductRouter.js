const express = require("express");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../Controller/ProductController");
const { authMiddleware, isAdmin } = require("../../Middleware/Middleware");
const upload = require("../../Middleware/UploadMiddleware");
const router = express.Router();

router.post("/admin/add-product", authMiddleware, isAdmin, upload.single("image"), createProduct);
router.put("/admin/products/:productId", authMiddleware, isAdmin, upload.single("image"), updateProduct);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.delete("/admin/products/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
