const express = require("express");
const { AdminRegistration, AdminLogin, addCategory, addSubcategory } = require("../Controller/ProductController");
const { authMiddleware } = require("../../Middleware/Middleware");
const upload = require("../../Middleware/UploadMiddleware")
const router = express.Router();


router.post("/auth/adminregistration",AdminRegistration)
router.post("/auth/adminlogin",AdminLogin)
router.post("/category", addCategory,authMiddleware);
router.post("/categories/:categoryId/subcategories", authMiddleware, addSubcategory);


module.exports = router;
