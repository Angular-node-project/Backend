const Joi = require('joi');

const createOrderDto = Joi.object({
  address: Joi.string().min(3).required().messages({
    "string.pattern.base":"Address is Required"
  }),
  governorate: Joi.string()
    .required(),
    zipcode: Joi.number()
    .required()
    .min(4),
    phone_number: Joi.string().required().pattern(/^(011|012|010|015)\d{8}$/),
    product:Joi.required(),
    additional_data:Joi.string(),
    status:Joi.string()
    .valid("pending", "processing", "shipped", "cancelled", "delivered")
    .default("pending") // Set default value if status is not provided
    .messages({
        "any.only": "Status must be one of: pending, processing, shipped, cancelled, delivered",
        "string.base": "Status must be a string"
    }),
    customer_id:Joi.string().required(),
   cashier_id:Joi.string().default(null),
   totalPrice:Joi.number()
});
const createCashierOrderDto = Joi.object({
  address: Joi.string().optional(),
  governorate: Joi.string()
  .optional(),
    zipcode: Joi.string()  // Use string instead of number for zip codes
    .optional()
    .allow(null, '')     // Explicitly allow null and empty strings
    .regex(/^\d{5}(?:[-\s]\d{4})?$/) // US zip code format validation
    .messages({
      'string.pattern.base': 'Invalid zip code format'
    }),
    phone_number: Joi.string().default(null),
    product:Joi.required(),
    additional_data:Joi.string(),
    status:Joi.string()
    .valid("pending", "processing", "shipped", "cancelled", "delivered")
    .default("pending") // Set default value if status is not provided
    .messages({
        "any.only": "Status must be one of: pending, processing, shipped, cancelled, delivered",
        "string.base": "Status must be a string"
    }),
    customer_id:Joi.string().default(null),
   cashier_id:Joi.string(),
   totalPrice:Joi.number()
});


module.exports = { createOrderDto,createCashierOrderDto };