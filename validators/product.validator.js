const Joi = require('joi');

const createProductDto = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  details: Joi.string().min(3).allow(null, '').optional(), 
  qty: Joi.number().min(1).required(),
  price: Joi.number().min(1).required(),
  seller_id: Joi.string().required(),

  
  categories: Joi.array().items(
    Joi.object({
      category_id: Joi.string().required(),
      name: Joi.string().required()
    })
  ).optional(),

 
  status: Joi.string().valid("active", "inactive", "pending", "outStock").required(),


  pics: Joi.array().items(
    Joi.string().pattern(/\.(jpg|png)$/i).required()
  ).optional(),

  reviews: Joi.array().items(
    Joi.object({
      customer_id: Joi.string().required(),
      rate: Joi.number().min(1).max(5).required(),
      comment: Joi.string().optional()
    })
  ).optional()
});

module.exports = { createProductDto };
