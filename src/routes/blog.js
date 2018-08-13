var express = require('express')
var router = express.Router()

const BlogController = require('../controllers/BlogController')

/* GET blog listing. */
router.get('/', BlogController.index)
router.get('/add', BlogController.addArticleGet)
router.post('/add', BlogController.addArticlePost)
router.get('/:id/', BlogController.article)
router.get('/edit/:id/', BlogController.editArticleGet)
router.post('/edit/:id/', BlogController.editArticlePost)
router.delete('/:id', BlogController.deleteArticle)

module.exports = router
