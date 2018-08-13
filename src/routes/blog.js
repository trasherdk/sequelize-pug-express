var express = require('express')
var router = express.Router()

const { check } = require('express-validator/check')
const BlogController = require('../controllers/BlogController')
const DeleteArticle = require('../controllers/DeleteArticle')

/* GET blog listing. */
router.get('/', BlogController.index)
router.get('/add', BlogController.addArticleGet)
router.post('/add', [
  check('author').isLength({ min: 1 }).withMessage('Author is required'),
  check('title').isLength({ min: 1 }).withMessage('Title is require'),
  check('text').isLength({ min: 1 }).withMessage('Text is require')
], BlogController.addArticlePost)
router.get('/:id/', BlogController.article)
router.get('/edit/:id/', BlogController.editArticleGet)
router.post('/edit/:id/', [
  check('author').isLength({ min: 1 }).withMessage('Author is required'),
  check('title').isLength({ min: 1 }).withMessage('Title is require'),
  check('text').isLength({ min: 1 }).withMessage('Text is require')
], BlogController.editArticlePost)
router.delete('/:id', DeleteArticle)

module.exports = router
