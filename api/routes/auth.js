const express = require('express')
const {signup,signin, google, signout} = require('../controllers/auth')
const router = express.Router()

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/google').post(google) 
router.route('/signout').get(signout) ; 
module.exports = router 
  