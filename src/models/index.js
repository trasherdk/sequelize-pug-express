'use strict'

const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]

// Models
const BlogModel = require('./Blog')

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const Blog = BlogModel(sequelize, Sequelize)
/*
Blog.create({
  text: 'Hello'
})
*/
// force: true will drop the table if it already exists
sequelize.sync({ force: false })
  .then(() => {
    console.log('Sync user models has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to sync user models to the database:', err)
  })

module.exports = Blog

/*
const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
})

// force: true will drop the table if it already exists
User.sync({ force: false })
  .then(() => {
    console.log('Sync user models has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to sync user models to the database:', err)
  })

User.create({
  firstName: 'John',
  lastName: 'Hancock'
})
  .then(() => User.findAll().then(users => {
    console.log(users)
  }))

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = User
*/
