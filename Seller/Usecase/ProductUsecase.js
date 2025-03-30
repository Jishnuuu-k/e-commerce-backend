const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { AdminRegFn, AdminLogFn, addCategoryFn, addSubcategoryFn, createProductFn, updateProductFn, deleteProductFn, getProductByIdFn } = require("../Repo/ProductRepo");
const cloudinary = require("../../Config/CloudinaryConfig"); 

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const JWT_EXPIRES_IN = '1h';

module.exports = {
    adminRegister: async (data) => {
        try {
            const { Password } = data;
            const hashedPassword = await bcrypt.hash(Password, 10);
            const adminData = { ...data, Password: hashedPassword };
            await AdminRegFn(adminData);
            return { success: true };
        } catch (error) {
            console.error('Registration Error:', error);
            throw error;
        }
    },

    adminLogin: async (data) => {
        try {
            const { Username, Password } = data;
            const admin = await AdminLogFn(Username);

            if (!admin) {
                return { error: 'Admin not found' };
            }

            const isMatch = await bcrypt.compare(Password, admin.Password);
            if (!isMatch) {
                return { error: 'Invalid credentials' };
            }

            const token = jwt.sign(
                {
                    id: admin._id,
                    username: admin.Username,
                    role: 'admin'
                },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            return {
                success: true,
                token,
                admin: {
                    Fullname: admin.Fullname,
                    Email: admin.Email,
                    Username: admin.Username
                }
            };
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    }
};

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


module.exports = {
  createProduct: async (productData, userId) => {
    try {
      // Add createdBy reference
      const productWithUser = { ...productData, createdBy: userId };
      return await createProductFn(productWithUser);
    } catch (error) {
      // Auto-cleanup if DB fails
      if (productData.images?.length) {
        await cloudinary.api.delete_resources(
          productData.images.map(img => img.public_id)
        );
      }
      throw error;
    }
  },

  updateProduct: async (productId, updateData, userId) => {
    const existingProduct = await getProductByIdFn(productId);
    
    // Verify ownership
    if (existingProduct.createdBy.toString() !== userId) {
      throw new Error("Unauthorized product update");
    }

    return await updateProductFn(productId, updateData);
  },

  deleteProduct: async (productId, userId) => {
    const product = await getProductByIdFn(productId);
    
    if (product.createdBy.toString() !== userId) {
      throw new Error("Unauthorized product deletion");
    }

    // Delete images first
    if (product.images?.length) {
      await cloudinary.api.delete_resources(
        product.images.map(img => img.public_id)
      );
    }

    return await deleteProductFn(productId);
  },

  getProductsBySubcategory: async (subcategoryId) => {
    return await getProductsBySubcategoryFn(subcategoryId);
  }
};