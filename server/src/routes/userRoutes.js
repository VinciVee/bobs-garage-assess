const express = require('express')
const router = express.Router()

const db = require('../models')
const { User } = db.sequelize.models
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const ApiError = require('../utilities/ApiError')
const { hashPassword } = require('../utilities/authServices')

module.exports = () => {
  // GET ALL USERS
  // GET Request
  router.get('/', async(req,res,next) => {
    console.log('/api/users - GET')

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

  // ADD A NEW USER
  // POST Request
  router.post('/add', [auth, admin], async(req,res,next) => {
    console.log('/api/users/add - POST. REQ BODY:', req.body)
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
      console.log(user.toJSON())
      res.send(user)
    } catch (error) {
      return next(ApiError.internal('The item selected could not be added', error))
    }
  })


  // EDIT A USER BY ID
  // PUT Request
  router.put('/edit/:id', [auth, admin], async(req,res,next) => {
    console.log('/api/users/edit/:id - PUT')
    // console.log(req.body)
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
      }, { where: { userId : id }})

      console.log('User details updated:\n', user.toJSON())
      // send response to the client
      res.send(user)
    } catch (error) {
      return next(ApiError.internal('The item selected could not be updated', error))
    }
  })


  // DELETE USER BY ID
  // DELETE Request
  router.delete('/delete/:id', [auth, admin], async(req,res,next) => {
    console.log('/api/users/delete/:id - DELETE')
    try {
      const id = Number(req.params.id)

      if(!id) {
        return next(ApiError.badRequest('User could not be found'))
      }
      User.destroy({ where: { userId : id }})
      res.send(`User ${id} deleted`)
    } catch (error) {
      return next(ApiError.internal('The item selected could not be deleted', error))
    }
  })

  return router
}
