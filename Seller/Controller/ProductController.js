const { AdminReg, AdminLog, addCategoryUsecase,  addSubcategoryUsecase, createProduct, updateProduct, deleteProduct, getProductsBySubcategory } = require("../Usecase/ProductUsecase");
const {getCategoryFn} = require("../Repo/ProductRepo")
exports.AdminRegistration = async (req, res) => {
    try {
        await AdminReg(req.body);
        res.status(201).json({ 
            message: "Admin registered successfully!", 
            success: true 
        });
    } catch (error) {
        console.error("Admin Registration Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.AdminLogin = async (req, res) => {
    try {
        const response = await AdminLog(req.body);

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
        console.error("Admin Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

exports.addCategory = async (req, res) => {
    console.log(req.body,"DTAAA")
    try {
        const category = await addCategoryUsecase(req.body);
        res.status(201).json({
            success: true,
            message: "Category added successfully",
            category
        });
    } catch (error) {
        console.error("Add Category Error:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to add category"
        });
    }
}

exports.getCategory = async (req,res) => {
    try {
        const response = await getCategoryFn(); 
        console.log(response)
        res.json({
            success: true,
            message: "Categories",
            response
        });
    } catch (error) {
        console.log(error)
    }
}

exports.addSubcategory = async (req, res) => {
    console.log(req.body)
    try {
        const { categoryId } = req.params; // Assuming you'll pass categoryId in route
        const subcategory = await addSubcategoryUsecase(categoryId, req.body);
        res.status(201).json({
            success: true,
            message: "Subcategory added successfully",
            subcategory
        });
    } catch (error) {
        console.error("Add Subcategory Error:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to add subcategory"
        });
    }
}

exports.createProduct = async (req, res) => {
    try {
        console.log("Uploaded files:", req.files); // Add this line
        
        const product = await createProduct({
            ...req.body,
            images: req.files.map(file => ({
                public_id: file.public_id,  // Ensure these exist
                url: file.secure_url       // Ensure these exist
            }))
        }, req.user._id);
        
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
  
  // Update Product
  exports.updateProduct = async (req, res) => {
    try {
      const product = await updateProduct(
        req.params.productId,
        req.body,
        req.user._id
      );
      res.json({ success: true, product });
    } catch (error) {
      res.status(403).json({ success: false, message: error.message });
    }
  };
  
  // Delete Product
  exports.deleteProduct = async (req, res) => {
    try {
      await deleteProduct(req.params.productId, req.user._id);
      res.json({ success: true, message: "Product deleted" });
    } catch (error) {
      res.status(403).json({ success: false, message: error.message });
    }
  };
  
  // Get Products by Subcategory
  exports.getProductsBySubcategory = async (req, res) => {
    try {
      const products = await getProductsBySubcategory(req.params.subcategoryId);
      res.json({ success: true, products });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };