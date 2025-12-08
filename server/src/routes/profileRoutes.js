const express = require('express')
const profileLog = require('debug')('app:profile')
// Database models
const db = require('../models')
const { Profile } = db.sequelize.models
// Middleware
const auth = require('../middleware/auth')
// Utilities
const ApiError = require('../utilities/ApiError')
// Router setup
const router = express.Router()

module.exports = () => {
  // PUT /api/profile
  // Edit user's profile - note: ':id' is user id.
  router.put('/', auth, async (req,res,next) => {
    profileLog(`[${req.method}] ${req.url}, data: ${req.body}`)
    try {
      const userId = Number(req.user.id)
      const options = {
        where: {
          UserId : userId
        }
      }

      // Check if profile exists
      const profile = await Profile.findOne(options)

      if(!profile) {
        return next(ApiError.badRequest('Item not found'))
      }

      // Update profile
      const response = await profile.update(req.body)

      profileLog(`Profile update response: ${response}`)
      res.status(200).send(profile.toJSON())

    } catch (error) {
      return next(ApiError.internal('The item selected could not be updated', error))
    }
  })

  return router

}
