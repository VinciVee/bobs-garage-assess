// Checks if token is present, and passes back messages aboutit

// Modules
const jwt = require('jsonwebtoken')
const debugAuth = require('debug')('app:auth')
// Utilities
const apiError = require('../utilities/ApiError')
const { jwtVerifyToken } = require('../utilities/authServices')

// Verifies if token is valid
module.exports = function(req, res, next) {
  const token = req.header('x-auth-token')
  // debugAuth('Auth middleware..., token: ', token)

  if(!token) return next(apiError.badRequest('No token supplied, authorisation denied'))

  try {
    const {valid, expired, decoded} = jwtVerifyToken(token)

    if (!valid) {
      if (expired) return next(apiError.badRequest('Token expired'))
      return next(apiError.badRequest('Invalid token'))
    }

    debugAuth('Decoding token... token: %O', decoded.user)
    req.user = decoded.user , next()
  } catch (error) {
    return next(apiError.internal('Could not retrieve token', error))
  }
}
