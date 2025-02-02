const orderservice=require('../services/order.service');
const {createOrderDto}=require('../validators/order.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
module.exports=(()=>{
const router=require("express").Router();

router.get("/", async (req, res, next) => {
            try {
                var page = parseInt(req.query.page) || 1;
                var limit = parseInt(req.query.limit) || 6;  
                var status = req.query.status; 
                var governorate=req.query.governorate;
      
                if (page  || status ||governorate) {
                    const result = await orderservice.getAllordersPaginated(page, limit,status,governorate);
                    return res.status(201).json(unifiedResponse(201, 'Paginated Orders returned successfully', result));
                } else {
                    const orders = await orderservice.getorders();
                    return res.status(201).json(unifiedResponse(201, 'All Orders returned successfully', orders));
                }
        
            } catch (err) {
                handleError(res, err);
            }
        });
    
router.get("/status/:status",async(req,res,next)=>{
    try{
        const status=req.params.status;
        const orders=await orderservice.getorderbystatus(status);
        return res.status(201).json(unifiedResponse(201, 'orders retrived successfully', orders));
    }
    catch (err) {
        handleError(res, err);
    }
})
router.get("/id/:id",async(req,res,next)=>{
    try{
        const id=req.params.id;
        const orders=await orderservice.getorderbydid(id);
        return res.status(201).json(unifiedResponse(201, 'orders retrived successfully', orders));
    }
    catch (err) {
        handleError(res, err);
    }
})
router.patch("/:id",async(req,res,next)=>{
    try{
        const id=req.params.id;
        const orders=await orderservice.acceptorder(id);
        return res.status(201).json(unifiedResponse(201, 'orders accepted successfully', orders));
    }
    catch (err) {
        handleError(res, err);
    }
})
router.post("/cashier", async (req, res, next) => {
    try {
        const { error, value } = createOrderDto.validate(req.body,{abortEarly:false});
        if (error) {
            const errors= error.details.map(e=>e.message);
            return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
        }

        const order = await orderservice.addOrder(value)
        return res.status(201).json(unifiedResponse(201, 'Order created successfully', order));
    } catch (err) {
        handleError(res, err);
    }
})

return router;
})()