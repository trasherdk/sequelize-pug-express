'use strict'
const Blog = require('../models/sequelize')

module.exports.index = (req, res) => {
  Blog.findAll({}).then(articles => {
    res.render('index', {
      url: req.url,
      title: 'Home Page',
      articles: articles
    })
  }).catch(error => {
    res.status(400).send(error)
  })
}

module.exports.article = (req, res, id) => {
  Blog.findAll({
    where: {
      id: id
    }
  }).then(article => {
    res.render('post', {
      article: article[0]
    })
  }).catch(error => {
    res.status(400).send(error)
  })
}

module.exports.editArticleGet = (req, res, id) => {
  Blog.findAll({
    where: {
      id: id
    }
  }).then(article => {
    res.render('edit_post', {
      title: 'Edit Article',
      article: article[0]
    })
  }).catch(error => {
    res.status(400).send(error)
  })
}

module.exports.editArticlePost = (req, res, id) => {
  Blog.update({
    author: req.body.author,
    title: req.body.title,
    text: req.body.text
  }, {
    where: {
      id: id
    }
  }).catch(error => {
    res.status(400).send(error)
  })
  res.redirect('/' + id)
}

module.exports.deleteArticle = (req, res, id) => {
  Blog.destroy({
    where: { id: id }
  }).then(
    res.send('success')
  ).catch(error => {
    console.log(error)
    res.status(400).send(error)
  })
}

module.exports.addArticleGet = (req, res) => {
  res.render('add', {
    url: req.url,
    title: 'Add Article'
  })
}

module.exports.addArticlePost = (req, res) => {
  Blog.create({
    author: req.body.author,
    title: req.body.title,
    text: req.body.text
  })
  res.redirect('/')
}
