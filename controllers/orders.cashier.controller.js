const orderService=require('../services/order.service');
const {createCashierOrderDto}=require('../validators/order.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();

    router.post("/", async (req, res, next) => {
        try {
            // Validate request data
            // cashier_id=req.data.id
            cashier_id=req.data.id;
            branch=req.data.branch;
            const { error, value } = createCashierOrderDto.validate(req.body,{abortEarly:false});
            console.log(value);
            
            if (error) {
                const errors= error.details.map(e=>e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }
            value.cashier_id=cashier_id;
            // Service call
            const order = await orderService.addCashierOrder(value,branch)
            return res.status(201).json(unifiedResponse(201, 'Order created successfully', order));
        } catch (err) {
            handleError(res, err);
        }
    })




    return router;

})()