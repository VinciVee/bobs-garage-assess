/**
 * src/models/index.js
 * This file will hold our database information and Models
 *
 */
// Import Sequelize - ORM package
const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config/config')

// Create a variable to hold our db information
let db = {}

// Create a new sequelize object
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// MODELS
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
    price: { type: DataTypes.DECIMAL(8,2), allowNull: false }
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

// SEQUELIZE VARIABLES
// Sequalize refers to library itself - gives access to class and methods
// sequelize refers to an instance of Sequelize - represents connection to one database
db.sequelize = sequelize
db.Sequelize = Sequelize

// export the variables
module.exports = db
module.exports.Op = Sequelize.Op
