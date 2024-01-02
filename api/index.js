const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MONGO DB...")
})
.catch((err) => {
    console.log(err)
})

app.get('/hello', (req, res) => {
    res.send("Hello World")
})


app.listen(3000, () => { console.log("Server is listening on port 3000....") })   
