// Database models
const db = require('../models')
const { Product } = db.sequelize.models
const { Op } = require('../models')
// Utilities
const ApiError = require('../utilities/ApiError')
// Debugging
const productsLog = require('debug')('app:products') // replaces console.log()

module.exports = {
  // GET ALL PRODUCTS
  async getAllProducts(req,res,next) {
    try {
      productsLog(`Product routes: [${req.method}] ${req.url}`)
      // find all products
      const list = await Product.findAll()

      if (list.length === 0) {
        return next(ApiError.badRequest('The item(s) you were looking for do not exist'))
      }
      res.status(200).send(list)

    } catch (error) {
      return next(ApiError.internal('The items selected could not be found', error))
    }
  },

  // GET PRODUCT
  async getProduct(req,res,next) {
    try {
      productsLog(`Product routes: [${req.method}] ${req.url}`)

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
    }
  },

  // ADD PRODUCT
  async addProduct(req,res,next) {
    try {
      productsLog(`Product routes: [${req.method}] ${req.url}`)
      const { name, desc, image, price } = req.body

      // Add new product - Id is added by database
      const product = await Product.create({
        name,
        desc,
        image,
        price
      })

      productsLog('New product:\n', product.toJSON())
      res.status(201).send(product)

    } catch(error) {
      return next(ApiError.internal('The item could not be retrieved', error))
    }
  },

  // UPDATE PRODUCT
  async updateProduct(req,res,next) {
    try {
      productsLog(`Product routes: [${req.method}] ${req.url}`)

      const id = Number(req.params.id)
      const { name, desc} = req.body
      const price = Number(req.body.price)
      const image = req.fileUrl
      // Update product
      const updated = await Product.update({
        name,
        desc,
        image,
        price
      }, { where: { id: id } })

      if(!updated){
        return next(ApiError.badRequest('Bad request: product could not be updated'))}

      // Getting product to return
      const product = await Product.findByPk(id)
      productsLog('Product updated...\n', product)
      res.status(200).send(product)

    } catch (error) {
      return next(ApiError.internal('The item selected could not be updated', error))
    }
  },

  // DELETE PRODUCT
  async deleteProduct(req,res,next) {
    productsLog(`Product routes: [${req.method}] ${req.url}`)
    try {
      let id = Number(req.params.id)
      productsLog(`/api/products/delete/:${id} - DELETE`)

      // Removing product
      Product.destroy({ where: { id: id } })
      res.status(204).send(`Id: ${id} deleted`)

    } catch (error) {
      return next(ApiError.internal('The item selected could not be removed', error))
    }
  },

  // ORDERING RESULTS
  async orderResults(req,res,next) {
    productsLog(`Product routes: [${req.method}] ${req.url}`)
    const field = req.params.field  // Table columns
    const direction = req.params.direction // ASC or DESC

    try {
      // Get all products in order
      const list = await Product.findAll({
        order: [[ `${field}`, `${direction}`]] })

      res.status(200).send(list)

    } catch (error) {
      return next(ApiError.internal('The items could not be retrieved'))
    }
  },

  // FILTER SEARCH RESULTS
  async filterResults(req,res,next) {
    productsLog(`Product routes: [${req.method}] ${req.url}`)

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
    }
  }
}
