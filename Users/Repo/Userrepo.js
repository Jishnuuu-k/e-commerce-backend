const UserModel = require("../Model/Usermodel")

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
        console.log(existingUser,"USER Exist")
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
module.exports.checkroleFn = async ({role}) => {
    try {
        const ExistingRole = await UserModel.findOne({role: "admin"})
        console.log(ExistingRole,"Admin is here")
        return ExistingRole ? true : false;
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