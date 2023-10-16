const Joi = require('joi')

const login = (data) => {
   const userSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
   })
   return userSchema.validate(data)
}

const register = (data) => {
   const userSchema = Joi.object({
      fullname: Joi.string().required().min(5),
      username: Joi.string().required().min(5),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(5),
   })
   return userSchema.validate(data)
}

module.exports = {
   login,
   register
}