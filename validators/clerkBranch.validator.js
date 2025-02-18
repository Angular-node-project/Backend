const Joi = require('joi');
const clerkBranchLoginDto = Joi.object({
        email: Joi.string().trim().email().optional(),
        password: Joi.string().trim().min(6).optional(),
        name: Joi.string().trim().optional(),
        branch: Joi.object({
            branch_id: Joi.string().optional(),
            name: Joi.string().trim().optional()
        }).optional(),
        role: Joi.string().trim().optional(),

});
module.exports={clerkBranchLoginDto}

