const express = require('express')

const router = express.Router()

const verifyToken = require('../middleware/auth.middleware')

const verifyTokenAdmin = require('../middleware/auth_admin.middleware')

const controller = require('../controllers/home.controller')

router.get('/', verifyToken, verifyTokenAdmin, controller.revenue)

module.exports = router
