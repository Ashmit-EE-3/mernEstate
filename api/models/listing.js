const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
    }, 
    description : {
        type : String, 
        required : true, 
    }, 
    address :  {
        type : String, 
        required : true, 
    }, 
    regularPrice :  {
        type : Number, 
        required : true, 
    },
    discountedPrice : {
        type : Number, 
        required : true, 
    }, 
    bedrooms : {
        type : Number, 
        required : true, 
    }, 
    bathrooms :{
        type : Number, 
        required : true, 
    },
    furnished : {
        type : Boolean, 
        required : true, 
        default : false, 
    }, 
    parking : {
        type : Boolean, 
        required : true,
        defalt : false,  
    }, 
    type : {
        type : String, 
        required : true, 
        default : 'rent',
    },
    offer : {
        type : String, 
        required : true, 
    }, 
    imageUrls :{
        type : Array, 
        required : true, 
    }, 
    userRef : {
        type : String, 
        required : true, 
    }, 
},{timestamps:true})

const Listing = mongoose.model('Listing',listingSchema)

module.exports = Listing 
