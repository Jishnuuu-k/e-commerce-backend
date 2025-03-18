const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://user:1234@cluster0.70lnc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ MongoDB Connected Successfully to ecommerceDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = connectDb;
