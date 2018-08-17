const Joi = require('joi')

// Validation add Article form
module.exports.add = (req, res, next) => {
  const schema = {
    title: Joi.string().min(1).max(200),
    text: Joi.string().min(1),
    textFull: Joi.string().min(1)
  }

  const { error } = Joi.validate(req.body, schema)

  if (error) {
    switch (error.details[0].context.key) {
      case 'title':
        res.render('add_article', {
          error: 'Введите заголовок'
        })
        break
      case 'text':
        res.render('add_article', {
          error: 'Введите заголовочный текст'
        })
        break
      case 'textFull':
        res.render('add_article', {
          error: 'Введите текст'
        })
        break
    }
  } else {
    next()
  }
}

// Validation edit article form
module.exports.edit = (req, res, next) => {
  const schema = {
    title: Joi.string().min(1).max(200),
    text: Joi.string().min(1),
    textFull: Joi.string().min(1)
  }

  const { error } = Joi.validate(req.body, schema)

  if (error) {
    switch (error.details[0].context.key) {
      case 'title':
        res.render('edit_article', {
          error: 'Введите заголовок'
        })
        break
      case 'text':
        res.render('edit_article', {
          error: 'Введите заголовочный текст'
        })
        break
      case 'textFull':
        res.render('edit_article', {
          error: 'Введите текст'
        })
        break
    }
  } else {
    next()
  }
}

// Validation register form
module.exports.register = (req, res, next) => {
  const schema = {
    username: Joi.string().alphanum().min(1).max(64),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(64).required(),
    password2: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
  }

  const { error } = Joi.validate(req.body, schema)

  if (error) {
    switch (error.details[0].context.key) {
      case 'username':
        res.render('register', {
          error: 'Некорректное имя пользователя'
        })
        break
      case 'email':
        res.render('register', {
          error: 'Некорректный электронный адрес'
        })
        break
      case 'password':
        res.render('register', {
          error: 'Пароль должен быть не короче 6 символов'
        })
        break
      case 'password2':
        res.render('register', {
          error: 'Пароль и подтверждение пароля не совпадают'
        })
        break
    }
  } else {
    next()
  }
}

// Validate Login form
module.exports.login = (req, res, next) => {
  const schema = {
    username: Joi.string().min(1).max(64),
    password: Joi.string().min(6).max(64).required()
  }

  const { error } = Joi.validate(req.body, schema)

  if (error) {
    switch (error.details[0].context.key) {
      case 'username':
        res.render('register', {
          error: 'Введите Email или Имя пользователя'
        })
        break
      case 'password':
        res.render('register', {
          error: 'Некорректный пароль'
        })
        break
    }
  } else {
    next()
  }
}
