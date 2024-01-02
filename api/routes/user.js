const express = require('express')
const test = require('../controllers/user')

const router = express.Router()

router.route('/test').get(test)

module.exports = router 
