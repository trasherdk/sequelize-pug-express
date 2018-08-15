const { validationResult } = require('express-validator/check')
const { User } = require('../models')

module.exports.get = (req, res) => {
  res.render('register')
}

module.exports.post = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('register', {
      errors: errors.array()
    })
  } else {
    User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    req.flash('success', 'Article Added')
    res.redirect('/')
    User.findAll({}).then(users => {
      console.log(users)
    })
  }
}
