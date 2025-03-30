const { AdminReg, AdminLog, addCategoryUsecase, addSubcategoryUsecase } = require("../Usecase/ProductUsecase");

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

exports.addSubcategory = async (req, res) => {
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