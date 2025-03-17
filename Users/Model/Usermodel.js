const mongoose =  require('mongoose')
const userScema = new  mongoose.Schema({
        Fullname : {
            type:String,
            required: true,
        },
        Email :{
            type:String,
            require:true
        },
        Username :{
            type : String,
            required : true,
        },
        PhoneNum:{
            type:String,
            require:true
        },
        Password:{
            type:String,
            require:true
        }
})

const User = mongoose.model('User', userScema);
module.exports = User;