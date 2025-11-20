/**
 * Name:
 * Author:
 * Version:
 * Purpose:
 *
 */
// Import Packages
const express = require('express');
require('dotenv').config()
const db = require('./models')
const helmet = require('helmet')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Import config & routes
const config = require('./config/config')
const apiErrorHandler = require('./middleware/apiErrorHandler')
const ApiError = require('./utilities/ApiError')
const routes = require('./routes/routes')

// Custom debug logs
const startlog = require('debug')('app:startup')

// Initiailise express app variable
const app = express();

// ---------- MIDDLEWARE ----------
app.use(helmet())
app.use(cors(corsOptions))

// Default middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express endpoints
startlog('Accessing endpoints under /api ...')
app.use('/api', routes())

// ERROR HANDLERS: 404 NOT FOUND
app.use((req, res, next) => {
  // const err = new Error('404 - Resource Not Found')
  // err.status = 404
  // res.status(err.status).send(err)
  next(ApiError.notFound())
})

// ERROR HANDLER: 400s & 500s ("everything else")
app.use(apiErrorHandler)

/*
  APP.LISTEN
  Purpose: will check if the tables exist - if they do not exist, then it will create them
*/
db.sequelize.sync().then(() => {
  app.listen(config.port,
    () => console.log(`Server is running on port: ${config.port}`)
  )
})
