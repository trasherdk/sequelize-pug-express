const express = require('express')
const paginate = require('express-paginate')
const { Blog } = require('../models')
const router = express.Router()
// const BlogController = require('../controllers/BlogController')

router.use(paginate.middleware(3, 10))

// Index page
router.get('/', async (req, res, next) => {
  let sort = req.query.sort || 'createdAt'
  let age = req.query.age || 'DESC'
  let limit = req.query.limit || '3'
  try {
    let results = await Blog.findAndCountAll({limit: req.query.limit, offset: req.skip, order: [[sort, age]]})
    const itemCount = results.count
    const pageCount = Math.ceil(results.count / req.query.limit)
    res.render('index', {
      articles: results.rows,
      pageCount,
      itemCount,
      orderValues: {
        sort: sort,
        age: age,
        limit: limit
      },
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    })
  } catch (err) { next(err) }
})

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
