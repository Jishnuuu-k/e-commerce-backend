const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { AdminRegFn, AdminLogFn, createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../Repo/ProductRepo");

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
