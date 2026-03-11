const usersLog = require('debug')('app:users')
// Database models
const db = require('../models')
const { User, Profile } = db.sequelize.models
// Utilities
const ApiError = require('../utilities/ApiError')
const { hashPassword } = require('../utilities/authServices')

module.exports = {
  // GET ALL USER
  async getAllUsers(req,res,next) {
    usersLog(`[${req.method}] ${req.url}`)
    try {
      const options = {
        attributes: { exclude: ['password']},
        include: Profile,
      }
      const userList = await User.findAll(options)
      res.send(userList)

    } catch (error) {
      return next(ApiError.internal('Items could not be retrieved', error))
    }
  },

  // ADD USER
  async addUser(req,res,next) {
    usersLog(`[${req.method}] ${req.url}`)
    const { firstName, lastName, email, image, password, isAdmin } = req.body

    try {
      const userExist = await findEmail(email)
      if(userExist){
        return next(ApiError.badRequest('This user is already registered.'))
      }
      const user = await User.create({
        firstName,
        lastName,
        email,
        image,
        password: await hashPassword(password),
        isAdmin
      })
      usersLog('Added User:\n', JSON.stringify(user))
      res.send(user)
    } catch (error) {
      return next(ApiError.internal('The item selected could not be added', error))
    }
  },

  // UPDATE USER
  async updateUser(req,res,next) {
    usersLog(`[${req.method}] ${req.url}, body: ${JSON.stringify(req.body)}`)
    try {
      const id = Number(req.params.id)
      if(!id) {
        return next(ApiError.badRequest('User could not be found'))
      }
      const { firstName, lastName, email, image, password, isAdmin } = req.body

      let updatedUser = {
        firstName,
        lastName,
        email,
        image: 'http://localhost:3001/' + image,
        password: password ? await hashPassword(password) : password,
        isAdmin
      }
      // if(password) updatedUser.password = await hashPassword(password)
      const response = await User.update(updatedUser, { where: { id : id } })

      // Retrieve updated user from database to send as response
      const user = await User.findByPk(id)

      if (user === null) {
        return next(ApiError.badRequest('The item(s) you were looking for do not exist'))
      }

      usersLog('User Updated. Sending back user: ', user)
      res.status(200).send(user)

    } catch (error) {
      return next(ApiError.internal('The item selected could not be updated', error))
    }
  },

  // DELETE USER
  async deleteUser(req,res,next) {
    usersLog(`[${req.method}] ${req.url}`)
    try {
      const id = Number(req.params.id)

      if(!id) {
        return next(ApiError.badRequest('User could not be found'))
      }
      User.destroy({ where: { id : id }})
      res.send(`User ${id} deleted`)
    } catch (error) {
      return next(ApiError.internal('The item selected could not be deleted', error))
    }
  }
}
