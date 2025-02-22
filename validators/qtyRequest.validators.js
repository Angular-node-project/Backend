const Joi = require('joi');

const qtyRequestAddDto = Joi.array().items(
    Joi.object({
        product_id: Joi.string().required(),
        product_name: Joi.string().required(),
        requiredQty: Joi.number().integer().positive().required()
    }).unknown(true)
);

module.exports = {qtyRequestAddDto};

