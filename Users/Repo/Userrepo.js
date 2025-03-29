const UserModel = require("../Model/Usermodel")
const ProductModel = require("../../Seller/Model/ProductModel")
const CategoryModel = require("../../Seller/Model/CategoryModel")

module.exports.UserRegistration = async (data) => {
    try {
        await UserModel.create(data)
    } catch (error) {
        console.log(error)
    }
}

module.exports.CheckUsernameFn = async (Username) => {
    try {
        const existingUser = await UserModel.findOne({ Username });
        return existingUser ? true : false;
    } catch (error) {
        console.log(error)
    }
}

module.exports.checkEmailFn = async (Email) => {
    try {
        const ExistingUser = await UserModel.findOne({Email});
        console.log(ExistingUser,"Email is Taken")
        return ExistingUser ? true : false;
    } catch (error) {
        console.log(error)
    }
}


module.exports.UserLoginFn = async (data) => {
    try {
        const Checkuser = await UserModel.findOne({Username:data})
        return Checkuser;
    } catch (error) {
        console.log(error)
    }
}

module.exports.FindUser = async (Username) => {
    try {
        const ExistingUser = await UserModel.findOne({ Username });
        return ExistingUser 
    } catch (error) {
        console.log(error)
    }
}

module.exports.FindProduct = async (_id) => {
    try {
        const Product = await ProductModel.findOne({ _id });
        return Product 
    } catch (error) {
        console.log(error)
    }
}

module.exports.getallcategoryFn = async() => {
    try {
        const Allcategories = await CategoryModel.find()
        return Allcategories
    } catch (error) {
        console.log(error)
    }
}