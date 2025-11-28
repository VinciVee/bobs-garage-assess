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
// Product
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

// User
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

// Profile - for user profiles - holds preferences and other info
// Profile - UserUserId - foreign key
const Profile = sequelize.define('Profile',
  {
    profileId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    themePreference: {
      type: DataTypes.STRING,
      defaultValue: 'light',
    },
    favourites: {
      type: DataTypes.JSON(DataTypes.INTEGER),
      defaultValue: [],
      allowNull: true,
    },
    bio: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: true },
  })

// ASSOCIATIONS
User.hasOne(Profile)
Profile.belongsTo(User)

// SEQUELIZE VARIABLES
db.sequelize = sequelize
db.Sequelize = Sequelize

// export the variables
module.exports = db
module.exports.Op = Sequelize.Op
