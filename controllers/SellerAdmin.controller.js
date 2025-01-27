const sellerservice=require("../services/SellerAdmin.service");
const  { unifiedResponse, handleError } = require('../utils/responseHandler');
module.exports=(()=>{
    const router=require ("express").Router();
    router.get("/",async(req,res,next)=>{
        try
        {
            const Sellers= await sellerservice.getSellers();
            return res.status(201).json(unifiedResponse(201, 'Sellers Retrived successfully', Sellers));
        }
       catch (err) {
            handleError(res, err);
        }
     
    })
    
    router.get("/:status",async(req,res,next)=>{
        try
        {
            const status=req.params.status;
            const Sellers= await sellerservice.getSellersByStatus(status);
            return res.status(201).json(unifiedResponse(201, ' Sellers Retrived successfully', Sellers));
        }
       catch (err) {
            handleError(res, err);
        }
     
    })
    router.patch("/delete/:id",async(req,res,next)=>{
        try
        {
            const sellerid=req.params.id;
            const Seller= await sellerservice.softDeleteSeller(sellerid);
            if(Seller)
            {
            return res.status(201).json(unifiedResponse(201, 'Sellers deactive successfully', Seller));
            }
            else
            {
                return res.status(403).json(unifiedResponse(403, 'Seller not found'));
            }
        }
       catch (err) {
            handleError(res, err);
        }
     
    })
    router.patch("/restore/:id",async(req,res,next)=>{
        try
        {
            const sellerid=req.params.id;
            const Seller= await sellerservice.restoreSeller(sellerid);
            if(Seller)
            {
            return res.status(201).json(unifiedResponse(201, 'Seller Restored successfully', Seller));
            }
            else
            {
                return res.status(403).json(unifiedResponse(403, 'Seller not found'));
            }
        }
       catch (err) {
            handleError(res, err);
        }
     
    })
    router.get("/byid/:id",async(req,res,next)=>{
        try
        {
            const sellerid=req.params.id;
            const Seller= await sellerservice.getSellerbyid(sellerid);
            if(Seller)
            {
            return res.status(201).json(unifiedResponse(201, 'Seller Retrived successfully', Seller));
            }
            else
            {
                return res.status(403).json(unifiedResponse(403, 'Seller notss found'));
            }
        }
       catch (err) {
            handleError(res, err);
        }
     
    })
    return router;
})()