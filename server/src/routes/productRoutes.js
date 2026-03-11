// Router setup
const express = require('express')
const router = express.Router()
// Middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const validate = require('../middleware/validate')
const { addServiceSchema, updateServiceSchema } = require('../utilities/schemas')
const createUploader = require('../middleware/uploader')

const ProductController = require('../controllers/productController')
const UploadImage = createUploader()

module.exports = () => {
  // GET ALL PRODUCTS
  // GET /api/products
  router.get('/',
    ProductController.getAllProducts
  )

  // GET SINGLE PRODUCT
  // GET /api/products/:id
  router.get('/:id',
    ProductController.getProduct
  )

  // ADDING A PRODUCT
  // POST /api/products
  router.post('/',
    [
      auth,
      admin,
      UploadImage,
      validate(addServiceSchema)
    ],
    ProductController.addProduct
  )

  // UPDATE PRODUCT
  // PUT /api/products/:id
  router.put('/:id',
    [
      auth,
      admin,
      UploadImage,
      validate(updateServiceSchema)
    ],
    ProductController.updateProduct
  )

  // DELETING A PRODUCT
  // DELETE /api/products/:id
  router.delete('/:id',
    [
      auth,
      admin
    ],
    ProductController.deleteProduct
  )

  // ORDERING RESULTS
  // GET /api/products/sort/:field/:direction
  router.get('/sort/:field/:direction',
    ProductController.orderResults
  )

  // FILTER SEARCH RESULTS
  // GET /api/products/s/:search
  router.get('/s/:search',
    ProductController.filterResults
  )

  return router
}
