// ! Testing only Remove at once
const cartRepo = require('../repos/cart.repo');
const cartService = require('../services/cart.service');
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
            let CustomerId = req.data.id;
            let ProductId = req.body.ProductId
            let NewQuantity = +req.body.NewQuantity
            // console.log("Req is ----------------------------------------------------")
            // console.log(req.body)
            const cart = await cartService.updateProductQuantityInCart(CustomerId, ProductId, NewQuantity);
            return res.status(201).json(unifiedResponse(201, 'cart found successfully', cart));
        } catch (err) {
            handleError(res, err);
        }
    })
    router.post("/AddProcuct", async (req, res, next) => {
        try {
            // Service call
            let CustomerId = req.data.id
            let ProductId = req.body.productId
            let NewQuantity = +req.body.qty
            // let CustomerId="50";
            // // let ProductId="abc";
            // let ProductId="998c03a1-9261-4982-b183-74b5def348be";
            // let NewQuantity=5;
            // console.log("Req is ----------------------------------------------------")
            // console.log(req.body)
            const cart = await cartService.addCart(CustomerId, ProductId, NewQuantity);
            console.log("Controller--------------------")
            console.log(cart)
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
            let id = req.data.id;
            console.log(id);
            const cart = await cartService.getCart(id)
            return res.status(201).json(unifiedResponse(201, 'cart found successfully', cart));
        } catch (err) {
            handleError(res, err);
        }
    })

    router.post("/delete", async (req, res, next) => {
        try {
            let customer_id = req.data.id;
            let product_id = req.body.productID;
            const cart = await cartService.deleteProductFromCart(product_id, customer_id);
            return res.status(201).json(unifiedResponse(201, 'Product Removed  successfully', cart));
        } catch (err) {
            handleError(res, err);
        }
    })


    router.post("/", async (req, res, next) => {
        try {
            let customer_id = req.data.id;
            let cart_products = req.body;
            if (cart_products.length > 0) {
                var result = cartService.addFirstListProducts(customer_id, cart_products);
                return res.status(201).json(unifiedResponse(201, 'cart added successfully', result));
            }
            return res.status(500).json(unifiedResponse(201, 'no product to add', null));
        } catch (err) {
            handleError(res, err);
        }
    })

    return router;

})()