'use strict'
const BlogController = require('./controllers/BlogController')
module.exports = (app) => {
  /* GET home page. */
  app.get('/', BlogController.index)
  app.get('/add', BlogController.addArticleGet)
  app.post('/add', BlogController.addArticlePost)
  app.get('/edit/:id', (req, res) => { BlogController.editArticleGet(req, res, req.params.id) })
  app.post('/edit/:id', (req, res) => { BlogController.editArticlePost(req, res, req.params.id) })
  app.get('/:id', (req, res) => { BlogController.article(req, res, req.params.id) })
  app.delete('/:id', (req, res) => { BlogController.deleteArticle(req, res, req.params.id) })
}
