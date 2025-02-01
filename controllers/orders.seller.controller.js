const orderservice = require("../services/order.service");
const { unifiedResponse, handleError } = require("../utils/responseHandler");

module.exports = (() => {
    const router = require("express").Router();

    router.get("/:sellerId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const orders = await orderservice.getorderbysellerid(sellerId);
            return res.status(201).json(unifiedResponse(201, 'orders retrieved successfully', orders));
        } catch (err) {
            handleError(res, err);
        }
    });

    return router;
})();