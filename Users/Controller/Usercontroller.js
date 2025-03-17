const {UserReg} = require("../Usecause/Userusecause")
const {CheckUsernameFn,checkEmailFn} = require ("../Repo/Userrepo");
const { json } = require("express");
const UserRegistration = async (req,res) =>{
    try {
        const isUsernameTaken = await CheckUsernameFn(req.body.Username);
        console.log(isUsernameTaken,"USERNAME")

        if(isUsernameTaken){
            return res.json({
                message : "Username is already taken",
                success : false
            })
        }

        const isEmailTaken = await checkEmailFn(req.body.Email);
        console.log(isEmailTaken, "Email");

        if (isEmailTaken) {
            return res.json({
                message: "Email already registered Please login.",
                success: false 
            });
        }

        await UserReg(req.body)
        res.json({
            message: "User created successfully!",
            success: true
        });
    } catch (error) {
        console.log(error)
    }
}


const UserLogin = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = {UserRegistration,UserLogin}