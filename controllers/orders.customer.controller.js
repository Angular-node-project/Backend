const orderService=require('../services/order.service');
const {createOrderDto}=require('../validators/order.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const { APP_CONFIG } = require("../config/app.config");
const stripe=require("stripe")(APP_CONFIG.STRIPE_SECRET_KEY)
const sendemail = require("../utils/email")

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
            email=req.data.email
            html=await sendemail.ReceiptGenerator(value,email,order.data.order_id)
            sendemail.sendReceiptEmail('ali.elshanawany2000@yahoo.com','Receipt',html)
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

    router.post("/Online", async (req, res, next) => {
        try {
            // Validate request data  
            const { error, value } = createOrderDto.validate(req.body,{abortEarly:false});
            console.log(value);
            if (error) {
                const errors= error.details.map(e=>e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            const line_items = value.product.map(product => ({
                price_data: {
                    currency: "usd", // Set the currency as USD
                    product_data: {
                        name: product.name // Use the product's name
                    },
                    unit_amount: ((product.price) * 100).toFixed(0) // Convert price to cents (Stripe requires amounts in cents)
                },
                quantity: product.qty // Use the product's quantity
            }
        )
        );
            console.log(value)
            //* Create Session
            const session= await stripe.checkout.sessions.create({
                line_items:line_items,
                mode:"payment",
                success_url:"http://localhost:4200/sucess",
                cancel_url:"http://localhost:4200/checkout"
                
            })
            // console.log(session.url)
            // res.redirect(session.url)
            // // Service call
            // const order = await orderService.addOrder(value)
            return res.status(201).json(unifiedResponse(201, 'session created successfully', session));
        } catch (err) {
            handleError(res, err);
        }
    })



    return router;

})()