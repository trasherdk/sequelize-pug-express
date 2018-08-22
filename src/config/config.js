const path = require('path')

module.exports = {
  development: {
    dialect: 'sqlite',
    operatorsAliases: false,
    storage: path.resolve(__dirname, '../../data/database.sqlite')
  },
  production: {
    username: 'admin',
    password: 'admin',
    database: 'admin',
    host: 'localhost',
    operatorsAliases: false,
    dialect: 'mysql'
  }
}
