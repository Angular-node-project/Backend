const clerkService = require('../services/clerk.service.js');
const { createclerkDto } = require('../validators/clerk.validator.js');
const { unifiedResponse, handleError } = require('../utils/responseHandler.js');
const bcrypt=require('bcrypt');
const { authorizationMiddleware } = require("../middlewares/authorization.middleware.js");

module.exports = (() => {
    const router = require("express").Router();

    router.get("/",authorizationMiddleware('clerks','show'), async (req, res, next) => {
        try {
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 8;
            var searchWord = req.query.searchWord;
            if (page) {
                const result = await clerkService.getAllclerksPaginated(page, limit, searchWord);
                return res.status(201).json(unifiedResponse(201, 'Paginated Clerks returned successfully', result));
            } else {
                const clerks = await clerkService.getUsers();
                return res.status(201).json(unifiedResponse(201, 'All clerks returned successfully', clerks));
            }

        } catch (err) {
            handleError(res, err);
        }
    });
   

      router.post('/', async (req, res, next) => {
            try {
                let { clerk_id, ...data } = req.body;
                data.password=await bcrypt.hash("123456",10);
                var result = await clerkService.CreateUser(data);
                return res.status(201).json(unifiedResponse(201, "clerk added successfully", result))
            } catch (error) {
                handleError(error);
            }
        })
    
        router.put('/', async (req, res, next) => {
            try {
               // var {status,...data}=req.body;
                var result = await clerkService.updateUser(req.body.clerk_id,req.body);
                if(result!=0){
                    return res.status(201).json(unifiedResponse(201, "clerk updated successfully", result))
                }
                return res.status(201).json(unifiedResponse(201, "clerk is not found", result))
            } catch (error) {
                handleError(error);
            }
        })
    
        router.put('/:clerk_id/:status', async (req, res, next) => {
            try {
                const { clerk_id, status } = req.params;
                var result = await clerkService.changeStatusClerkService(clerk_id,status);
                if(result!=0){
                    return res.status(201).json(unifiedResponse(201, "clerk status updated successfully", result))
                }
                return res.status(201).json(unifiedResponse(201, "clerk is not found", result))
            } catch (error) {
                handleError(error);
            }
        })
    return router;

})()