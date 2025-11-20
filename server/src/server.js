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
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

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
app.use(cors(corsOptions))

// Default middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express endpoints
startlog('Accessing endpoints under /api ...')
app.use('/api', routes())

// Create a test route
// app.get('/test', (req, res) => {
//   console.log('/test - get');
//   res.status(200).send(' I am a server, and I am up!');
// });

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
