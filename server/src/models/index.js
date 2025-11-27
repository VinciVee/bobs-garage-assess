// DATABASE
// Require Sequelize - ORM package
const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config/config')

// Variable to hold our db information
let db = {}

// New sequelize object
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// MODELS
const Product = sequelize.define('Product',
  { id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT('long') },
    image: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(8,2), allowNull: false }
})

const User = sequelize.define('User',
  { id:{
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
})

// SEQUELIZE VARIABLES
// Sequalize refers to library itself - gives access to class and methods
// sequelize refers to an instance of Sequelize - represents connection to one database
db.sequelize = sequelize
db.Sequelize = Sequelize

// export the variables
module.exports = db
module.exports.Op = Sequelize.Op
