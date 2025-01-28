const orderservice=require('../services/order.service');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
module.exports=(()=>{
const router=require("express").Router();
router.get("/",async(req,res,next)=>{
    try{
        const orders=await orderservice.getorders();
        return res.status(201).json(unifiedResponse(201, 'orders retrived successfully', orders));
    }
    catch (err) {
        handleError(res, err);
    }
})
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
return router;
})()