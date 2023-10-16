const express = require('express')
const router = express.Router()
const { auth } = require('../../app/middlewares/auth.middleware')
const NoteController = require('../../app/controllers/note.controller')


router
   .route('/notes')
   .get(auth, NoteController.getAll)
   .post(auth, NoteController.create)

router 
   .route('/notes/:id')
   .get(auth, NoteController.getDetail)
   .delete(auth, NoteController.destroy)

module.exports = router

