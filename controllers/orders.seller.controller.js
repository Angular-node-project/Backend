const orderservice = require("../services/order.service");
const { unifiedResponse, handleError } = require("../utils/responseHandler");

module.exports = (() => {
    const router = require("express").Router();

    router.get("/:sellerId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 6;
            var governorate=req.query.governorate;
            const result = await orderservice.getOrdersBySellerIdPaginated(sellerId, page, limit,governorate);
            return res.status(201).json(unifiedResponse(201, 'Paginated orders retrieved successfully', result));
        } catch (err) {
            handleError(res, err);
        }
    });

    return router;
})();