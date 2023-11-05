require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const orderDetailsRoutes = require('./routes/orderDetails')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/orderDetails', orderDetailsRoutes)

// Conncect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
         console.log('Connected to the Database & Listening on Port', process.env.PORT)
  })

    })

    .catch((error) => {
        console.log(error)
    })

