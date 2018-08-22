const { sequelize, User, Blog } = require('../../src/models')

const Promise = require('bluebird')
const articles = require('./articles.json')
const users = require('./users.json')

sequelize.sync({ force: true })
  .then(
    async() => {
      await Promise.all(
        users.map(user => {
          User.create(user)
        })
      )
      await Promise.all(
        articles.map(article => {
          Blog.create(article)
        })
      )
    }
  )
  .catch(err => {
    console.log(err)
  })

