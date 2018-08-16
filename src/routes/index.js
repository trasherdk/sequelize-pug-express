var express = require('express')
var router = express.Router()

const { check } = require('express-validator/check')
const IndexController = require('../controllers/IndexController')
const UserController = require('../controllers/UserController')
const BlogController = require('../controllers/BlogController')

// Index page
router.get('/', IndexController.index)

// User Registration
router.get('/register', UserController.get)
router.post('/register', [
  check('username').isLength({min: 1, max: 250}).withMessage('UserName is required.'),
  check('email').isLength({min: 3, max: 250}).withMessage('Email is required.').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  check('password').isLength({ min: 6 }).withMessage('Invalid password. Password must be at least minimum 6'),
  check('password2').exists().custom((value, { req }) => value === req.body.password).withMessage('"Confirm your Password" field must have the same value as the Password field')
], UserController.post)

// Add Article
router.get('/add', BlogController.add.Get)
router.post('/add', [
  check('author').isLength({min: 1, max: 250}).withMessage('Author is required'),
  check('title').isLength({min: 1, max: 250}).withMessage('Title is required'),
  check('text').isLength({min: 1}).withMessage('Text Chort is required'),
  check('textFull').isLength({min: 1}).withMessage('Text Full is required')
], BlogController.add.Post)

// Article Page
router.get('/:id/', IndexController.article)

// Edit Article
router.get('/edit/:id/', BlogController.edit.Get)
router.post('/edit/:id/', [
  check('author').isLength({min: 1, max: 250}).withMessage('Author is required'),
  check('title').isLength({min: 1, max: 250}).withMessage('Title is required'),
  check('text').isLength({min: 1}).withMessage('Text Chort is required'),
  check('textFull').isLength({min: 1}).withMessage('Text Full is required')
], BlogController.edit.Post)

// Delete Article
router.delete('/:id', BlogController.delete)

module.exports = router
