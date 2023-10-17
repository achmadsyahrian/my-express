const bcrypt = require('bcrypt')
const {User} = require('../models')
const { successResponse, unauthorizedResponse, errorResponse} = require('../services/response.service')
const UserValidation = require('../validations/user.validation')

const getProfile = async (req, res) => {
   const id = req.user.id
   const result = await User.findByPk(id)
   return successResponse(req, res, "Get profile success", result)
}

const update = async (req, res) => {
   const id = req.user.id
   const {fullname, username, email, old_password, new_password} = req.body
   // validation
   const {error} = await UserValidation.updateProfile(req.body)
   if (error) { return errorResponse(req, res, error.details[0].message) }
   
   const user = await User.findByPk(id)
   const passwordMatch = await bcrypt.compare(old_password, user.password)
   if (!passwordMatch) {return unauthorizedResponse(req, res, "Old Password invalid")}
   try {
      // Fungsi Enkripsi
      const saltRound = 10 // Jumlah putaran (rounds) yang digunakan untuk hashing
      const salt = await bcrypt.genSalt(saltRound)
      const hashedPassword = await bcrypt.hash(new_password, salt) //hash password

      const updateUser = {fullname, username, email, password:hashedPassword}
      const result = await user.update(updateUser)
      return successResponse(req, res, "Update Profile Success", result)
   } catch (error) {
      console.error(`Error update profile`, error);
      return serverErrorResponse(req, res, 'Internal Server Error')
   }
}

module.exports = {
   getProfile,
   update
}