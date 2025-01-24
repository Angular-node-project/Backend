const Joi = require('joi');

const createclerkDto = Joi.object({
  name2:Joi.string().min(3).required(),
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required()
});

module.exports = { createclerkDto };