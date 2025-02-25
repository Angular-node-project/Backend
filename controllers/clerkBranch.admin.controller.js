const clerkbranchservice = require("../services/clerkBranch.service");
const { clerkBranchCreateDto } = require('../validators/clerkBranch.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const bcrypt = require('bcrypt');
const sendEmail =require("../utils/email");
module.exports = (() => {
    const router = require("express").Router();
    router.post("/", async (req, res, next) => {
        try {
            const { error, value } = clerkBranchCreateDto.validate(req.body, { abortEarly: false });
             if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, "validation error", errors));
            }

            let isEmailExist = await clerkbranchservice.isEmailExist(value.email);
            if (isEmailExist) {
                return res.status(500).json(unifiedResponse(500, "Clerk already Exsist try to login", null));
            }
             var randomPassword = Math.random().toString(36).slice(-8);
              var email=await sendEmail.sendEmail(value.email,'Green Store',`Hello ${value.name} Your Login password is ${randomPassword}`)
               var hashedPassword = await bcrypt.hash(randomPassword, 10);
                value.password=hashedPassword;
            const clerkBranch= await clerkbranchservice.createClerkBranchService(value);
            if(clerkBranch){
                return res.status(201).json(unifiedResponse(201, "register successfully", clerkBranch));
            }

        } catch (err) {
            handleError(res, err);
        }
    })
    router.patch("/:clerkBranchId", async (req, res, next) => {
        try {
            const clerkBranchId=req.params.clerkBranchId;
            const { error, value } = clerkBranchCreateDto.validate(req.body, { abortEarly: false });
             if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, "validation error", errors));
            }

           const clerkbranch=await clerkbranchservice.updateClerkService(clerkBranchId,value);
            if(clerkbranch){
                return res.status(201).json(unifiedResponse(201, "ClerkBranch Updated successfully", clerkbranch));
            }
            return res.status(201).json(unifiedResponse(201, "ClerkBranch Not Found "));
        } catch (err) {
            handleError(res, err);
        }
    })
    router.patch("/changestatus/:clerkBranchId/:status", async (req, res, next) => {
        try {
            const clerkBranchId=req.params.clerkBranchId;
            const status=req.params.status;

           const clerkbranch=await clerkbranchservice.changestatusService(clerkBranchId,status);
            if(clerkbranch){
                return res.status(201).json(unifiedResponse(201, "ClerkBranch Status Updated successfully", clerkbranch));
            }
            return res.status(201).json(unifiedResponse(201, "ClerkBranch Not Found "));
        } catch (err) {
            handleError(res, err);
        }
    })
    router.get("/", async (req, res, next) => {
            try {
                var page = parseInt(req.query.page) || 1;
                var limit = parseInt(req.query.limit) || 6;
                var status = req.query.status;
                var search = req.query.search;
                var sort = req.query.sort;
                if (page || status || search || limit || sort) {
                    const result = await clerkbranchservice.getAllclerkbranchesPaginatedService(page, limit, sort, search, status);
                    return res.status(201).json(unifiedResponse(201, 'Paginated Clerkbranches returned successfully', result));
                } else {
                    const Clerkbranches = await clerkbranchservice.getAllBranchClerksService();
                    return res.status(201).json(unifiedResponse(201, 'All Clerkbranches returned successfully', Clerkbranches));
                }
            } catch (err) {
                handleError(res, err);
            }
        })
    return router;
})()