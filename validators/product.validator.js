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
  show: Joi.string().valid("online", "offline", "all").required(),

  pics: Joi.array().items(
    Joi.string().required()
  ).optional(),

  branches: Joi.array().items(
    Joi.object({
      branch: Joi.object({
        branch_id: Joi.string().required(),
        name: Joi.string().required()
      }).required(),
      qty:Joi.number().min(1).required()
    })
  
  ).optional(),


});

const createReviewDto = Joi.object({
  rate: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional()
})


const createSellerProductDto = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  details: Joi.string().min(3).allow(null, '').optional(),
  qty: Joi.number().min(1).required(),
  show: Joi.string().valid("online", "offline", "all").required(),
  price: Joi.number().min(1).required(),
  seller_id: Joi.string().empty(""),


  categories: Joi.array().items(
    Joi.object({
      category_id: Joi.string().required(),
      name: Joi.string().required()
    })
  ).optional(),


  status: Joi.string().valid("active", "inactive", "pending", "outStock").required(),
  pics: Joi.array().items(
    Joi.string().required()
  ).optional(),

});



module.exports = { createProductDto, createReviewDto, createSellerProductDto };
