const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const Orders = require('../Model/Orders')

const {UserRegistration,UserLoginFn,FindProduct} = require ("../Repo/Userrepo")

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Fallback in case .env is missing
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

module.exports.UserReg = async(data) => {
    try {
        let {Password} = data
        const saltRound = 10;
        const HashedPassword = await bcrypt.hash(Password,saltRound)
        data.Password = HashedPassword

        await UserRegistration(data)
        return true
    } catch (error) {
        console.log(error)
    }
}

module.exports.Userlogin = async (data) => {
    try {
        let { Username } = data;
        let User = await UserLoginFn(Username);

        if (!User) {
            return { error: "User not found!" };
        }

        let result = await bcrypt.compare(data.Password, User.Password);
        if (!result) {
            return { error: "Invalid password!" };
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: User._id, email: User.Email, Username: User.Username },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return { success: true, token, user: User };
    } catch (error) {
        console.log(error);
        return { error: "Internal server error" };
    }
};



module.exports.PurchaseUsecase = async(Item,Itemquantity,User) => {
    try {
        let { _id } = Item
        const Product = await FindProduct(_id)
        let {name, price, images} = Product
        TotalPrice = Product.price * Itemquantity

        OrderDetails = {name, price, images, Itemquantity, User, TotalPrice}
        console.log(OrderDetails,"OrderDetails")

        await Orders.create(OrderDetails)
    } catch (error) {
        console.log(error)
    }
}