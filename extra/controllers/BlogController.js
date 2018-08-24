/*
// Add Article
module.exports.add = {
  Get (req, res) {
    res.render('add_article', {
      url: req.url,
      title: 'Add Article'
    })
  },
  Post (req, res) {
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
}

module.exports.edit = {
  Get (req, res, next) {
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
  },
  Post (req, res, next) {
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
}

module.exports.delete = (req, res) => {
  Blog.update({
    active: false
  }, {
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

module.exports.add = {
  async Get (req, res) {
    res.render('add_article', {
      url: req.url,
      title: 'Add Article'
    })
  }
}
*/
// const createError = require('http-errors')
// const {Blog} = require('../models')
/*
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
      const article = await Blog.findOne({ where: { active: true, uuid: req.params.id } })
      if (!article) {
        return next(createError(404))
      }
      res.render('article', {
        article: article
      })
    } catch (err) {
      next(createError(err))
    }
  }
}
*/
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
