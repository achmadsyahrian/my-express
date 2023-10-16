const express = require('express')
const router = express.Router()

const {successResponse} = require('../app/services/response.service')

// GET HOME PAGE
router.get('/', (req, res) => {
   return successResponse(req, res, "Selamat Datang di API saya..")
})

module.exports = router