// Built-in & external modules
const express = require('express')
// Router instance of app (express)
const router = express.Router()
// Routes
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes')
const profileRoutes = require('./profileRoutes')

// Endpoints for "/" path
module.exports = () => {
  // HOME/TEST
  // GET /api/
  router.get('/', (req, res, next) => { // part of express tool belt
    res.send("Welcome to Bob's Garage 👨‍🔧")
  })

  // PRODUCT /api/products
  router.use('/products', productRoutes())

  // AUTH /api/auth
  router.use('/auth', authRoutes())

  // USER /api/users
  router.use('/users', userRoutes())

  // PROFILE /api/profile
  router.use('/profile', profileRoutes())

  // ADMIN /api/admin
  router.use('/admin', adminRoutes())

  return router
}
