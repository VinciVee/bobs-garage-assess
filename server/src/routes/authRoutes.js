// Routes for authentication

// Built-in & external modules
const express = require('express')
const authLog = require('debug')('app:authRoutes') // replaces console.log()
// Database models
const db = require('../models')
const { User } = db.sequelize.models
// Middleware
const auth = require('../middleware/auth')
// Utilities
const ApiError = require('../utilities/ApiError')
const { findUser, hashPassword, jwtSignUser, comparePassword } = require('../utilities/authServices')
// Router setup
const router = express.Router()


module.exports = () => {
  // REGISTER
  // POST /api/auth/register
  router.post('/register', async(req,res,next) => {
    authLog(`[${req.method}] ${req.url}`)
    const { firstName, lastName, email, image, password } = req.body

    try {
      const user = await findUser(email)

      if(user !== null) return next(ApiError.badRequest('This email already exists'))

      const newUser = {
        firstName, lastName, email, image, password
      }
      newUser.password = await hashPassword(password)
      // Add new user
      const userRes = await User.create(newUser)

      if (userRes === null) return next(ApiError.badRequest('An error occured while registering this user.'))
      // Login new user
      res.send({ token: jwtSignUser(userRes.toJSON()) })
    } catch(error) {
      return next(ApiError.internal('Your profile could not be registered at this time ...', error))
  }})


  // LOGIN
  // POST /api/auth/log
  router.post('/login', async(req,res,next) => {
    authLog(`[${req.method}] ${req.url}`)
    const { email, password } = req.body

    try {
      // Find user
      let user = await findUser(email)
      if(!user) return next(ApiError.badRequest('Incorrect email or password'))

      const isMatch = await comparePassword(user.password, password)

      if(!isMatch) return next(ApiError.badRequest('Incorrect email or password'))

      res.send({ token: jwtSignUser(user) })
    } catch (error) {
      return next(ApiError.internal('Your profile could not be logged in at this time ...', error))
    }
  })


  // GET LOGGED IN USER
  // GET /api/auth/
  router.get('/', auth, async(req,res,next) => {
    authLog(`[${req.method}] ${req.url}, user id:${req.user.id}`)
    const options = {
      attributes: {exclude: ['password']}}

    try {
      // Find logged-in user and return details w/out password
      const user = await User.findByPk(req.user.id, options)
      authLog('[loaduser] Returning found user...')
      res.json(user)

    } catch (error) {
      return next(ApiError.internal('Unable to retrieve user data', error))
  }})

  return router
}
