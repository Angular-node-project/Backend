
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const productBranchService=require("../services/productBranch.service");
const productService=require("../services/product.service");
const qtyRequestService=require("../services/qtyRequest.service");
const {qtyRequestAddDto}=require("../validators/qtyRequest.validators");


module.exports = (() => {
    const router = require("express").Router();
      
     router.get("/",async(req,res,next)=>{
        try{

            var branch_id=req.data.branch.branch_id;
            console.log("Here is ------------------------")
            console.log(branch_id)
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 8;
            var status = req.query.status;
            var search = req.query.search;
            var result= await productBranchService.getAllProductsByBranchIdPaginated(branch_id,page,limit,search,status);
            return res.status(201).json(unifiedResponse(201, 'Paginated products returned successfully', result));

        }catch(err){
            handleError(res,err);
        }
     })
     router.get("/active",async(req,res,next)=>{
        try{
            var result=await productService.getProducts();
            return res.status(201).json(unifiedResponse(201, ' products returned successfully', result));
        }catch(err){
            handleError(res,err);
        }
     })

     router.post("/qty/request",async(req,res,next)=>{
        try{
            const { error, value } = qtyRequestAddDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }
            var branch=req.data.branch;
            var requesterClerk={clerk_id:req.data.id,name:req.data.name};
            var data=value.map(request=>({
                 ...request,
                 branch,
                 requesterClerk
            }))
          var result= await qtyRequestService.addQtyRequestService(data);
          return res.status(201).json(unifiedResponse(201, 'requests added successfully', result));

        }catch(err){
            handleError(res,err);
        }
     })

    return router;
})();