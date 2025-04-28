const { UserReg, Userlogin, Purcahsee ,PurchaseUsecase} = require("../Usecause/Userusecause")
const {CheckUsernameFn, checkEmailFn, FindUser, FindProduct, getallcategoryFn} = require ("../Repo/Userrepo");
const { json } = require("express");
const jwt = require("jsonwebtoken");

const UserRegistration = async (req, res) => {
    console.log(req.body,"FROM FRONTEND")
    try {
        const { Username, Email, role } = req.body;

        // Check if username or email is taken
        const isUsernameTaken = await CheckUsernameFn(Username);
        if (isUsernameTaken) {
            return res.json({ message: "Username is already taken", success: false });
        }

        const isEmailTaken = await checkEmailFn(Email);
        if (isEmailTaken) {
            return res.json({ message: "Email already registered. Please login.", success: false });
        }



        // If role is missing, default to "user"
        req.body.role = role || "user";

        await UserReg(req.body);
        res.json({ message: "User registered successfully!", success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



const UserLogin = async (req, res) => {
    console.log(req.body)
    try {
        let response = await Userlogin(req.body);
        console.log(response)
        
        if (response.error) {
            return res.status(401).json({
                success: false,
                message: response.error
            });
        }

        res.json({
            success: true,
            message: "Login successful!",
            token: response.token,
            user: {
                Fullname: response.user.Fullname,
                Email: response.user.Email,
                Username: response.user.Username,
                PhoneNum: response.user.PhoneNum,
                Gender: response.user.Gender,
                StreetAddress: response.user.StreetAddress,
                city: response.user.City,
                pincode: response.user.Pincode
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const Purchase = async (req, res) => {
    try {
        const Userentry = req.body;
        console.log("🛍️ Purchase Request Received:", Userentry);

        let { _id } = Userentry;
        let Product = await FindProduct(_id);

        if (!Product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let { Username } = decoded;
        let User = await FindUser(Username);

        if (!User) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Call Usecase and get totalPrice
        const purchaseResponse = await Purcahsee(Userentry, Product, User);

        // ✅ Respond with Total Price
        res.json({
            success: true,
            message: "Purchase successful",
            totalPrice: purchaseResponse.totalPrice,
            user: {
                id: User._id,
                username: User.Username,
            },
            product: {
                id: Product._id,
                name: Product.name,
                price: Product.price,
                quantity: Userentry.Quantity,
            }
        });

    } catch (error) {
        console.error("❌ Purchase error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getallcategories = async (req,res) => {
    try {
        const Allcategories = await getallcategoryFn()
        res.json({
            response: Allcategories
        })
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
}

const purachse = async (req,res) => {
    try {
        const Item = (req.body.product)
        const Itemquantity = (req.body.quantity)
        const User = (req.body.userId)
        await PurchaseUsecase(Item,Itemquantity,User)
        res.json({
            Total: TotalPrice
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {UserRegistration, UserLogin, Purchase, getallcategories,purachse}