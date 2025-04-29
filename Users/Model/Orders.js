const mongoose =  require('mongoose')
const Userschema = new mongoose.Schema({
    Fullname : {type:String,required:true},
    Email : {type:String,required:true},
    Username : {type:String,required:true},
    PhoneNum : {type:String,required:true},
    Gender : {type:String,required:true},
    StreetAddress : {type:String,required:true},
    city : {type:String,required:true},
    pincode : {type:String,required:true}
});

const Orderscema = new  mongoose.Schema({
        name : {
            type:String,
            required: true,
        },
        price : {
            type:String,
            required: true,
        },
        images: { 
            type: [
                {
                    public_id: String,
                    url: String
                }
            ],
            required: true
        },
        Itemquantity : {
            type:String,
            required: true,
        },
        User : {
            type : Userschema,
            required : true
        }
        
})

const Orders = mongoose.model('Orders', Orderscema);
module.exports = Orders;