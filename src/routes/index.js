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
  check('username').isLength({ min: 1 }).withMessage('Name is required.'),
  check('email').isLength({ min: 1 }).withMessage('Email is required.').isEmail().withMessage('Please provide a valid email address'),
  check('password').isLength({ min: 4 }).withMessage('Invalid password')
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.password2) {
      // trow error if passwords do not match
        throw new Error("Passwords don't match")
      } else {
        return value
      }
    }).withMessage('Password does not match the confirm password')
], UserController.post)

// Add Article
router.get('/add', BlogController.add.Get)
router.post('/add', [
  check('author').isLength({ min: 1 }).withMessage('Author is required'),
  check('title').isLength({ min: 1 }).withMessage('Title is require'),
  check('text').isLength({ min: 1 }).withMessage('Text Chort is require'),
  check('textFull').isLength({ min: 1 }).withMessage('Text Full is require')
], BlogController.add.Post)

// Article Page
router.get('/:id/', IndexController.article)

// Edit Article
router.get('/edit/:id/', BlogController.edit.Get)
router.post('/edit/:id/', [
  check('author').isLength({ min: 1 }).withMessage('Author is required'),
  check('title').isLength({ min: 1 }).withMessage('Title is require'),
  check('text').isLength({ min: 1 }).withMessage('Text Chort is require'),
  check('textFull').isLength({ min: 1 }).withMessage('Text Full is require')
], BlogController.edit.Post)

// Delete Article
router.delete('/:id', BlogController.delete)

module.exports = router
