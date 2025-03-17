const express = require('express');
const {UserRegistration,UserLogin} = require('../Controller/Usercontroller')
const router = express.Router()

router.route('/auth/userregistration').post(UserRegistration)
router.route('/auth/userlogin').post(UserLogin)
module.exports = router