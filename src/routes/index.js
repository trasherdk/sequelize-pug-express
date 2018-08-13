var express = require('express')
var router = express.Router()

const Controller = require('../controllers/Controller')

/* GET home page. */
router.get('/', Controller.index)

module.exports = router
