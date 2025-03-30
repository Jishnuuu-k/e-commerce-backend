const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { AdminRegFn, AdminLogFn, addCategoryFn, addSubcategoryFn } = require("../Repo/ProductRepo");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Fallback in case .env is missing
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

module.exports.AdminReg = async (data) => {
    console.log(data,"USECASE")
    try {
        let {Password} = data
        const saltround = 10
        const HashedPassword = await bcrypt.hash(Password,saltround)
        data.Password = HashedPassword
        await AdminRegFn(data)
        return true
    } catch (error) {
        console.log(error)
    }
}

module.exports.AdminLog = async (data) => {
    try {
        let {Username} = data
        let Admin = await AdminLogFn(Username)

        if (!Admin) {
            return { error: "Not found!" };
        }
        let Result = await bcrypt.compare(data.Password,Admin.Password)

        if (!Result) {
            return { error: "Invalid password!" };
        }

        const token = jwt.sign(
            { userId: Admin._id, email: Admin.Email, username: Admin.Username },  // Include userId
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        
         return { success: true, token, admin: Admin };

    } catch (error) {
        console.log(error)
    }
}

module.exports.addCategoryUsecase = async (categoryData) => {
    try {
        return await addCategoryFn(categoryData);
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Category name must be unique");
        }
        throw error;
    }
}

module.exports.addSubcategoryUsecase = async (categoryId, subcategoryData) => {
    try {
        return await addSubcategoryFn(categoryId, subcategoryData);
    } catch (error) {
        if (error.name === 'CastError') {
            throw new Error("Invalid category ID");
        }
        throw error;
    }
}