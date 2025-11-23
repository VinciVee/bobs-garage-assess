// CUSTOM ERROR UTILITY CLASS
const debugError500 = require('debug')('app:error500')

class ApiError {
  // Properties to be passed in as parameters/arguments
  constructor(code, message, err) {
    this.code = code
    this.message = message
    this.err = err
  }

  // [400] Bad Request
  // PARAMETERS: Custom message + status code
  static badRequest(msg) {
    return new ApiError(400, `Bad Request: ${msg}`)
  }

  // [404] Not Found
  // PARAMETERS: Takes no arguments as it's a static error
  static notFound() {
    return new ApiError(404, 'Resource Not Found')
  }

  // [500] Internal Server Error
  // PARAMETERS: takes two arguments - custom message to the client + the error stack passed from the server/DB
  static internal(msg, err) {
    debugError500(err)
    return new ApiError(500, `Internal Server Error: ${msg}`)
  }
}

module.exports = ApiError
