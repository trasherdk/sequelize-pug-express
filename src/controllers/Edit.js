const createError = require('http-errors')
const { validationResult } = require('express-validator/check')

const Blog = require('../models')

module.exports.Get = (req, res, next) => {
  Blog.findAll({
    where: {
      id: req.params.id
    }
  }).then(article => {
    if (article[0]) {
      res.render('edit_article', {
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

module.exports.Post = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    Blog.findAll({
      where: {
        id: req.params.id
      }
    }).then(article => {
      if (article[0]) {
        res.render('edit_article', {
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
      text: req.body.text,
      textFull: req.body.textFull
    }, {
      where: {
        id: req.params.id
      }
    }).catch(error => {
      res.status(400).send(error)
    })
    req.flash('success', 'Article Update')
    res.redirect('/' + req.params.id)
  }
}
