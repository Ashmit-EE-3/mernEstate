const express = require('express')
const {test, updateUser, deleteUser} = require('../controllers/user');
const verifyUser = require('../utils/verifyUser');
const router = express.Router()

router.route('/test').get(test)
router.route('/update/:id').post(verifyUser, updateUser) ;
router.route('/delete/:id').delete(verifyUser, deleteUser) ; 

module.exports = router 
