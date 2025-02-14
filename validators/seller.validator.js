const Joi = require('joi');

const sellerRegisterDto = Joi.object({
    name: Joi.string().trim().min(3).max(100).required(),
    email: Joi.string().trim().email().required(),
    national_id: Joi.string().trim().required(),
    phone_number: Joi.string().pattern(/^[0-9]{10,15}$/).optional().allow(null,'').messages({
        'string.pattern.base': 'Phone number must be 10 to 15 digits long'
    }).optional(),
    registeration_number: Joi.string().optional(),
    status: Joi.string().default('pending')
});


const sellerLoginDto = Joi.object({
    email: Joi.string().trim().email().required(),
   password: Joi.string().trim().min(6).required()
});



module.exports={sellerRegisterDto,sellerLoginDto}
                                      