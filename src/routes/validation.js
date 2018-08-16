const Joi = require('joi')

module.exports.add = (req, res, next) => {
  const schema = {
    author: Joi.string().min(1).max(64),
    title: Joi.string().min(1).max(200),
    text: Joi.string().min(1),
    textFull: Joi.string().min(1)
  }

  const { error } = Joi.validate(req.body, schema)

  if (error) {
    switch (error.details[0].context.key) {
      case 'author':
        res.render('add_article', {
          error: 'Author is require'
        })
        break
      case 'title':
        res.render('add_article', {
          error: 'Title is require'
        })
        break
      case 'text':
        res.render('add_article', {
          error: 'Text Chort is require'
        })
        break
      case 'textFull':
        res.render('add_article', {
          error: 'Text Full is require'
        })
        break
    }
  } else {
    next()
  }
}

module.exports.edit = (req, res, next) => {
  const schema = {
    author: Joi.string().min(1).max(64),
    title: Joi.string().min(1).max(200),
    text: Joi.string().min(1),
    textFull: Joi.string().min(1)
  }

  const { error } = Joi.validate(req.body, schema)

  if (error) {
    switch (error.details[0].context.key) {
      case 'author':
        res.render('edit_article', {
          error: 'Author is require'
        })
        break
      case 'title':
        res.render('edit_article', {
          error: 'Title is require'
        })
        break
      case 'text':
        res.render('edit_article', {
          error: 'Text Chort is require'
        })
        break
      case 'textFull':
        res.render('edit_article', {
          error: 'Text Full is require'
        })
        break
    }
  } else {
    next()
  }
}

module.exports.register = (req, res, next) => {
  const schema = {
    username: Joi.string().alphanum().min(1).max(32),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(64).required(),
    password2: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
  }

  const { error } = Joi.validate(req.body, schema)

  if (error) {
    switch (error.details[0].context.key) {
      case 'username':
        res.render('register', {
          error: 'Username is Invalid'
        })
        break
      case 'email':
        res.render('register', {
          error: 'You must provide a valid email address'
        })
        break
      case 'password':
        res.render('register', {
          error: 'Password must be at least 6 characters in length'
        })
        break
      case 'password2':
        res.render('register', {
          error: 'Password does not match the confirm password'
        })
        break
    }
  } else {
    next()
  }
}

module.exports.login = (req, res, next) => {
  const schema = {
    email: Joi.string().email(),
    password: Joi.string().min(6).max(64).required()
  }

  const { error } = Joi.validate(req.body, schema)

  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        res.render('register', {
          error: 'You must provide a valid email address'
        })
        break
      case 'password':
        res.render('register', {
          error: 'Password is Invalid'
        })
        break
    }
  } else {
    next()
  }
}
