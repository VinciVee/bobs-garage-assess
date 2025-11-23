// Built-in & external modules
const express = require('express');
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()
const startlog = require('debug')('app:startup')
// Database
const db = require('./models')
// Middleware
const apiErrorHandler = require('./middleware/apiErrorHandler')
const auth = require('./middleware/auth')
const admin = require('./middleware/admin')
// Utilities
const ApiError = require('./utilities/ApiError')
// Core app setup
const routes = require('./routes/routes')
const config = require('./config/config')
const corsOptions = require('./config/corsOptions')
const app = express();

// ---------- MIDDLEWARE ----------
app.use(helmet())
app.use(cors(corsOptions))
// Setting up uploads folder to serve static assets
app.use('./uploads', express.static('uploads'))

// Default middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express endpoints
app.use('/api', routes())

// ERROR HANDLERS: 404 NOT FOUND
app.use((req, res, next) => {
  next(ApiError.notFound())
})

// ERROR HANDLER: 400s & 500s ("everything else")
app.use(apiErrorHandler)

db.sequelize.authenticate()
  // Check DB connection
  .then(() => {
    startlog('Database connection succesful')
    return db.sequelize.sync()
})// Start server
  .then(() => {
    app.listen(config.port, () => startlog(`Port: ${config.port}`))
})// Error
  .catch((err) => {
    console.error('Unable to connect or sync to database: ', err)
})
