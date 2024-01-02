const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MONGO DB...")
})
.catch((err) => {
    console.log(err)
})

app.use(express.json())
app.use('/api/v1/user',userRouter)
app.use('/api/v1/auth',authRouter)
app.listen(3000, () => { console.log("Server is listening on port 3000....") })   
