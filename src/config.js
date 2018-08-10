'use strict'
module.exports = {
  port: process.env.PORT,
  host: process.env.IP,
  // Morgan config
  logConsole: true,
  logFile: false,
  // db config
  db: {
    database: process.env.DB_NAME || 'database',
    user: process.env.DB_USER || 'username',
    password: process.env.DB_PASS || 'password',
    options: {
      host: process.env.HOST || 'localhost',
      dialect: process.env.DIALECT || 'sqlite',
      operatorsAliases: false,
      // SQLite only
      storage: './database.sqlite'
    }
  }
}
