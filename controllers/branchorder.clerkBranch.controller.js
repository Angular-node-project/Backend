const branchOrderService=require("../services/branchorder.service");
const { unifiedResponse, handleError } = require('../utils/responseHandler');
module.exports=(()=>{
    const router=require("express").Router();
router.get("/",async(req,res,next)=>{
    try{
       
                   var page = parseInt(req.query.page) || 1;
                    var limit = parseInt(req.query.limit)||6 ;
                    var status = req.query.status;
                    var search = req.query.search;
                    var branch_id=req.query.branch_id
                    if (page || status || search|| limit||branch_id) {
                        const result = await branchOrderService.getAllBrnachOrdersPaginated(page, limit, status, search,branch_id);
                        return res.status(201).json(unifiedResponse(201, 'Paginated OrderBranches returned successfully', result));
                    } else {
                        const branches = await branchOrderService.getALllBranchOrders();
                        return res.status(201).json(unifiedResponse(201, 'All OrderBranches returned successfully', branches));
                    }
    }catch (err) {
        handleError(res, err);
    }
})
return router;
})()