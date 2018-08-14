var express = require('express')
var router = express.Router()

const { check } = require('express-validator/check')
const Index = require('../controllers/Index')
const Add = require('../controllers/Add')
const Edit = require('../controllers/Edit')
const Delete = require('../controllers/Delete')

// Index page
router.get('/', Index.index)

// Add Article
router.get('/add', Add.Get)
router.post('/add', [
  check('author').isLength({ min: 1 }).withMessage('Author is required'),
  check('title').isLength({ min: 1 }).withMessage('Title is require'),
  check('text').isLength({ min: 1 }).withMessage('Text Chort is require'),
  check('textFull').isLength({ min: 1 }).withMessage('Text Full is require')
], Add.Post)

// Article Page
router.get('/:id/', Index.article)

// Edit Article
router.get('/edit/:id/', Edit.Get)
router.post('/edit/:id/', [
  check('author').isLength({ min: 1 }).withMessage('Author is required'),
  check('title').isLength({ min: 1 }).withMessage('Title is require'),
  check('text').isLength({ min: 1 }).withMessage('Text Chort is require'),
  check('textFull').isLength({ min: 1 }).withMessage('Text Full is require')
], Edit.Post)

// Delete Article
router.delete('/:id', Delete)

module.exports = router
