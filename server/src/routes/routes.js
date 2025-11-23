// Built-in & external modules
const express = require('express')
// Router instance of app (express)
const router = express.Router()
// Routes
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes')

// Endpoints for "/" path
module.exports = () => {
  // HOME/TEST
  // GET /api/
  router.get('/', (req, res, next) => { // part of express tool belt
    res.send("Welcome to Bob's Garage 👨‍🔧")
  })

  // PRODUCT /api/product
  router.use('/products', productRoutes())

  // AUTH /api/auth
  router.use('/auth', authRoutes())

  // USER /api/user
  router.use('/users', userRoutes())

  // ADMIN /api/admin
  router.use('/admin', adminRoutes())

  return router
}
