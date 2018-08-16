const { validationResult } = require('express-validator/check')
const createError = require('http-errors')

const { Blog } = require('../models')

// Add Article
module.exports.add = {
  Get (req, res) {
    res.render('add_article', {
      title: 'Add Article'
    })
  },
  async Post (req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const error = validationResult(req)
    if (!error.isEmpty()) {
      res.render('add_article', {
        title: 'Add Article',
        errors: error.array()
      })
    } else {
      try {
        await Blog.create(req.body)
        req.flash('success', 'Article Added')
        res.redirect('/')
      } catch (err) {
        next(createError(err))
      }
    }
  }
}

// Edit Article
module.exports.edit = {
  async Get (req, res, next) {
    try {
      const article = await Blog.findAll({ where: { active: true, uuid: req.params.id } })
      res.render('edit_article', {
        article: article[0]
      })
    } catch (err) {
      next(createError(err))
    }
  },
  async Post (req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const err = validationResult(req)
    if (!err.isEmpty()) {
      try {
        const article = await Blog.findAll({ where: { active: true, uuid: req.params.id } })
        res.render('edit_article', {
          article: article[0],
          errors: err.array()
        })
      } catch (err) {
        next(createError(err))
      }
    } else {
      try {
        await Blog.update(req.body, { where: { uuid: req.params.id } })
        req.flash('success', 'Article Update')
        res.redirect('/' + req.params.id)
      } catch (err) {
        next(createError(err))
      }
    }
  }
}

// Delete Article
module.exports.delete = async (req, res, next) => {
  try {
    await Blog.update({ active: false }, {where: {uuid: req.params.id}})
    res.send('success')
  } catch (err) {
    next(createError(err))
  }
}

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
