const LocalStrategy = require('passport-local').Strategy

// where: { [Op.or]: [{x: x}, {y: y}]} OR, AND
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const {User} = require('./models/')

// Passport Authentication
module.exports = (passport) => {
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
          return done(null, false, { message: 'Неверные аутентификационные данные.' })
        }
        // Compare password and hash
        const isPasswordValid = await user.comparePassword(password)
        // Check password
        if (!isPasswordValid) {
          return done(null, false, { message: 'Неверные аутентификационные данные.' })
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
