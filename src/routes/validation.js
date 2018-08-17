const { validationResult } = require('express-validator/check')
const createError = require('http-errors')

// where: { [Op.or]: [{x: x}, {y: y}]} OR, AND
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const {User} = require('../models')

module.exports.user = {
  async register (req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render('register', {
        errors: errors.array()
      })
    }
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: req.body.username }, { email: req.body.email }]
        }
      })
      if (user) {
        return res.render('register', {
          error: 'Имя пользователя или Email уже используются'
        })
      } else {
        next()
      }
    } catch (err) {
      next(createError(err))
    }
  },
  login (req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('login', {
        errors: errors.array()
      })
      console.log(errors)
    } else {
      next()
    }
  }
}

module.exports.blog = {
  add (req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('add_article', {
        errors: errors.array()
      })
      console.log(errors)
    } else {
      next()
    }
  },
  edit (req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render('edit_article', {
        errors: errors.array()
      })
      console.log(errors)
    } else {
      next()
    }
  }
}
