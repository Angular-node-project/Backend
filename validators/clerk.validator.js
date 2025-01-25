const Joi = require('joi');

const createclerkDto = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/)  
    .required()
    .messages({
      'string.pattern.base': 'Email must be in the format example@gmail.com'
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must have at least 8 characters, including uppercase, lowercase, numbers, and special characters.'
    }),
  role_id: Joi.string().required()
});


module.exports = { createclerkDto };