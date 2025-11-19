// src/models/index.js
// This file will hold our database information and Models

// Import the sequelize package
// This is an ORM package (object-relational mapping package)
// We need to package to initialize our database and create the models for our tables

const { Sequelize, DataTypes } = require('sequelize')
// Import the config
const config = require('../config/config')

// Create a variable to hold our db information
let db = {}

// Create a new sequelize object
// Pass in our database details
// Initialize our database connection with the options we specified in our config
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// Set up our models
// Configure our models product and user tables
// We can use the defined method to set up our models
const Product = sequelize.define('Product',
  {
    prodId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT('long') },
    image: { type: DataTypes.STRING },
    price: { type: DataTypes.REAL(3,2), allowNull: false }
  }
)

const User = sequelize.define('User',
  {
    userId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
  }
)

// Set up our variables
// Sequalize refers to library itself - gives access to class and methods
// sequelize refers to an instance of Sequelize - represents connection to one database
db.sequelize = sequelize
db.Sequelize = Sequelize

// export the variables
module.exports = db
module.exports.Op = Sequelize.Op
