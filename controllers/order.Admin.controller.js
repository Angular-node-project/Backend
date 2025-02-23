const orderservice=require('../services/order.service');
const {createOrderDto}=require('../validators/order.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const productservice=require('../services/product.service');
const productBranch=require("../services/productBranch.service");
module.exports=(()=>{
const router=require("express").Router();

router.get("/", async (req, res, next) => {
            try {
                var page = parseInt(req.query.page) || 1;
                var limit = parseInt(req.query.limit) || 9;  
                var status = req.query.status; 
                var governorate=req.query.governorate;
                var type=req.query.type;
      
                if (page  || status ||governorate||type) {
                    const result = await orderservice.getAllordersPaginated(page, limit,status,governorate,type);
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
router.patch("/ChangeOrderStatus/:id/:status",async(req,res,next)=>{
    try{
        const id=req.params.id;
        const status=req.params.status;
        const orders=await orderservice.ChangeOrderStatus(id,status);
        if (status === "cancelled") {
           await orderservice.cancelAllOrderBranchesService(id);
        }
        
        return res.status(201).json(unifiedResponse(201, 'orders status changed successfully', orders));
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



router.post("/assign/branches",async(req,res,next)=>{
    try{
        var data = req.body.data;
        if(data){
            var result= await orderservice.assignOrderToBranchesService(data.data);
            
            if(result){
                for(var item of data.data){
                     await productBranch.decreaseProductByBranchId(item.product.product_id,item.branch.branch_id,item.qty);
                }
                await orderservice.ChangeOrderStatus(data.orderId,"processing");
            }
            return res.status(201).json(unifiedResponse(201, 'Orders  assigned successfully', result));
        }
        return res.status(401).json(unifiedResponse(401, "no data sent", order));

    }catch(err){
        handleError(res,err);
    }
})

return router;
})()