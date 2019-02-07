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
    console.log(req.headers.referer)
    res.render('user/login')
  },
  Post (req, res, next) {
    req.flash('success', 'Authentication successful.')
    /*
    if (req.headers.referer) {
      return res.redirect
    }
    */
    console.log(req.headers.referer)
    res.redirect('/')
  }
}

module.exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

module.exports.users = async (req, res, next) => {
  try {
    let user = await User.findAll()
    console.log(user)
  } catch (err) { next(err) }
}
