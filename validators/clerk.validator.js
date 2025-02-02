const Joi = require('joi');
const createclerkDto = Joi.object({
  name:  Joi.string().trim().min(3).max(100).required(),
  email:Joi.string().trim().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must have at least 8 characters, including uppercase, lowercase, numbers, and special characters.'
    }),
  role_id: Joi.string().required()
});
const clerkLoginDto=Joi.object({
    email: Joi.string().trim().email().required(),
    password:Joi.string().required()
})

module.exports = { createclerkDto,clerkLoginDto };