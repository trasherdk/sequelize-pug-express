const createError = require('http-errors')
const {Blog} = require('../models')
// const { validationResult } = require('express-validator/check')

module.exports = {
  async index (req, res, next) {
    try {
      const articles = await Blog.findAll({ where: { active: true } })
      res.render('index', {
        articles: articles
      })
    } catch (err) {
      next(createError(err))
    }
  },
  async article (req, res, next) {
    try {
      const article = await Blog.findAll({ where: { active: true, id: req.params.id } })
      res.render('article', {
        article: article[0]
      })
    } catch (err) {
      next(createError(err))
    }
  }
}

/*
async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the songs'
      })
    }
  },

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

module.exports.post = {
  async index (req, res, next) {
    try {
      const song = await Blog.findAll({
        where: {
          active: true
        }
      })
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the song'
      })
    }
  }
}
*/

/*
module.exports.index = (req, res, next) => {
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
  User.findAll({}).then(users => {
    console.log(users)
  })
}
*/
