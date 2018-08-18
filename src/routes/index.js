const express = require('express')
const createError = require('http-errors')
const { check } = require('express-validator/check')
const router = express.Router()

const UserController = require('../controllers/UserController')
const BlogController = require('../controllers/BlogController')
const validation = require('./validation')

// Index page
router.get('/', BlogController.index.blog)

// User Registration
router.get('/register', UserController.register.Get)
router.post('/register', [
  check('username').isLength({ min: 1, max: 128 }).withMessage('Name is required.').trim(),
  check('email').isLength({ min: 1, max: 128 }).withMessage('Email is required.').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  check('password').isLength({ min: 6 }).withMessage('Invalid password. Password must be at least minimum 6'),
  check('password2').exists().custom((value, { req }) => value === req.body.password).withMessage('"Confirm your Password" field must have the same value as the Password field')
], validation.user.register, UserController.register.Post)

// User Login
router.get('/login', UserController.login.Get)
router.post('/login', [
  check('username').isLength({min: 1, max: 128}).withMessage('Name or Email is required.').trim(),
  check('password').isLength({ min: 6 }).withMessage('Invalid password')
], validation.user.login, UserController.login.Post)
router.get('/logout', UserController.logout)

// Add Article
router.get('/add', ensureAuthentication, BlogController.add.Get)
router.post('/add', ensureAuthentication, [
  check('title').isLength({min: 1, max: 128}).withMessage('Title is required'),
  check('text').isLength({min: 1}).withMessage('Text Chort is required'),
  check('textFull').isLength({min: 1}).withMessage('Text Full is required')
], validation.blog.add, BlogController.add.Post)

// Edit Article
router.get('/edit/:id', ensureAuthentication, BlogController.edit.Get)
router.post('/edit/:id', ensureAuthentication, [
  check('title').isLength({min: 1, max: 128}).withMessage('Title is required'),
  check('text').isLength({min: 1}).withMessage('Text Chort is required'),
  check('textFull').isLength({min: 1}).withMessage('Text Full is required')
], validation.blog.edit, BlogController.edit.Post)

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
