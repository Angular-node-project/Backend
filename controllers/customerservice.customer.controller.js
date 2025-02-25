const customerservice=require("../services/customerservice.service");
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports=(()=>{
    const router=require("express").Router();
   
      router.post("/",async(req,res,next)=>{
        try{
            const data=req.body
           
       const customer=await customerservice.CustomerSendMessage(data);
    
       return res.status(201).json(unifiedResponse(201, 'messages send successfully', customer));
       }
    
        catch (err) {
            handleError(res, err);
        }
    })
    return router;
})()