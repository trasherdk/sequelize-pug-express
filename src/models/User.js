/*
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
*/
/*
hooks: {
  beforeCreate: hashPassword,
  beforeUpdate: hashPassword,
  beforeSave: hashPassword
},
*/
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
