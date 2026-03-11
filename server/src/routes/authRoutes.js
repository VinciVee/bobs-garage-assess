/**
 * Routes for authentication
 *
 *
 * */
// Router setup
const express = require('express')
const router = express.Router()
// Middleware
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const { registerSchema, loginSchema } = require('../utilities/schemas')

const AuthController = require('../controllers/authController')


module.exports = () => {
  // REGISTER
  // POST /api/auth/register
  router.post('/register',
    [validate(registerSchema)],
    AuthController.register
  )

  // LOGIN
  // POST /api/auth/log
  router.post('/login',
    [validate(loginSchema)],
    AuthController.login
  )

  // GET LOGGED IN USER
  // GET /api/auth/
  // Token is passed through the headers and is checked by 'auth'
  router.get('/',
    [auth],
    AuthController.getLoggedUser
  )

  return router
}
