const createError = require('http-errors')

const { User } = require('../models')

module.exports.register = {
  Get (req, res) {
    res.render('user/register')
  },
  async Post (req, res, next) {
    try {
      await User.create(req.body)
      next()
    } catch (err) {
      next(createError(err))
    }
  }
}

module.exports.login = {
  Get (req, res) {
    res.render('user/login')
  },
  Post (req, res, next) {
    req.flash('success', 'Аутентификация успешна.')
    res.redirect('/')
  }
}

module.exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}
