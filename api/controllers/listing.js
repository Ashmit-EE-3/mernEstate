const Listing = require("../models/listing");
const errorHandler = require("../utils/error");

const createListing = async (req,res,next)=>{
    try {
        const listing = await Listing.create(req.body) ;
        return res.status(201).json(listing) ; 
    } catch (error) {
        next(error)
    }
}

const deleteListing = async (req,res,next)=>{
    const listing = await Listing.findById(req.params.id) ;; 

    if (!listing) return next(errorHandler(404,"Listing not Found!"))

    if (listing.userRef !== req.user.id) return next(errorHandler(401,"You can delete your own listings only!"))

    try {
        await Listing.findByIdAndDelete(req.params.id) ; 

        res.status(200).json({success : true, msg : "Listing has been successfully deleted!"})
    } catch (error) {
        next(error)        
    }
}

const updateListing = async (req,res,next)=>{
    const listing = await Listing.findById(req.params.id) ;

    if (!listing) return next(errorHandler(404,"Listing doesn't exist"))

    if (req.user.id !== listing.userRef) return next(errorHandler(401, "You can edit your listings only!"))

    try {
        const update = await Listing.findByIdAndUpdate(req.params.id, req.body) ; 
        res.status(200).json(update) ; 

    } catch (error) {
        next(error) ; 
    }
}

const getListing = async (req,res,next) => {
    try {
        const listing = await Listing.findById(req.params.id) ; 

        if (!listing) return next(errorHandler(404,"Listing doesn't exist!"))

        res.status(200).json(listing) ; 

    } catch (error) {

        next(error)
    }
}

module.exports = {createListing, deleteListing, updateListing, getListing}
