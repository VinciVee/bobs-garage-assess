// Routes for users

// Built-in & external modules
const express = require('express')
const usersLog = require('debug')('app:users')
// Database models
const db = require('../models')
const { User } = db.sequelize.models
// Middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
// Utilities & Services
const ApiError = require('../utilities/ApiError')
const { hashPassword } = require('../utilities/authServices')
// Router setup
const router = express.Router()

module.exports = () => {
  // GET /api/users/ - get all users
  router.get('/', async(req,res,next) => {
    usersLog(`[${req.method}] ${req.url}`)
    try {
      const options = {
        attributes: { exclude: ['password']}
      }
      const userList = await User.findAll(options)
      res.send(userList)

    } catch (error) {
      return next(ApiError.internal('Items could not be retrieved', error))
    }
  })

  // GET ONE USER BY ID
  // router.get('/:id', async(req,res,next) => {
  //   console.log('/api/users/:id')
  // })

  // POST /api/users/add - add a new user
  router.post('/add', [auth, admin], async(req,res,next) => {
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
      usersLog('Added User:\n', user.toJSON())
      res.send(user)
    } catch (error) {
      return next(ApiError.internal('The item selected could not be added', error))
    }
  })


  // PUT /api/users/edit/:id - edit a user
  router.put('/edit/:id', [auth, admin], async(req,res,next) => {
    usersLog(`[${req.method}] ${req.url}`)
    try {
      const id = Number(req.params.id)
      if(!id) {
        return next(ApiError.badRequest('User could not be found'))
      }
      const { firstName, lastName, email, image, password, isAdmin } = req.body

      const user = await User.update({
        firstName,
        lastName,
        email,
        image,
        password: await hashPassword(password),
        isAdmin
      }, { where: { id : id }})

      usersLog('User details updated:\n', user.toJSON())
      res.send(user)

    } catch (error) {
      return next(ApiError.internal('The item selected could not be updated', error))
    }
  })


  // DELETE /api/users/delete/:id - delete user
  router.delete('/delete/:id', [auth, admin], async(req,res,next) => {
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
  })

  return router
}
