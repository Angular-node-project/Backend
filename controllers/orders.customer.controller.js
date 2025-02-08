const orderService=require('../services/order.service');
const {createOrderDto}=require('../validators/order.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();

    router.post("/", async (req, res, next) => {
        try {
            // Validate request data
            const { error, value } = createOrderDto.validate(req.body,{abortEarly:false});
            console.log(value);
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

    router.get("/", async (req, res, next) => {
        try {
        
            // Service call
            let customerId=req.data.id
            const orders = await orderService.getCustomerOrders(customerId)
            return res.status(201).json(unifiedResponse(201, 'Orders found successfully', orders));
        } catch (err) {
            handleError(res, err);
        }
    })



    return router;

})()