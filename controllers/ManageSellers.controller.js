const sellerservice=require("../services/ManageSellers.service");
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
    router.get("/activesellers",async(req,res,next)=>{
        try
        {
            const Sellers= await sellerservice.getActiveSellers();
            return res.status(201).json(unifiedResponse(201, 'Active Sellers Retrived successfully', Sellers));
        }
       catch (err) {
            handleError(res, err);
        }
     
    })
    router.get("/inactivesellers",async(req,res,next)=>{
        try
        {
            const Sellers= await sellerservice.getInActiveSellers();
            return res.status(201).json(unifiedResponse(201, 'Inactive Sellers Retrived successfully', Sellers));
        }
       catch (err) {
            handleError(res, err);
        }
     
    })
    router.get("/pendingsellers",async(req,res,next)=>{
        try
        {
            const Sellers= await sellerservice.getPendingSellers();
            return res.status(201).json(unifiedResponse(201, 'Pending Sellers Retrived successfully', Sellers));
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
    router.get("/:id",async(req,res,next)=>{
        try
        {
            const sellerid=req.params.id;
            const Seller= await sellerservice.getSeller(sellerid);
            if(Seller)
            {
            return res.status(201).json(unifiedResponse(201, 'Seller Retrived successfully', Seller));
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
    return router;
})()