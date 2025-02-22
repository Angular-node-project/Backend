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
    router.get('/SellersCountsBystatus',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.SellersCountsBystatus();
            return res.status(201).json(unifiedResponse(201, "SellersCountsBystatus", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })
    router.get('/getSellerRegistrationMonth',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.getSellerRegistrationMonth();
            return res.status(201).json(unifiedResponse(201, "getSellerRegistrationMonth", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })
    router.get('/getSellerRegistrationsPerWeek',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.getSellerRegistrationsPerWeek();
            return res.status(201).json(unifiedResponse(201, "getSellerRegistrationsPerWeek", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })
    router.get('/NumofOrders',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.NumofOrders();
            return res.status(201).json(unifiedResponse(201, "NumofOrders", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })
    router.get('/NumofProducts',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.NumofProducts();
            return res.status(201).json(unifiedResponse(201, "NumofProducts", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })
    router.get('/NumofBranches',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.NumofBranches();
            return res.status(201).json(unifiedResponse(201, "NumofBranches", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })
    router.get('/TotalSales',async(req,res,next)=>{
        try {
            RegistrationsPerWeek=await adminService.TotalSales();
            return res.status(201).json(unifiedResponse(201, "TotalSales", RegistrationsPerWeek));
        } catch (error) {
            handleError(res, error);
        }
    })



    return router;
})(); 