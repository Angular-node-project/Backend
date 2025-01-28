const ProductService=require('../services/product.service');
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();
    router.get("/",async(req,res)=>{
        try {
             var page= parseInt(req.query.page)||1;
             var limit=6;
             const result= await ProductService.getPaginatedActiveProductsService(page,limit); 
            return res.status(201).json(unifiedResponse(201, 'products returned succesfully', result));
        } catch (err) {
            handleError(res, err);
        }
    })
    return router;
})()