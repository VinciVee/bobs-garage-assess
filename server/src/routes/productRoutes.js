// Routes for products

// Built-in & external modules
const express = require('express')
const productsLog = require('debug')('app:products') // replaces console.log()
// Database models
const db = require('../models')
const { Product } = db.sequelize.models
const { Op } = require('../models')
// Middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
// Utilities
const ApiError = require('../utilities/ApiError')
// Router setup
const router = express.Router()

module.exports = () => {
  // GET ALL PRODUCTS
  // GET /api/products
  router.get('/', async (req,res,next) => {
    productsLog(`[${req.method}] ${req.url}`)

    try {
      // find all products
      const list = await Product.findAll()

      if (list.length === 0) {
        return next(ApiError.badRequest('The item(s) you were looking for do not exist'))
      }
      res.status(200).send(list)

    } catch (error) {
      return next(ApiError.internal('The items selected could not be found', error))
  }})


  // GET SINGLE PRODUCT
  // GET /api/products/edit/:id
  router.get('/:id', async (req,res,next) => {
    productsLog(`[${req.method}] ${req.url}`)

    try {
      let id = Number(req.params.id)
      productsLog('Getting Product: ', id)
      // Find product
      const product = await Product.findByPk(id)

      if (product === null) {
        return next(ApiError.badRequest('The item(s) you were looking for do not exist'))
      }
      res.status(200).send(product)

    } catch (error) {
      return next(ApiError.internal('The item selected could not be found', error))
  }})


  // UPDATE PRODUCT
  // PUT /api/products/edit/:id
  router.put('/edit/:id', [auth, admin], async (req,res,next) => {
    productsLog(`[${req.method}] ${req.url}`)

    try {
      let id = Number(req.params.id)
      const { name, desc, image } = req.body
      let price = Number(req.body.price)
      // Update product
      const updated = await Product.update(
        { name, desc, image, price }, { where: { id: id } })

      if(!updated){
        return next(ApiError.badRequest('Bad request'))}
      // Getting product to return
      const product = await Product.findByPk(id)
      productsLog('Product updated...\n', product)
      res.status(200).send(product)

    } catch (error) {
      return next(ApiError.internal('The item selected could not be updated', error))
  }})


  // DELETING A PRODUCT
  // DELETE /api/products/delete:id
  router.delete('/delete/:id', [auth, admin], (req,res,next) => {
    productsLog(`[${req.method}] ${req.url}`)
    try {
      let id = Number(req.params.id)
      productsLog(`/api/products/delete/:${id} - DELETE`)

      // Removing product
      Product.destroy({ where: { id: id } })
      res.status(204).send(`Id: ${id} deleted`)

    } catch (error) {
      return next(ApiError.internal('The item selected could not be removed', error))
  }})


  // ADDING A PRODUCT
  // POST /api/products/add
  router.post('/add', [auth, admin], async (req,res,next) => {
    productsLog(`[${req.method}] ${req.url}`)
    const { name, desc, image, price } = req.body

    try {
      // Add new product - Id is added by database
      const product = await Product.create({
        name, desc, image, price })

      productsLog('New product:\n', product.toJSON())
      res.status(201).send(product)

    } catch(error) {
      return next(ApiError.internal('The item could not be retrieved', error))
  }})


  // ORDERING RESULTS
  // GET /api/products/sort/:field/:direction
  router.get('/sort/:field/:direction', async(req,res,next) => {
    productsLog(`[${req.method}] ${req.url}`)
    const field = req.params.field  // Table columns
    const direction = req.params.direction // ASC or DESC

    try {
      // Get all products in order
      const list = await Product.findAll({
        order: [[ `${field}`, `${direction}`]] })

      res.status(200).send(list)

    } catch (error) {
      return next(ApiError.internal('The items could not be retrieved'))
  }})

  // FILTER SEARCH RESULTS
  // GET /api/products/s/:search
  router.get('/s/:search', async(req,res,next) => {
    productsLog(`[${req.method}] ${req.url}`)

    try {
      // Find products with name that match search
      const list = await Product.findAll(
        { where: {
            name: { [Op.like]: `%${req.params.search}%` }
          }
        })
      res.status(200).send(list)

    } catch (error) {
      return next(ApiError.internal('The items could not be retrieved', error))
  }})

  return router
}
