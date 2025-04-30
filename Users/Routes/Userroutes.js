const express = require('express');
const {UserRegistration,UserLogin,getallcategories,purachse,myorders} = require('../Controller/Usercontroller')
const {authMiddleware, isAdmin} = require('../../Middleware/Middleware')
const router = express.Router()

router.post('/auth/userregistration', UserRegistration);
router.post('/auth/userlogin', UserLogin);

router.get('/all/categories', getallcategories);
router.post('/myorders', myorders);

router.post('/purchase',purachse);
module.exports = router