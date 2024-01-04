const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required :true,
        unique : true, 
    },
    email : {
        type : String,
        required :true,
        unique : true, 
    },
    password : {
        type : String,
        required :true, 
    },
    avatar : {
        type : String, 
        default : "https://tse1.mm.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&rs=1&c=1&qlt=95&w=106&h=106",
    }
},{timestamps : true})

const User = mongoose.model('User',userSchema)

module.exports = User 


