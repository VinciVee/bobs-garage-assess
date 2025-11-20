const express = require('express')
const router = express.Router()

const db = require('../models')
const { User } = db.sequelize.models

module.exports = () => {
  // AUTH TEST ROUTE: Lists all users (GET): /api/auth/users
  // router.get('/users', AuthController.listUsers)
  // Only referencing listUsers - insteading of using listUsers()

  // AUTH: Register / Sign up (POST): /api/auth/register
  router.post('/register', async(req,res) => {
    console.log('/api/auth/register - POST')

    const { firstName, lastName, email, password, image } = req.body

    try {
      let user = await User.findOne({ where: { email: email }})

      if(user){
        return res.status(400).json({ msg: 'An error occured while registering this user.' })
      }

      const newUser = {
        firstName, lastName, email, image, password
      }
      res.send(200).send(newUser)

    } catch(error) {
      console.log(error)
    }
  })


  // AUTH: Login / Sign in (POST) Route: /api/auth/log
  router.post('/login', async(req,res) => {
    console.log('/api/auth/login - POST')
    const { email, password } = req.body

    try {
      let user = await User.findOne({ where: { email: email }})
      if(!user){
        return res.status(400).json({ msg: 'Invalid credentials' })
      }

      res.status(200).send(user)

    } catch (error) {
      console.log(error.message)
      res.status(500).json({ msg: 'Server Error', error: error.message })
    }
  })

  return router
}
