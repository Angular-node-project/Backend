const orderService=require('../services/order.service');
const {createOrderDto}=require('../validators/order.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();

    router.post("/", async (req, res, next) => {
        try {
            // Validate request data
            const { error, value } = createOrderDto.validate(req.body,{abortEarly:false});
            if (error) {
                const errors= error.details.map(e=>e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            // Service call
            const order = await orderService.addOrder(value)
            return res.status(201).json(unifiedResponse(201, 'Order created successfully', order));
        } catch (err) {
            handleError(res, err);
        }
    })
    return router;

})()