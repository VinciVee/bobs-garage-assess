const express = require('express')
const router = express.Router()

const db = require('../models')
const { Product } = db.sequelize.models

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const ApiError = require('../utilities/ApiError')

module.exports = () => {
  // GET ALL PRODUCTS
  // (GET) /api/products
  // Type: Public
  router.get('/', async (req,res,next) => {
    // log the path and request
    console.log('/api/products - GET')

    try {
      const list = await Product.findAll()

      if (list.length === 0) {
        return next(ApiError.badRequest('The item(s) you were looking for do not exist'))
      } else {
        res.status(200).send(list)
      }
    } catch (error) {
      return next(ApiError.internal('The items selected could not be found', error))
    }
  })


  // GET A SINGLE PRODUCT
  // (GET) /api/products/edit/:id
  // Type: Public
  router.get('/:id', async (req,res,next) => {
    // log the path and request
    console.log('/api/products/:id - GET')

    try {
      let id = req.params.id
      id = Number(id) // typecast to number
      console.log(id)

      const product = await Product.findByPk(id)

      if (product === null) {
        return next(ApiError.badRequest('The item(s) you were looking for do not exist'))
      } else {
        res.status(200).send(product)
      }
    } catch (error) {
      return next(ApiError.internal('The item selected could not be found', error))
    }
  })


  // UPDATING A PRODUCT
  // (PUT) /api/products/edit/:id
  // Type: Private
  router.put('/edit/:id', [auth, admin], async (req,res,next) => {
    try {
      let id = Number(req.params.id)
      console.log(`/api/products/edit/:${id} - PUT`)

      const { name, desc, image } = req.body
      let price = Number(req.body.price)

      const updated = await Product.update(
        { name, desc, image, price },
        { where: { prodId: id } }
      )

      if(!updated){
        return next(ApiError.badRequest('Bad request'))
      } else {
        const product = await Product.findByPk(id)
        // console.log('Product updated...')
        res.status(200).send(product)
      }
    } catch (error) {
      return next(ApiError.internal('The item selected could not be updated', error))
    }
  })


  // DELETING A PRODUCT
  // (DELETE) /api/products/delete:id
  // Type: Private - staff & admin
  router.delete('/delete/:id', [auth, admin], (req,res,next) => {
    try {
      // log the path and request
      let id = Number(req.params.id)
      console.log(`/api/products/delete/:${id} - DELETE`)

      Product.destroy({ where: { prodId: id } })
      // 204 - not sending back content, except id
      res.status(204).send(`Id: ${id} deleted`)
    } catch (error) {
      return next(ApiError.internal('The item selected could not be removed', error))
    }
  })


  // ADDING A PRODUCT
  // (POST) /api/products/add
  // Type: Private - staff & admin only
  router.post('/add', [auth, admin], async (req,res,next) => {
    console.log('/api/products/add - POST')

    const { name, desc, image, price } = req.body
    const product = await Product.create({
      name, // Id is handled by database
      desc,
      image,
      price
    })
    console.log(product.toJSON())

    try {
      res.status(201).send(product)
    } catch(error) {
      return next(ApiError.internal('The item could not be added', error))
    }
  });

  return router
}
