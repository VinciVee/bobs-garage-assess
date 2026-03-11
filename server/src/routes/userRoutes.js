// Router setup
const express = require('express')
const router = express.Router()
// Middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const validate = require('../middleware/validate')
// Utilities
const { addUserSchema, updateUserSchema } = require('../utilities/authServices')

const UserController = require('../controllers/userController')

module.exports = () => {
  // GET /api/users/
  // Get all users
  router.get('/',
    UserController.getAllUsers
  )

  // GET ONE USER BY ID
  // router.get('/:id', async(req,res,next) => {
  //   console.log('/api/users/:id')
  // })

  // POST /api/users/
  // Add a new user
  router.post('/',
    [
      auth,
      admin,
      validate(addUserSchema),
    ],
    UserController.addUser
  )

  // PUT /api/users/:id
  // Edit a user
  router.put('/:id',
    [
      auth,
      admin,
      validate(updateUserSchema)
    ],
    UserController.updateUser
  )

  // DELETE /api/users/:id
  // delete user
  router.delete('/:id',
    [
      auth,
      admin
    ],
    UserController.deleteUser
  )

  return router
}
