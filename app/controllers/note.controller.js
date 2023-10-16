const {Note} = require('../models/')
const { successResponse, serverErrorResponse, successCreateResponse, errorExistResponse, notFoundResponse } = require('../services/response.service')

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
      console.error('Error create note data:', error);
      return serverErrorResponse(req, res, 'Internal Server Error')
   }
}


const getDetail = async (req, res) => {
   try {
      const {id} = req.params
      const result = await Note.findByPk(id)
      if (!result) {
         return notFoundResponse(req, res, `Note with id ${id} not found`)
      }
      return successResponse(req, res, "Get Detail Note Success", result)
   } catch (error) {
      console.error(`Error get detail note with id = ${id}`, error);
      return serverErrorResponse(req, res, 'Internal Server Error')
   }
}


const destroy = async (req, res) => {
   try {
      const {id} = req.params
      const result = await Note.findByPk(id)   
      if (!result) {
         return notFoundResponse(req, res, `Note with id = ${id} not found`)
      }
      await result.destroy()
      return successResponse(req, res, `Delete Note with id = ${id} success`, result)
   } catch (error) {
      console.error(`Error destroy note with id = ${id}`, error);
      return serverErrorResponse(req, res, 'Internal Server Error')
   }
   
}


module.exports = {
   getAll,
   create,
   getDetail,
   destroy
}