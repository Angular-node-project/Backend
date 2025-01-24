const clerkService=require('../services/clerk.service');
const {createclerkDto}=require('../validators/clerk.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();

    router.post("/", async (req, res, next) => {
        try {
            // Validate request data
            const { error, value } = createclerkDto.validate(req.body,{abortEarly:false});
            if (error) {
                const errors= error.details.map(e=>e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            // Service call
            const user = await clerkService.addUser(value);
            return res.status(201).json(unifiedResponse(201, 'User created successfully', user));
        } catch (err) {
            handleError(res, err);
        }
    })
    
    return router;

})()