const createError = require('http-errors')
const passport = require('passport')

const { User } = require('../models')

module.exports.register = {
  Get (req, res) {
    res.render('register')
  },
  async Post (req, res, next) {
    try {
      await User.create(req.body)
      req.flash('success', 'Пользователь создан.')
      res.redirect('/login/')
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
  Post (req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next)
  }
}

module.exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'Аутентификация успешна.')
  res.redirect('/')
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
