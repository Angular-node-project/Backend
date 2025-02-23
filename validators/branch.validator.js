const Joi = require('joi');

const createbranchDto = Joi.object({
  name: Joi.string()
    .min(3)
    // .pattern(/^[a-zA-Z]+$/) 
    .optional(), 
    location: Joi.string()
     .min(3)
     .optional()


});

module.exports = { createbranchDto };
