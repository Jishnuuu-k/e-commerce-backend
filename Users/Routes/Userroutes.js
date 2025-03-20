const express = require('express');
const {UserRegistration,UserLogin,Purchase} = require('../Controller/Usercontroller')
const {authMiddleware, isAdmin} = require('../../Middleware/Middleware')
const router = express.Router()

router.post('/auth/userregistration', UserRegistration);
router.post('/auth/userlogin', UserLogin);


router.post('/purchase', authMiddleware, Purchase);

module.exports = router