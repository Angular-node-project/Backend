const { unifiedResponse, handleError } = require('../utils/responseHandler');
const roleService=require('../services/role.service');

module.exports = (() => {
    const router = require("express").Router();
    router.get("/",async (req,res,next)=>{
        try{
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 8;
            var result=await roleService.getAllPaginatedRoles(page,limit);
            return res.status(201).json(unifiedResponse(201, "roles retrived successfully", result));
        }catch(error){
         handleError(error);
        }
    })

    return router;
})();