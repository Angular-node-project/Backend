const { unifiedResponse, handleError } = require('../utils/responseHandler');
const adminService=require('../services/admin.analysis.service')
module.exports = (() => {
    const router = require("express").Router();

    router.get('/GenderCount',async(req,res,next)=>{
        try {
            counts=await adminService.CustomersCounts();
            return res.status(201).json(unifiedResponse(201, "GenderCount", counts));
        } catch (error) {
            handleError(res, error);
        }

    })

    router.get('/getRegistrationsPerWeek',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.getRegistrationsPerWeek();
            return res.status(201).json(unifiedResponse(201, "RegistrationsPerWeek", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }

    })
    router.get('/getRegistrationMonth',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.getRegistrationMonth();
            return res.status(201).json(unifiedResponse(201, "getRegistrationMonth", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })
    router.get('/getOrdersByDayOfWeek',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.getOrdersByDayOfWeek();
            return res.status(201).json(unifiedResponse(201, "getOrdersByDayOfWeek", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })
    router.get('/getOrdersByMonth',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.getOrdersByMonth();
            return res.status(201).json(unifiedResponse(201, "getOrdersByMonth", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })
    router.get('/getOrderCountsByStatus',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.getOrderCountsByStatus();
            return res.status(201).json(unifiedResponse(201, "getOrderCountsByStatus", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })



    return router;
})(); 