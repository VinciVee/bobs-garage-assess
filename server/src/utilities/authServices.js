const config = require('../config/config')
const db = require('../models')
const { User } = db.sequelize.models

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  // Find duplicate user
  async findUser(userEmail){
    const usersRef = await User.findOne({ where: { email: userEmail } })
    return usersRef
  },

  // Hash password
  async hashPassword(password){
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    return hashPassword
  },

  // Mint the token
  jwtSignUser(user){
    const payload = {
      user: {
        userId: user.userId,
        firstName: user.firstName,
        email: user.email,
        isAdmin: user.isAdmin
      }
    }
    const secret = config.authentication.jwtSecret
    const tokenExpireTime = 60 * 60 * 24 // Time To Live (TTL) - 24 hrs in seconds

    const token = jwt.sign(
      payload,
      secret,
      { expiresIn: tokenExpireTime }
    )

    return token
  },

  async comparePassword(dbPassword, password){
    const passwordMatch = await bcrypt.compare(
      password, dbPassword
    )
    return passwordMatch
  }
}
