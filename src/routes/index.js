const express = require('express')
const paginate = require('express-paginate')
const router = express.Router()

const BlogController = require('../controllers/BlogController')

router.use(paginate.middleware(3, 5))

// Index page
router.get('/', BlogController.index.blog)

// User routes
const userRouter = require('./user')
router.use('/', userRouter)

// Blog routes
const blogRouter = require('./blog')
router.use('/post/', blogRouter)

/*
// Check user authentication
function ensureAuthentication (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    next(createError(404))
  }
}
*/
module.exports = router
