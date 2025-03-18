const express = require('express');
const {UserRegistration,UserLogin,Booking} = require('../Controller/Usercontroller')
const {authMiddleware, isAdmin} = require('../../Middleware/Middleware')
const router = express.Router()

router.post('/auth/userregistration', UserRegistration);
router.post('/auth/userlogin', UserLogin);

router.post('/admin/add-product', authMiddleware, isAdmin, (req, res) => {
    res.json({ success: true, message: "Admin can add products here." });
});

router.post('/booking', authMiddleware, Booking);

module.exports = router