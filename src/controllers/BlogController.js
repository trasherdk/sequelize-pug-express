const createError = require('http-errors')

const { Blog, User } = require('../models')

module.exports.index = {
  // Article Page
  async article (req, res, next) {
    try {
      const article = await Blog.findOne({ where: { active: true, uuid: req.params.id } })
      if (!article) {
        return next(createError(404))
      }
      const user = await User.findOne({ where: { id: article.author } })
      res.render('blog/article', {
        article: article,
        author: user.username
      })
    } catch (err) {
      next(createError(err))
    }
  }
}

// Add Article
module.exports.add = {
  // Add Article Form
  Get (req, res) {
    res.render('blog/add_article', {
    })
  },
  // Add Article Post
  async Post (req, res, next) {
    try {
      req.body.author = req.body.author || req.user.id
      await Blog.create(req.body)
      req.flash('success', 'Изменения сохранены.')
      res.redirect('/')
    } catch (err) {
      next(createError(err))
    }
  }
}

// Edit Article
module.exports.edit = {
  // Edit Article Form
  async Get (req, res, next) {
    try {
      const article = await Blog.findOne({ where: { active: true, uuid: req.params.id } })
      if (String(article.author) !== String(req.user.id)) {
        req.flash('danger', 'Пожалуйста, авторизируйтесь или создайте учетную запись.')
        res.redirect('/login/')
      } else {
        res.render('blog/edit_article', {
          article: article
        })
      }
    } catch (err) {
      next(createError(err))
    }
  },
  // Edit Article Post
  async Post (req, res, next) {
    try {
      await Blog.update(req.body, { where: { uuid: req.params.id } })
      req.flash('success', 'Изменения сохранены.')
      res.redirect('/post/' + req.params.id)
    } catch (err) {
      next(createError(err))
    }
  }
}

// Delete Article
module.exports.delete = async (req, res, next) => {
  if (!req.user.id) {
    return res.status(500).send()
  }
  try {
    const article = await Blog.findOne({ where: { active: true, uuid: req.params.id } })
    if (String(article.author) !== String(req.user.id)) {
      return res.status(500).send()
    }
    await Blog.update({ active: false }, {where: {uuid: req.params.id}})
    res.send('success')
  } catch (err) {
    next(createError(err))
  }
}
