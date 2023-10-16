const {User} = require('../models/')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {serverErrorResponse, successCreateResponse, createTokenLogin, notFoundResponse, errorResponse} = require('../services/response.service')
const AuthMiddleware = require('../middlewares/auth.middleware')
const AuthValidation = require('../validations/auth.validation')

const register = async (req, res) => {
   const { fullname, email, username, password } = req.body
   // Validation
   const {error} = await AuthValidation.login(req.body)
   if (error) { return errorResponse(req, res, error.details[0].message) }
   try {
      // Fungsi Enkripsi
      const saltRound = 10 // Jumlah putaran (rounds) yang digunakan untuk hashing
      const salt = await bcrypt.genSalt(saltRound)
      const hashedPassword = await bcrypt.hash(password, salt) //hash password

      // Buat User Baru
      const newUser = new User({fullname, username, email, password:hashedPassword})
      await newUser.save(); // Simpan User ke dalam database
      return successCreateResponse(req, res, 'Register new user successfully!', newUser)
   } catch (error) {
      console.error('Error registering user:', error);
      return serverErrorResponse(req, res, 'Internal Server Error')
   }
}


const login = async (req, res) => {
   const { username, password } = req.body
   // Validation
   const {error} = await AuthValidation.login(req.body)
   if (error) { return errorResponse(req, res, error.details[0].message) }
   try {
      const user = await User.findOne({where: {username}})
      if (!user) {return notFoundResponse(req, res, "Login Error, User Not Registered")}
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {return notFoundResponse(req, res, "Login Error, User Not Registered")}
      
      // cek password
      const payload = { id: user.id }
      const token = jwt.sign(payload, AuthMiddleware.jwtOptions.secretOrKey, {expiresIn : 3600});
      return createTokenLogin(req, res, "Login Success", user, token)
   } catch (error) {
      console.error('Error login user:', error);
      return serverErrorResponse(req, res, 'An internal server error occurred. Please try again later')
   }
}


module.exports = {
   register,
   login
}