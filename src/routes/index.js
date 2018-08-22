const express = require('express')
const paginate = require('express-paginate')
const { Blog } = require('../models')
const router = express.Router()

const Sequelize = require('sequelize')
const Op = Sequelize.Op
// const BlogController = require('../controllers/BlogController')

router.use(paginate.middleware(5, 10))

// Index page
router.get('/', async (req, res, next) => {
  let sort = req.query.sort || 'createdAt'
  let age = req.query.age || 'DESC'
  let limit = req.query.limit || '3'
  let results
  try {
    results = await Blog.findAndCountAll({limit: req.query.limit, offset: req.skip, order: [[sort, age]], where: {active: true}})
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

router.get('/search/', async (req, res, next) => {
  try {
    req.query.page = req.query.page || 1
    req.skip = req.offset = (req.query.page * 5) - 5
    let search = req.query.val
    console.log(req.skip)
    let results = await Blog.findAndCountAll({
      where: {
        [Op.or]: [
          'title', 'author', 'text', 'textFull'
        ].map(key => ({
          [key]: {
            [Op.like]: `%${search}%`
          }
        }))
      },
      limit: 5,
      offset: req.skip
    })
    if (!results.count) {
      results.notFound = 'По вашему запросу ничего не найдено'
    }
    const itemCount = results.count
    const pageCount = Math.ceil(results.count / req.query.limit)
    res.render('search', {
      notFound: results.notFound,
      articles: results.rows,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    })
  } catch (err) { next(err) }
})

// User routes
const userRouter = require('./user')
router.use('/user/', userRouter)

// Blog routes
const blogRouter = require('./blog')
router.use('/post/', blogRouter)

module.exports = router
