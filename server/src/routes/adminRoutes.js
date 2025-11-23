// Routes for admin dashboard

// Built-in & external modules
const express = require('express')
const adminLog = require('debug')('app:admin') // replaces console.log
const fs = require('fs')
const multer = require('multer')
// Database models
// Middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
// Utilities
const ApiError = require('../utilities/ApiError')
const { error } = require('console')

// Router setup
const router = express.Router()

// Storage setup
const storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null, './uploads')
  },
  filename: function(req,file,cb) {
    cb(null, file.filename = file.originalname)
  },
})

// Upload setup
const upload = multer({ storage: storage })


module.exports = () => {
  // UPLOAD IMAGE
  // POST /api/admin/uploadImage
  router.post('/uploadImage', upload.single('file'), (req,res,next) => {
    try {
      adminLog(`[${req.method}] ${req.url}`)

    } catch (error) {
      return next(ApiError.internal('Image could not be uploaded ...', error))
    }
  })

  // GET IMAGE URL
  // GET /api/admin/getImageURL:filename
  router.get('/getImageURL:filename', (req,res,next) => {
    try {
      adminLog(`[${req.method}] ${req.url}`)

      const image = req.params.filename
      const url = `URL/${image}`

      res.status(200).send(url)

    } catch (error) {
      return next(ApiError.internal('Image could not be loaded ...', error))
    }

  })

  // GET IMAGE LIST
  // GET /api/admin/getImageList
  router.get('/getImageList', () => {
    adminLog(`[${req.method}] ${req.url}`)

    const path = './uploads'
    try {
      fs.readdir(path, (err, files) => {
        if(err) return next(ApiError.badRequest('An error occured while retrieving the image(s).'))

        adminLog('Files:\n', files)
        res.status(200).send(files)
      })
    } catch (error) {
      return next(ApiError.internal('Your image(s) could not be retrieved at this time ...', error))
    }
  })

  return router
}

