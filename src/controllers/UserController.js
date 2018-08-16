const createError = require('http-errors')
// const bcrypt = require('bcryptjs')
const { User } = require('../models')

module.exports.register = {
  Get (req, res) {
    res.render('register')
  },
  async Post (req, res, next) {
    try {
      await User.create(req.body)
      req.flash('success', 'New User Created')
      res.redirect('/')
      User.findAll({}).then(users => {
        console.log(users)
      })
    } catch (err) {
      next(createError(err))
    }
  }
}

module.exports.login = {
  Get (req, res) {
    res.render('login')
  },
  async Post (req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        return res.render('login', {
          error: 'The login information was incorrect1'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.render('login', {
          error: 'The login information was incorrect2'
        })
      }
      req.flash('success', 'Login Success')
      res.redirect('/')
    } catch (err) {
      next(createError(err))
    }
  }
}
/*
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

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
    req.flash('success', 'New User Created')
    res.redirect('/')
    User.findAll({}).then(users => {
      console.log(users)
    })
  }
}
*/
