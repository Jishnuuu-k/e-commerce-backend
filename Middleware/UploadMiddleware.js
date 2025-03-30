const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/CloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: `ecommerce/products/${req.user._id}`, // User-specific folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [
      { width: 800, height: 800, crop: "limit", quality: "auto" }
    ],
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
  })
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = upload;