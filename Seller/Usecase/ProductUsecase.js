const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { AdminRegFn, AdminLogFn, addCategoryFn, addSubcategoryFn, createProductFn, updateProductFn, deleteProductFn, getProductByIdFn } = require("../Repo/ProductRepo");
const cloudinary = require("../../Config/CloudinaryConfig"); 

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
  console.log(categoryData,"AT USECASE")
    try {
        return await addCategoryFn(categoryData);
    } catch (error) {
        console.log(error)
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


exports.createProduct = async (req) => {
  const { name, description, price, subcategory, stock } = req.body;
  
  if (!name || !description || !price || !subcategory) {
    throw new Error("All fields are required");
  }

  let images = [];
  if (req.files) {
    images = req.files.map(file => ({ public_id: file.filename, url: file.path }));
  }

  return await createProductFn({
    name,
    description,
    price,
    images,
    subcategory,
    stock,
  });
};

exports.updateProduct = async (req) => {
  const { name, description, price, subcategory, stock } = req.body;
  const productId = req.params.productId;

  let updatedFields = { name, description, price, subcategory, stock };
  let newImages = [];

  if (req.files && req.files.length > 0) {
    newImages = req.files.map(file => ({ public_id: file.filename, url: file.path }));
    updatedFields.images = newImages;
  }

  return await updateProductFn(productId, updatedFields);
};

exports.deleteProduct = async (productId) => {
  const product = await productRepository.getProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  for (const image of product.images) {
    await cloudinary.uploader.destroy(image.public_id);
  }

  return await deleteProductFn(productId);
};
  
module.exports.getProductsBySubcategory = async (subcategoryId) => {
  try {
    return await getProductByIdFn(subcategoryId);
  } catch (error) {
    console.log(error)
  }
};
