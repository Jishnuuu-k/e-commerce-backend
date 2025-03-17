const express = require('express');
const app = express();

const DbConnection = require('./Config/Config');
const UserRouter = require('./Users/Routes/Userroutes');
const cors = require('cors')
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// Database Connection
async function connectDB() {
    try {
        await DbConnection();
        console.log("✅ Database connected !");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

connectDB();

// Routes
app.use('/Users', UserRouter);

// Start the server
const PORT = 7000;

app.listen(PORT, (err) => {
    if (err) {
        console.error(`Error starting the server: ${err.message}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
