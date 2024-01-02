//require('dotenv').config()
const User = require("../models/user")
const bcryptjs = require('bcryptjs');
const errorHandler = require("../utils/error");
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const user = await User.create({ username, email, password: hashedPassword })
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        next(error)
    }
}

const signin = async (req,res,next) => {
    
    const {email,password} = req.body 
    console.log({email,password}) 
    try { 
        const validUser = await User.findOne({email})  
        console.log(validUser)
        if (!validUser){
            return next(errorHandler(404,"user not found !"))
        } 
        console.log(validUser.password) 
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        console.log(validPassword) 
        if (!validPassword) return next(errorHandler(401,"Invalid password!!!"))

        const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET )
        const {password : pass, ...userInfo} = validUser._doc

        res.cookie('access_token',token,{httpOnly : true}).status(200).json(userInfo) 
    } catch (error) {
        next(error)
    }
}
module.exports = {signup,signin}