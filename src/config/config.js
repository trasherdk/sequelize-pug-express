module.exports = {
  development: {
    dialect: 'sqlite',
    operatorsAliases: false,
    storage: './database.sqlite'
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
