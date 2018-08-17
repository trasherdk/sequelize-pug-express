const express = require('express')
const createError = require('http-errors')
const router = express.Router()

const UserController = require('../controllers/UserController')
const BlogController = require('../controllers/BlogController')
const validation = require('./validation')

// Index page
router.get('/', BlogController.index.blog)

// User Registration
router.get('/register', UserController.register.Get)
router.post('/register', validation.register, UserController.register.Post)

// User Login
router.get('/login', UserController.login.Get)
router.post('/login', validation.login, UserController.login.Post)
router.get('/logout', UserController.logout)

// Add Article
router.get('/add', ensureAuthentication, BlogController.add.Get)
router.post('/add', ensureAuthentication, validation.add, BlogController.add.Post)

// Edit Article
router.get('/edit/:id', ensureAuthentication, BlogController.edit.Get)
router.post('/edit/:id', ensureAuthentication, validation.edit, BlogController.edit.Post)

// Article Page
router.get('/:id', BlogController.index.article)

// Delete Article
router.delete('/:id', ensureAuthentication, BlogController.delete)

function ensureAuthentication (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    next(createError(404))
  }
}

module.exports = router
