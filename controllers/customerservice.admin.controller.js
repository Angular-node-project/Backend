const customerservice=require("../services/customerservice.service");
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const sendemail = require("../utils/email")
module.exports=(()=>{
    const router=require("express").Router();
   
   router.get("/", async (req, res, next) => {
               try {
                   var page = parseInt(req.query.page) || 1;
                   var limit = parseInt(req.query.limit) || 6;  
                   var status = req.query.status; 
                   var search=req.query.search;
         
                   if (page  || status ||search) {
                       const result = await customerservice.getAllmessagesPaginated(page, limit,status,search);
                       return res.status(201).json(unifiedResponse(201, 'Paginated Messages returned successfully', result));
                   } else {
                       const messages = await customerservice.getAllMessages();
                       return res.status(201).json(unifiedResponse(201, 'All messages returned successfully', messages));
                   }
           
               } catch (err) {
                   handleError(res, err);
               }
           });
    router.get("/email/:email",async(req,res,next)=>{
        try{
            const email=req.params.email;
       const messages=await customerservice.getMessagebyCustomerEmail(email);
       if(messages)
       {
       return res.status(201).json(unifiedResponse(201, 'messages retrived successfully', messages));
       }
       else{
        return res.status(403).json(unifiedResponse(403, 'email not found'));
       }
        }
        catch (err) {
            handleError(res, err);
        }
    })
    router.patch("/sendEmail/:email",async(req,res,next)=>{
        try{
            const email=req.params.email;
            const message=req.query.message;
           
       const customer=await customerservice.SendMessage(email);
       if (!customer) {
        return res.status(404).json(unifiedResponse(404, 'Email not found'));
       }
       sendemail.sendEmail(email, "Plants", `Hello ${customer.name},${message}`)
    
       return res.status(201).json(unifiedResponse(201, 'messages send successfully', customer));
       }
    
        catch (err) {
            handleError(res, err);
        }
    })
    return router;
})()