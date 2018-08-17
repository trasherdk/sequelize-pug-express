const bcrypt = require('bcryptjs')

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
    hooks: {
      beforeSave: async (user, options) => {
        try {
          var salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        } catch (err) {
          console.log(err)
        }
      }
    }
  })
  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password).then((res) => {
      return res
    })
  }
  User.associate = function (models) {
  }

  return User
}

/*
function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

*/

/*
module.exports = (sequelize, type) => {
  return sequelize.define('User', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING
    },
    username: {
      type: type.STRING,
      unique: true
    },
    email: {
      type: type.STRING,
      unique: true
    },
    password: {
      type: type.STRING
    },
    active: {
      type: type.BOOLEAN,
      defaultValue: true
    }
  })
}

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

hooks: {
  beforeCreate: hashPassword,
  beforeUpdate: hashPassword,
  beforeSave: hashPassword
},
*/
