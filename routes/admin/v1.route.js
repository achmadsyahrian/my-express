const express = require('express')
const router = express.Router()
const { auth } = require('../../app/middlewares/auth.middleware')

const UserController = require('../../app/controllers/user.controller')
const NoteController = require('../../app/controllers/note.controller')


router
   .route('/notes')
   .get(auth, NoteController.getAll)
   .post(auth, NoteController.create)

router 
   .route('/notes/:id')
   .get(auth, NoteController.getDetail)
   .patch(auth, NoteController.update)
   .delete(auth, NoteController.destroy)

router 
   .route('/profile')
   .get(auth, UserController.getProfile)
   .patch(auth, UserController.update)
   
module.exports = router

