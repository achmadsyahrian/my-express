const express = require('express')
const router = express.Router()
const AuthController = require('../../app/controllers/auth.controller')

router
   .route('/register')
   .post(AuthController.register)

module.exports = router