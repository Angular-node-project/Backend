const Joi = require('joi');
const createclerkDto = Joi.object({
  name:  Joi.string().trim().min(3).max(100).required(),
  email:Joi.string().trim().email().required(),
  password: Joi.string().required(),
  role_id: Joi.string().required()
});

const clerkLoginDto=Joi.object({
    email: Joi.string().trim().email().required(),
    password:Joi.string().required()
})

module.exports = { createclerkDto,clerkLoginDto };