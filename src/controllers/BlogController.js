'use strict'
const createError = require('http-errors')
const Blog = require('../models')
const { validationResult } = require('express-validator/check')

module.exports.index = (req, res, next) => {
  Blog.findAll({
    where: {
      active: true
    }
  }).then(articles => {
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
  res.render('blog/add_article', {
    url: req.url,
    title: 'Add Article'
  })
}

module.exports.addArticlePost = (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('blog/add_article', {
      url: req.url,
      title: 'Add Article',
      errors: errors.array()
    })
  } else {
    Blog.create({
      author: req.body.author,
      title: req.body.title,
      text: req.body.text
    })
    req.flash('success', 'Article Added')
    res.redirect('/blog/')
  }
}

module.exports.editArticleGet = (req, res, next) => {
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

module.exports.editArticlePost = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    Blog.findAll({
      where: {
        id: req.params.id
      }
    }).then(article => {
      if (article[0]) {
        res.render('blog/edit_article', {
          title: 'Edit Article',
          article: article[0],
          errors: errors.array()
        })
      } else {
        next(createError(404))
      }
    }).catch(error => {
      res.status(400).send(error)
      console.log(error)
    })
  } else {
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
    req.flash('success', 'Article Update')
    res.redirect('/blog/' + req.params.id)
  }
}
