const cartService=require('../services/cart.service');
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();

    router.get("/", async (req, res, next) => {
        try {
            // Validate request data
            // const { error, value } = createclerkDto.validate(req.body,{abortEarly:false});
            // if (error) {
            //     const errors= error.details.map(e=>e.message);
            //     return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            // }

            // Service call
            let id="1"
            const cart = await cartService.getCart(id)
            return res.status(201).json(unifiedResponse(201, 'cart found successfully', cart));
        } catch (err) {
            handleError(res, err);
        }
    })
    
    return router;

})()