'use strict'
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const fs = require('fs')
const app = express()

// Config file
const config = require('./config')

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
// Public folder
app.use(express.static(path.join(__dirname, 'public')))

// Console log
if (config.logConsole) {
  app.use(logger('dev'))
}
// Create a write stream (in append mode)
if (config.logFile) {
  app.use(logger(
    '[:remote-user] [:date[clf]] - [:method(HTTP/:http-version)] - [":url"] - [:status] - [:remote-addr] - ":user-agent" - [:response-time ms] - [:res[content-length]]', { stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }
  ))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Routes
require('./routes')(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(config.port, config.host, () => {
  console.log('Server started on: https://' + config.host + ':' + config.port)
})
