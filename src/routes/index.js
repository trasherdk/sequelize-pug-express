const express = require('express')
const createError = require('http-errors')
const { check } = require('express-validator/check')
const passport = require('passport')
const router = express.Router()

const UserController = require('../controllers/UserController')
const BlogController = require('../controllers/BlogController')
const validation = require('./validation')

// Index page
router.get('/', BlogController.index.blog)

// User Registration
router.get('/register', UserController.register.Get)
router.post('/register', [
  check('username').isLength({ min: 1, max: 128 }).withMessage('Требуется имя пользователя').trim(),
  check('email').isLength({ min: 1, max: 128 }).withMessage('Требуется Email').isEmail().withMessage('Пожалуйста, введите корректный Email').normalizeEmail(),
  check('password').isLength({ min: 6 }).withMessage('Пароль не может быть короче 6 символов'),
  check('password2').exists().custom((value, { req }) => value === req.body.password).withMessage('Пароль и подтверждение пароля не совпадают')
], validation.user.register, UserController.register.Post, passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'Аутентификация успешна.',
  failureRedirect: '/login',
  failureFlash: true
}))

// User Login
router.get('/login', UserController.login.Get)
router.post('/login', [
  check('username').isLength({min: 1, max: 128}).withMessage('Требуется имя пользователя или Email').trim(),
  check('password').isLength({ min: 6 }).withMessage('Некорректный пароль')
], validation.user.login, passport.authenticate('local'), UserController.login.Post)
router.get('/logout', UserController.logout)

// Add Article
router.get('/add', ensureAuthentication, BlogController.add.Get)
router.post('/add', ensureAuthentication, [
  check('title').isLength({min: 1, max: 128}).withMessage('Требуется заголовок'),
  check('text').isLength({min: 1}).withMessage('Требуется заголовочный текст'),
  check('textFull').isLength({min: 1}).withMessage('Требуется текст')
], validation.blog.add, BlogController.add.Post)

// Edit Article
router.get('/edit/:id', ensureAuthentication, BlogController.edit.Get)
router.post('/edit/:id', ensureAuthentication, [
  check('title').isLength({min: 1, max: 128}).withMessage('Требуется заголовок'),
  check('text').isLength({min: 1}).withMessage('Требуется заголовочный текст'),
  check('textFull').isLength({min: 1}).withMessage('Требуется текст')
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
