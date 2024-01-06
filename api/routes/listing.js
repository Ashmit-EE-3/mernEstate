const express = require('express') ;
const { createListing, deleteListing } = require('../controllers/listing');
const verifyUser = require('../utils/verifyUser');

const router = express.Router() ;

router.route('/create').post(verifyUser, createListing) ; 
router.route('/delete/:id').delete(verifyUser, deleteListing) ; 

module.exports = router ; 