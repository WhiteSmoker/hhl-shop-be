const express = require('express')

const router = express.Router()

const verifyToken = require('../middleware/auth.middleware')

const verifyTokenAdmin = require('../middleware/auth_admin.middleware')

const controller = require('../controllers/blog.controller')

router.get('/', controller.blogs)

router.get('/:id', controller.blog)

router.post('/', verifyToken, verifyTokenAdmin, controller.create)

router.put('/', verifyToken, verifyTokenAdmin, controller.update)

router.delete('/:id', verifyToken, verifyTokenAdmin, controller.delete)

module.exports = router
