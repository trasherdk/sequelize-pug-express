const LocalStrategy = require('passport-local').Strategy

// where: { [Op.or]: [{x: x}, {y: y}]} OR, AND
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const {User} = require('../models/')

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

/*
module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy(function(username, password, done){
    // Match Username
    let query = {username:username};
    User.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // Match Password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

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

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)
*/
