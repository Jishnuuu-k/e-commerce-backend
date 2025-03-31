const express = require("express");
const { AdminRegistration, AdminLogin, addCategory, getCategory, addSubcategory, createProduct, updateProduct, deleteProduct, getProductsBySubcategory } = require("../Controller/ProductController");
const { authMiddleware } = require("../../Middleware/Middleware");
const upload = require("../../Middleware/UploadMiddleware")
const router = express.Router();


router.post("/auth/adminregistration",AdminRegistration)
router.post("/auth/adminlogin",AdminLogin)
router.post("/category", addCategory,authMiddleware);
router.get("/get/catgories",getCategory)
router.post("/categories/:categoryId/subcategories", authMiddleware, addSubcategory);

router.post("/products", authMiddleware, upload.array('images', 5), createProduct);
router.put("/products/:productId", authMiddleware, upload.array('images', 5), updateProduct);
router.delete("/products/:productId", authMiddleware, deleteProduct);

router.get("/subcategories/:subcategoryId/products", getProductsBySubcategory);
module.exports = router;
