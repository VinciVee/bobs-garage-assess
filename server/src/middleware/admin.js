/**
 * src/middleware/admin.js
 * Middleware to test for admin users
 *
 */
function admin(req,res,next){
  console.log('Admin middleware... isAdmin: ', req.user.isAdmin)

  if(!req.user.isAdmin) {
    return next(ApiError.badRequest('Access Denied'))
  }

  next()
}

module.exports = admin
