const express = require('express')
const router = express.Router()

const db = require('../models')
const { User } = db.sequelize.models
const ApiError = require('../utilities/ApiError')

const { findUser, hashPassword, jwtSignUser, comparePassword } = require('../utilities/authServices')

module.exports = () => {
  // AUTH TEST ROUTE: Lists all users (GET): /api/auth/users
  // router.get('/users', AuthController.listUsers)
  // Only referencing listUsers - insteading of using listUsers()

  // AUTH: Register / Sign up (POST): /api/auth/register
  router.post('/register', async(req,res,next) => {
    console.log('/api/auth/register - POST')
    const { firstName, lastName, email, image, password } = req.body

    try {
      const user = await findUser(email)

      if(user !== null){
        return next(ApiError.badRequest('This email already exists'))
      }
      const newUser = {
        firstName, lastName, email, image, password
      }
      newUser.password = await hashPassword(password)
      const userRes = await User.create(newUser)

      if (userRes === null) {
        return next(ApiError.badRequest('An error occured while registering this user.'))

      } else {
        res.send({
          token: jwtSignUser(user)
        })
      }
    } catch(error) {
      return next(ApiError.internal('Your profile could not be registered at this time ...', error))
    }
  })


  // AUTH: Login / Sign in (POST) Route: /api/auth/log
  router.post('/login', async(req,res,next) => {
    console.log('/api/auth/login - POST')
    const { email, password } = req.body

    try {
      let user = await findUser(email)
      if(!user){
        return next(ApiError.badRequest('Incorrect email or password (DEBUG - email)'))
      }

      const isMatch = await comparePassword(user.password, password)

      if(!isMatch) {
        return next(ApiError.badRequest('Incorrect email or password (DEBUG - password)'))
      } else {
        res.send({
          token: jwtSignUser(user)
        })
      }
    } catch (error) {
      return next(ApiError.internal('Your profile could not be logged in at this time ...', error))
    }
  })

  return router
}
