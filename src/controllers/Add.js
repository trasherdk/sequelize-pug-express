const { validationResult } = require('express-validator/check')

const Blog = require('../models')

module.exports.Get = (req, res) => {
  res.render('add_article', {
    url: req.url,
    title: 'Add Article'
  })
}

module.exports.Post = (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('add_article', {
      url: req.url,
      title: 'Add Article',
      errors: errors.array()
    })
  } else {
    Blog.create({
      author: req.body.author,
      title: req.body.title,
      text: req.body.text,
      textFull: req.body.textFull
    })
    req.flash('success', 'Article Added')
    res.redirect('/')
  }
}
