const bcrypt = require('bcryptjs')
const {UserRegistration} = require ("../Repo/Userrepo")
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