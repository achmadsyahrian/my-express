const express = require('express')
const router = express.Router()
const AuthController = require('../../app/controllers/auth.controller')
const { auth } = require('../../app/middlewares/auth.middleware')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router