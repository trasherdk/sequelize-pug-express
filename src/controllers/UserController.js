const createError = require('http-errors')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')

// where: { [Op.or]: [{x: x}, {y: y}]} OR, AND
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
  req.flash('success', 'You are logged out')
  res.redirect('/')
}

// Passport Authentication
module.exports.passport = (passport) => {
  passport.use(new LocalStrategy(
    async function (username, password, done) {
      try {
        // Find User
        const user = await User.findOne({
          where: {
            [Op.or]: [{username: username}, {email: username}]
          }
        })
        // Check User
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }
        // Compare password and hash
        const isPasswordValid = await user.comparePassword(password)
        // Check password
        if (!isPasswordValid) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      } catch (err) {
        return done(new Error(), false)
      }
    }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findOne({
        where: { id: id }
      })
      done(null, user)
    } catch (err) {}
  })
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
