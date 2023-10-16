const Joi = require('joi')

const note = (data) => {
   const userSchema = Joi.object({
      title: Joi.string().required().min(5),
      content: Joi.string().required(),
   })
   return userSchema.validate(data)
}

module.exports = {
   note
}