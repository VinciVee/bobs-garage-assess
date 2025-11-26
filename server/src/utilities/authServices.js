// Modules
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
// Database Models
const db = require('../models')
const { User } = db.sequelize.models
// Config
const config = require('../config/config')

module.exports = {
  // FIND EMAIL IN USER LIST
  async findUser(userEmail){
    const usersRef = await User.findOne({ where: { email: userEmail } })
    return usersRef
  },

  // HASH PASSWORD
  async hashPassword(password){
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    return hashPassword
  },

  // REMOVE PASSWORD FROM USER DETAILS BEFORE SENDING TO CLIENT
  // async userDetailsToJSON(id){
  // // Structure the data payload to be saved within the token
  //   const usersRef = db.collection('users')
  //   const user = await usersRef.doc(id).get()
  //   const userJSON = _.omit(
  //     { id: id, ...user.data() },
  //     'password'
  //   )
  //   console.log(userJSON)
  //   return userJSON
  // },

  // MINT TOKEN
  jwtSignUser(user){
    const payload = {
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        isAdmin: user.isAdmin
    }}
    const secret = config.authentication.jwtSecret
    const tokenExpireTime = 60 * 60 * 24 * 7 // Time To Live (TTL) - 7 days in seconds
    const token = jwt.sign(
      payload,
      secret,
      { expiresIn: tokenExpireTime })
    return token
  },

  // VERIFY TOKEN
  jwtVerifyToken(token){
    try {
      const decoded = jwt.verify(token, config.authentication.jwtSecret)
      return { valid: true, expired: false, decoded }

    } catch (error) {
      if (error && error.name === 'TokenExpiredError') {
        return { valid: false, expired: true, decoded: null }
      }
      return { valid: false, expired: false, decoded: null, error: error }
    }
  },

  // COMPARE PASSWORD
  async comparePassword(dbPassword, password){
    const passwordMatch = await bcrypt.compare(
      password, dbPassword )
    return passwordMatch
  },
}
