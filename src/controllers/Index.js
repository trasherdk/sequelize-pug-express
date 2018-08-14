const createError = require('http-errors')
const Blog = require('../models')
// const sequelize = require('../models').sequelize
// const { validationResult } = require('express-validator/check')

module.exports.index = (req, res, next) => {
  console.log(req)
  console.log('!!!!!!!!!!!!!!!!!!!!!!!')
  console.log(req.body)
  Blog.findAll({
    where: {
      active: true
    }
  }).then(articles => {
    res.render('index', {
      url: req.url,
      title: 'Blog',
      articles: articles
    })
    // console.log(articles)
  }).catch(error => {
    console.log(error)
    next(createError(error))
  })
  /*
  Blog.findAll({
    attributes: [
      'id', [sequelize.fn('date_format', sequelize.col('CREATEDAT'), '%Y-%m-%d %H:%M:%S'), 'CREATEDAT']
    ]
  }).then(result => {
    console.log(result)
  })
  */
}

module.exports.article = (req, res, next) => {
  Blog.findAll({
    where: {
      id: req.params.id
    }
  }).then(article => {
    console.log(article)
    if (article[0]) {
      res.render('article', {
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
