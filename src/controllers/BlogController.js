'use strict'
const createError = require('http-errors')
const Blog = require('../models')

module.exports.index = (req, res, next) => {
  Blog.findAll({}).then(articles => {
    res.render('blog/index', {
      url: req.url,
      title: 'Blog',
      articles: articles
    })
  }).catch(error => {
    console.log(error)
    next(createError(error))
  })
}

module.exports.article = (req, res, next) => {
  Blog.findAll({
    where: {
      id: req.params.id
    }
  }).then(article => {
    if (article[0]) {
      res.render('blog/article', {
        article: article[0]
      })
    } else {
      next(createError(404))
    }
  }).catch(error => {
    console.log(error)
    next(createError(error))
  })
}

module.exports.addArticleGet = (req, res) => {
  console.log('!addArticleGet!')
  res.render('blog/add', {
    url: req.url,
    title: 'Add Article'
  })
}

module.exports.addArticlePost = (req, res) => {
  console.log('addArticlePost')
  Blog.create({
    author: req.body.author,
    title: req.body.title,
    text: req.body.text
  })
  res.redirect('/blog/')
}

module.exports.editArticleGet = (req, res, next) => {
  console.log('editArticleGet')
  Blog.findAll({
    where: {
      id: req.params.id
    }
  }).then(article => {
    if (article[0]) {
      res.render('blog/edit_article', {
        title: 'Edit Article',
        article: article[0]
      })
    } else {
      next(createError(404))
    }
  }).catch(error => {
    res.status(400).send(error)
    console.log(error)
  })
}

module.exports.editArticlePost = (req, res) => {
  console.log('editArticlePost')
  Blog.update({
    author: req.body.author,
    title: req.body.title,
    text: req.body.text
  }, {
    where: {
      id: req.params.id
    }
  }).catch(error => {
    res.status(400).send(error)
  })
  res.redirect('/blog/' + req.params.id)
}

module.exports.deleteArticle = (req, res) => {
  console.log('deleteArticle')
  Blog.destroy({
    where: {
      id: req.params.id
    }
  }).then(
    res.send('success')
  ).catch(error => {
    console.log(error)
    res.status(400).send(error)
    console.log(error)
  })
}
