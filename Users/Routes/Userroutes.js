const express = require('express');
const {UserRegistration,UserLogin,Purchase,getallcategories} = require('../Controller/Usercontroller')
const {authMiddleware, isAdmin} = require('../../Middleware/Middleware')
const router = express.Router()

router.post('/auth/userregistration', UserRegistration);
router.post('/auth/userlogin', UserLogin);

router.post('/purchase', authMiddleware, Purchase);
router.get('/all/categories', getallcategories);

module.exports = router