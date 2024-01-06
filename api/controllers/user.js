const Listing = require("../models/listing");
const User = require("../models/user");
const errorHandler = require("../utils/error")
const bcryptjs = require('bcryptjs');

const test = (req, res) => {
    res.json({ message: "API route is working" })
}

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account"))

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })

        const { password, ...others } = updatedUser._doc
        res.status(200).json(others);
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {

    try {
        if (req.user.id !== req.params.id) return next(errorHandler(401, "You can delete your own account only !"))

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, msg: "User has been deleted successfully !" })
    }
    catch (error) {
        next(error);
    }
}

const getUserListings = async (req,res,next)=>{
    console.log({userRef : req.params.id})
    try {
        if (req.user.id !== req.params.id) return next(errorHandler(401, "You can view your own listings only!"))
        console.log({userRef : req.params.id})
        const listings = await Listing.find({userRef : req.params.id})
        console.log(listings)
        if (!listings) return next(errorHandler(404,"You don't have any listings"))

        return res.status(200).json(listings) ;  
    } catch (error) {
        next(error)
    }
}
module.exports = { test, updateUser, deleteUser, getUserListings}