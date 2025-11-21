/**
 * src/middleware/auth.js
 * Checks if token is present, and passes back messages aboutit
 *
 */
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const ApiError = require('../utilities/ApiError')
const debugAuth = require('debug')('app:auth')

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token')
  debugAuth('Auth middleware..., token: ', token)

  if(!token) {
    return next(ApiError.badRequest('No token supplied, authorisation denied'))
  }
  try {
    const decoded = jwt.verify(token, config.authentication.jwtSecret)

    debugAuth('Decoding token... token: %O', decoded.user)
    req.user = decoded.user
    next()
  } catch (error) {
    return next(ApiError.internal('Could not retrieve token', error))
  }
}
