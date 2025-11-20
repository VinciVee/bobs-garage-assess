module.exports = {
  port: process.env.PORT,
  // set up our database config
  db: {
    // database name
    database: process.env.DB_NAME,
    // Database username
    user: process.env.DB_USER,
    // Database password
    password: process.env.DB_PASS,
    // Database options.
    options: {
      // Dialect - refers to the type of database we are conecting to
      dialect: process.env.DIALECT,
      // Host: where the database is hosted
      host: process.env.DB_HOST,
      // Port - which port the database uses
      port: process.env.DB_PORT,
    }
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET
  }
}
