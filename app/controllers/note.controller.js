const {Note} = require('../models/')
const { successResponse, serverErrorResponse, successCreateResponse, errorExistResponse } = require('../services/response.service')

const getAll = async (req, res) => {
   const result = await Note.findAll()
   return successResponse(req, res, "Get all notes success", result)
}

const create = async (req, res) => {
   const {title, content} = req.body
   // Cek Title Exist
   const titleExist = await Note.findOne({where: {title}})
   if (titleExist) {return errorExistResponse(req, res, "Title already exists in the database.")}
   try {
      const result = await Note.create({title,content})
      return successCreateResponse(req, res, "Create new note success", result)
   } catch (error) {
      console.error('Error registering user:', error);
      return serverErrorResponse(req, res, 'Internal Server Error')
   }
}

module.exports = {
   getAll,
   create
}