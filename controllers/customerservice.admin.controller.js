const customerservice=require("../services/customerservice.service");
const { unifiedResponse, handleError } = require('../utils/responseHandler');
module.exports=(()=>{
    const router=require("express").Router();
   
   router.get("/", async (req, res, next) => {
               try {
                   var page = parseInt(req.query.page) || 1;
                   var limit = parseInt(req.query.limit) || 6;  
                   var status = req.query.status; 
                   var email=req.query.email;
         
                   if (page  || status ||email) {
                       const result = await customerservice.getAllmessagesPaginated(page, limit,status,email);
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
    return router;
})()