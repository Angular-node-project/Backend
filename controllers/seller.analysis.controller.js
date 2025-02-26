const { unifiedResponse, handleError } = require('../utils/responseHandler');
const sellerService = require('../services/seller.analysis.service');
const router = require("express").Router();

module.exports = (() => {

    router.get('/countSellerProducts/:sellerId', async (req, res, next) => {
        try {
            const { sellerId } = req.params;
            const count = await sellerService.countSellerProducts(sellerId);
            return res.status(201).json(unifiedResponse(201, "countSellerProducts", count));
        } catch (error) {
            handleError(res, error);
        }
    });

    router.get('/countOrdersForSeller/:sellerId/:status', async (req, res, next) => {
        try {
            const { sellerId, status } = req.params;
            const count = await sellerService.countOrdersForSeller(sellerId, status);
            return res.status(201).json(unifiedResponse(201, "countOrdersForSeller", count));
        } catch (error) {
            handleError(res, error);
        }
    });
    router.get('/countSellerProductsByStatus/:sellerId/:status', async (req, res, next) => {
        try {
            const { sellerId, status } = req.params;
            const count = await sellerService.countSellerProductsByStatus(sellerId, status);
            return res.status(201).json(unifiedResponse(201, "countSellerProductsByStatus", count));
        } catch (error) {
            handleError(res, error);
        }
    });
    router.get('/topSellingProducts/:sellerId', async (req, res, next) => {
        try {
            const { sellerId } = req.params;
            const limit = parseInt(req.query.limit) || 5; 
    
            const products = await sellerService.getTopSellingProducts(sellerId, limit);
            return res.status(200).json(unifiedResponse(200, "topSellingProducts", products));
        } catch (error) {
            handleError(res, error);
        }
    });
    


    return router;
})();