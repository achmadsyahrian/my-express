const express = require('express')
const router = express.Router()
const { auth } = require('../../app/middlewares/auth.middleware')
const NoteController = require('../../app/controllers/note.controller')


router
   .route('/notes')
   .get(auth, NoteController.getAll)
   .post(auth, NoteController.create)

module.exports = router