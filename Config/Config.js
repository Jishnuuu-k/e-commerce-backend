const mongoose = require("mongoose")

const connectDb = ()=>{
    try {
        return mongoose.connect('mongodb+srv://user:123@cluster0.e5it7.mongodb.net/TableBooking?retryWrites=true&w=majority&appName=Cluster0')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;