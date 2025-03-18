const {UserReg,Userlogin} = require("../Usecause/Userusecause")
const {CheckUsernameFn,checkEmailFn,checkroleFn} = require ("../Repo/Userrepo");
const { json } = require("express");


const UserRegistration = async (req, res) => {
    try {
        const { Username, Email, role } = req.body;

        // Check if username or email is taken
        const isUsernameTaken = await CheckUsernameFn(Username);
        if (isUsernameTaken) {
            return res.json({ message: "Username is already taken", success: false });
        }

        const isEmailTaken = await checkEmailFn(Email);
        if (isEmailTaken) {
            return res.json({ message: "Email already registered. Please login.", success: false });
        }

        // If role is "admin", check if an admin already exists
        if (role === "admin") {
            const existingAdmin = await checkroleFn({ role: "admin" });
            if (existingAdmin) {
                return res.status(400).json({ message: "Seller account already exists!", success: false });
            }
        }

        // If role is missing, default to "user"
        req.body.role = role || "user";

        await UserReg(req.body);
        res.json({ message: "User registered successfully!", success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



const UserLogin = async (req, res) => {
    try {
        let response = await Userlogin(req.body);
        console.log(response)
        
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
                Fullname: response.user.Fullname,
                Email: response.user.Email,
                Username: response.user.Username,
                PhoneNum: response.user.PhoneNum,
                Gender: response.user.Gender,
                StreetAddress: response.user.StreetAddress,
                city: response.user.city,
                pincode: response.user.pincode
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const Booking = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = {UserRegistration,UserLogin,Booking}