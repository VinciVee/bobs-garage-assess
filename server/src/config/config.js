// Configs
module.exports = {
  port: process.env.PORT,
  db: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    options: {
      dialect: process.env.DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      logging: false,
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET
  },
  // Approved CORS whitelist
  corsAllowedOptions: [
    process.env.CORS_WHITELIST_1,
    process.env.CORS_WHITELIST_2,
    process.env.CORS_WHITELIST_3,
  ]
}
