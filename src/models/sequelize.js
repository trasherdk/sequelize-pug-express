const Sequelize = require('sequelize')
const BlogModel = require('./blog')
const config = require('../config')

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

const Blog = BlogModel(sequelize, Sequelize)

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = Blog
