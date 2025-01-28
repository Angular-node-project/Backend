// ! Testing only Remove at once
const cartRepo=require('../repos/cart.repo');
const cartService=require('../services/cart.service');
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();

    router.get("/testing", async (req, res, next) => {
        try {
          

            const cart = await cartRepo.getAllCart();
            return res.status(201).json(unifiedResponse(201, 'cart found successfully', cart));
        } catch (err) {
            handleError(res, err);
        }
    })
    router.post("/changeQty", async (req, res, next) => {
        try {
            // Validate request data
            // const { error, value } = createclerkDto.validate(req.body,{abortEarly:false});
            // if (error) {
            //     const errors= error.details.map(e=>e.message);
            //     return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            // }

            // Service call
            let CustomerId="1";
            let ProductId="550e8400-e29b-41d4-a716-446655440003";
            let NewQuantity=99;
            const cart = await cartService.updateProductQuantityInCart(CustomerId,ProductId,NewQuantity);
            return res.status(201).json(unifiedResponse(201, 'cart found successfully', cart));
        } catch (err) {
            handleError(res, err);
        }
    })
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