const express = require('express')
const router = express.Router()
const passport = require('passport')
const { check } = require('express-validator/check')

// Validation
const validation = require('./validation')

// User Model
const UserController = require('../controllers/UserController')

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

module.exports = router
