const Joi = require('joi')

const updateProfile = (data) => {
   const userSchema = Joi.object({
      fullname: Joi.string().required().min(5),
      username: Joi.string().required().min(5),
      email: Joi.string().required().email(),
      old_password: Joi.string().required().min(5),
      new_password: Joi.string().required(),
   })
   return userSchema.validate(data)
}

module.exports = {
   updateProfile
}