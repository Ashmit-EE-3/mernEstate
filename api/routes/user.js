const express = require('express')
const {test, updateUser} = require('../controllers/user');
const verifyUser = require('../utils/verifyUser');
const router = express.Router()

router.route('/test').get(test)
router.route('/update/:id').post(verifyUser, updateUser) ;

module.exports = router 
