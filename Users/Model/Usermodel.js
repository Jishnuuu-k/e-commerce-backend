const mongoose =  require('mongoose')
const userScema = new  mongoose.Schema({
        Fullname : {
            type:String,
            required: true,
        },
        Email :{
            type:String,
            required:true
        },
        Username :{
            type : String,
            required : true,
        },
        PhoneNum:{
            type:String,
            required:true
        },
        Gender:{
            type:String,
            required:true
        },
        StreetAddress:{
            type:String,
            required:true
        },
        City:{
            type:String,
            required:true
        },
        Pincode:{
            type:String,
            required:true
        },

        Password:{
            type:String,
            required:true
        }
})

const User = mongoose.model('User', userScema);
module.exports = User;