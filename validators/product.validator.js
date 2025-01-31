const Joi = require('joi');

const createProductDto = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  details: Joi.string().min(3).allow(null, '').optional(), // Optional
  qty: Joi.number().min(1).required(),
  price: Joi.number().min(1).required(),
  seller_id: Joi.string().required(),

  // Categories validation
  categories: Joi.array().items(
    Joi.object({
      category_id: Joi.string().required(),
      name: Joi.string().required()
    })
  ).optional(),

  // Status validation (enum)
  status: Joi.string().valid("active", "inactive", "pending", "outStock").required(),

  // Pictures validation (only jpg/png URLs)
  pics: Joi.array().items(
    Joi.string().pattern(/\.(jpg|png)$/i).required()
  ).optional(),

  // Reviews validation
  reviews: Joi.array().items(
    Joi.object({
      customer_id: Joi.string().required(),
      rate: Joi.number().min(1).max(5).required(),
      comment: Joi.string().optional()
    })
  ).optional()
});

module.exports = { createProductDto };
