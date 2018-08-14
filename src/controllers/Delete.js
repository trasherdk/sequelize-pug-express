const Blog = require('../models')

module.exports = (req, res) => {
  Blog.update({
    active: false
  }, {
    where: {
      id: req.params.id
    }
  }).then(
    res.send('success')
  ).catch(error => {
    console.log(error)
    res.status(400).send(error)
    console.log(error)
  })
}

/*
module.exports.deleteArticle = (req, res) => {
  console.log('deleteArticle')
  Blog.destroy({
    where: {
      id: req.params.id
    }
  }).then(
    res.send('success')
  ).catch(error => {
    console.log(error)
    res.status(400).send(error)
    console.log(error)
  })
}
*/
