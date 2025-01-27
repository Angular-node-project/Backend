const Joi = require('joi');

const createcategoryDto = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z]+$/) 
    .required()
});

module.exports = { createcategoryDto };
