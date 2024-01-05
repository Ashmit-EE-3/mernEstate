const express = require('express') ;
const { createListing } = require('../controllers/listing');
const verifyUser = require('../utils/verifyUser');

const router = express.Router() ;

router.route('/create').post(verifyUser, createListing) ; 

module.exports = router ; 