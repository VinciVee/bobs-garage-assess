const express = require('express')
// Router instance of app (express)
const router = express.Router()

const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')

// Endpoints for "/" path
module.exports = () => {
  // HOME/TEST Endpoint: /api/
  router.get('/', (req, res, next) => { // part of express tool belt
    res.send("Welcome to Bob's Garage 👨‍🔧")
  })

  // PRODUCT ROUTES: /api/product
  router.use('/products', productRoutes())

  // AUTH ROUTES: /api/auth
  router.use('/auth', authRoutes())

  return router
}
