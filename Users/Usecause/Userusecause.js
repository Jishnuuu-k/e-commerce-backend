const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const {UserRegistration,UserLoginFn} = require ("../Repo/Userrepo")

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

module.exports.Purcahsee = async (Userentry, Product, User) => {
    try {
        console.log(Userentry, "✅ USER ENTRY HAS BEEN ARRIVED IN USECASE ");
        console.log(Product, "✅ PRODUCT HAS BEEN ARRIVED IN USECASE ");
        console.log(User, "✅ USER HAS BEEN ARRIVED IN USECASE ");

        let { Quantity } = Userentry;
        let { price, stock } = Product;

        let totalPrice = Number(Quantity) * Number(price);
        console.log("🛒 Calculated Total Price:", totalPrice);

        if (isNaN(totalPrice)) {
            throw new Error("Calculation error: Quantity or Price is not a valid number");
        }

        return { success: true, totalPrice }; // Return total price to the controller
    } catch (error) {
        console.error("❌ Purchase Usecase Error:", error);
        throw error;
    }
};
