const clerkService=require('../services/clerk.service');
const {createclerkDto}=require('../validators/clerk.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();

    router.post("/", async (req, res, next) => {
        try {
            // Validate request data
            const { error, value } = createclerkDto.validate(req.body,{abortEarly:false});
            if (error) {
                const errors= error.details.map(e=>e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            // Service call
            const user = await clerkService.addUser(value);
            return res.status(201).json(unifiedResponse(201, 'User created successfully', user));
        } catch (err) {
            handleError(res, err);
        }
    })
    router.get("/",async(req,res,next)=>{
        try{
            const user=await clerkService.getUser();
            return res.status(201).json(unifiedResponse(201, 'Clerks Retrived successfully', user));

        }catch(err){
            handleError(res, err);
        }
    })
    router.get("/:id",async(req,res,next)=>{
        try{
            const userid=req.params.id;
            const user=await clerkService.getUser(userid);
            if(user)
            {
            return res.status(201).json(unifiedResponse(201, 'Clerk Retrived successfully',user));
            }else
            {
                return res.status(403).json(unifiedResponse(403, 'User not found'));
            }

        }catch(err){
            handleError(res, err);
        }
    })
    router.get("/activeUsers",async(req,res,next)=>{
        try{
            const user=await clerkService.getactiveUsers();
            return res.status(201).json(unifiedResponse(201, 'Active Clerks Retrived successfully', user));

        }catch(err){
            handleError(res, err);
        }
    })
    router.get("/inactiveUsers",async(req,res,next)=>{
        try{
            const user=await clerkService.getinactiveUsers();
            return res.status(201).json(unifiedResponse(201, 'InActive Clerks Retrived successfully', user));

        }catch(err){
            handleError(res, err);
        }
    })
    router.patch("/:id",async(req,res,next)=>{
        try{
            const { error, value } = createclerkDto.validate(req.body,{abortEarly:false});
            if (error) {
                const errors= error.details.map(e=>e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            const userid=req.params.id;
            const user=await clerkService.updateUser(userid,value);
            if(user){
            return res.status(201).json(unifiedResponse(201, 'Clerks Updates successfully', user));
            }else
            {
                return res.status(403).json(unifiedResponse(403, 'User not found'));
            }

        }catch(err){
            handleError(res, err);
        }
    })
    router.patch("/delete/:id",async(req,res,next)=>{
        try{
            const userid=req.params.id;
            const user=await clerkService.softDeleteUser(userid);
            if(user)
            {
            return res.status(201).json(unifiedResponse(201, 'Clerks Updated to inactive successfully',user));
            }else
            {
                return res.status(403).json(unifiedResponse(403, 'User not found'));
            }

        }catch(err){
            handleError(res, err);
        }
    })
    router.patch("/restore/:id",async(req,res,next)=>{
        try{
            const userid=req.params.id;
            const user=await clerkService.restoreUser(userid);
            if(user)
            {
            return res.status(201).json(unifiedResponse(201, 'Clerks Updated to active successfully',user));
            }else
            {
                return res.status(403).json(unifiedResponse(403, 'User not found'));
            }

        }catch(err){
            handleError(res, err);
        }
    })
    return router;

})()