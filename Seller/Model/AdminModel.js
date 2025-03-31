const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    Fullname: { 
        type: String, 
        required: true 
    },
    Email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    Username: { 
        type: String, 
        required: true, unique: true 
    },
    role: { 
        type: String, 
        required: true
    },
    Password: { 
        type: String, 
        required: true 
    }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
