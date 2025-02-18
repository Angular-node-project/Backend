const Joi = require('joi');
const clerkBranchLoginDto = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(6).required(),
       
});
const clerkBranchCreateDto=Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(6).optional(),
        name: Joi.string().trim().required(),
        branch: Joi.object({
            branch_id: Joi.string().required(),
            name: Joi.string().trim().required()
        }).required(),
        role: Joi.string().trim().required(),

});
module.exports={clerkBranchLoginDto,clerkBranchCreateDto}



