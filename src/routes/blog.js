const express = require('express')
const createError = require('http-errors')
const { check } = require('express-validator/check')
const router = express.Router()

const BlogController = require('../controllers/BlogController')
const validation = require('./validation')

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
