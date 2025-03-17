const bcrypt = require('bcryptjs')
const {UserRegistration,UserLoginFn} = require ("../Repo/Userrepo")
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

module.exports.Userlogin = async(data) => {
    try {
        let {Username} = data
        let User = await UserLoginFn(Username)
        User = User[0]
        let result = await bcrypt.compare(data.Password,User.Password)
        console.log(result)
        if(result == true){
           return User
        }else{
           return false 
        }
    } catch (error) {
        console.log(error)
    }
}