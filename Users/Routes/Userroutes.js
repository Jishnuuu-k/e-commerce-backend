const express = require('express');
const {UserRegistration,UserLogin,Purchase,getallcategories,purachse} = require('../Controller/Usercontroller')
const {authMiddleware, isAdmin} = require('../../Middleware/Middleware')
const router = express.Router()

router.post('/auth/userregistration', UserRegistration);
router.post('/auth/userlogin', UserLogin);

router.get('/all/categories', getallcategories);

router.post('/purchase',purachse);
module.exports = router