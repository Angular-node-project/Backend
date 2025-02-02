const Joi = require('joi');

const customerCreateDto = Joi.object({
    name: Joi.string().trim().min(3).max(100).required(),
    email: Joi.string().trim().email().required(),
    address: Joi.string().trim().optional(),
    phone_number: Joi.string().pattern(/^[0-9]{10,15}$/).optional().messages({
        'string.pattern.base': 'Phone number must be 10 to 15 digits long'
    }),
    password:Joi.string().min(6).required(),
    gender: Joi.string().valid('male', 'female').optional(),
    status: Joi.string().valid('active', 'inactive').default('active')
});

const customerLoginDto=Joi.object({
    email: Joi.string().trim().email().required(),
    password:Joi.string().required()
})

module.exports = { customerCreateDto ,customerLoginDto };