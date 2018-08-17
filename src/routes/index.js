const express = require('express')
const router = express.Router()

const IndexController = require('../controllers/IndexController')
const UserController = require('../controllers/UserController')
const BlogController = require('../controllers/BlogController')
const validation = require('./validation')

// Index page
router.get('/', IndexController.index)

// User Registration
router.get('/register', UserController.register.Get)
router.post('/register', validation.register, UserController.register.Post)

// User Login
router.get('/login', UserController.login.Get)
router.post('/login', UserController.login.Post)
router.get('/logout', UserController.logout)

// Add Article
router.get('/add', BlogController.add.Get)
router.post('/add', validation.add, BlogController.add.Post)

// Edit Article
router.get('/edit/:id', BlogController.edit.Get)
router.post('/edit/:id', validation.edit, BlogController.edit.Post)

// Article Page
router.get('/:id', IndexController.article)

// Delete Article
router.delete('/:id', BlogController.delete)

module.exports = router
