const express = require("express");
const { AdminRegistration, AdminLogin, createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../Controller/ProductController");
const { authMiddleware } = require("../../Middleware/Middleware");
const upload = require("../../Middleware/UploadMiddleware");
const router = express.Router();


router.post("/auth/adminregistration",AdminRegistration)
router.post("/auth/adminlogin",AdminLogin)

router.post("/admin/add-product", authMiddleware, upload.single("image"), createProduct);
router.put("/admin/products/:productId", authMiddleware, upload.single("image"), updateProduct);
router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.delete("/admin/products/:productId", authMiddleware, deleteProduct);



module.exports = router;
