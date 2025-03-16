const express = require('express');
const {UserRegistration} = require('../Controller/Usercontroller')
const router = express.Router()

router.route('/auth/userregistration').post(UserRegistration)
module.exports = router