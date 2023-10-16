const {User} = require('../models/')
const bcrypt = require('bcrypt')
const {serverErrorResponse, successCreateResponse} = require('../services/response.service')

const register = async (req, res) => {
   try {
      const { fullname, email, username, password } = req.body
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


module.exports = {
   register
}