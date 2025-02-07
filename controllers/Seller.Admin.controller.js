const sellerservice = require("../services/seller.service");
const productservice = require("../services/product.service");
const orderservice = require("../services/order.service");
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();
    router.get("/", async (req, res, next) => {
        try {
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 6;
            var status = req.query.status;
            var sort = req.query.sort;

            if (page || status) {
                const result = await sellerservice.getAllsellersPaginated(page, limit, sort, status);
                return res.status(201).json(unifiedResponse(201, 'Paginated Sellers returned successfully', result));
            } else {
                const sellers = await sellerservice.getSellers();
                return res.status(201).json(unifiedResponse(201, 'All sellers returned successfully', sellers));
            }

        } catch (err) {
            handleError(res, err);
        }
    });

    router.get("/:status", async (req, res, next) => {
        try {
            const status = req.params.status;
            const Sellers = await sellerservice.getSellersByStatus(status);
            return res.status(201).json(unifiedResponse(201, ' Sellers Retrived successfully', Sellers));
        }
        catch (err) {
            handleError(res, err);
        }

    })
    router.patch("/delete/:id", async (req, res, next) => {
        try {
            const sellerid = req.params.id;
            const orders = await orderservice.getorderbysellerid(sellerid);
            if (orders) {
                const undeliveredOrders = orders.filter((o) => o.product.
                    some((p) => p.seller_id === sellerid && o.status !== "delivered" && o.status !== "cancelled"));
                if (undeliveredOrders.length > 0) {
                    return res.status(403).json(unifiedResponse(403, "Cannot deactivate seller; undelivered orders exist."));
                }
            }
            await productservice.deleteproductbysellerid(sellerid);
            const Seller = await sellerservice.softDeleteSeller(sellerid);
            if (Seller) {
                return res.status(201).json(unifiedResponse(201, 'Sellers deactive successfully', Seller));
            }
            else {
                return res.status(403).json(unifiedResponse(403, 'Seller not found'));
            }
        }
        catch (err) {
            handleError(res, err);
        }

    })
    router.patch("/restore/:id", async (req, res, next) => {
        try {
            const sellerid = req.params.id;
            const Seller = await sellerservice.restoreSeller(sellerid);
            if (Seller) {
                return res.status(201).json(unifiedResponse(201, 'Seller Restored successfully', Seller));
            }
            else {
                return res.status(403).json(unifiedResponse(403, 'Seller not found'));
            }
        }
        catch (err) {
            handleError(res, err);
        }

    })
    router.get("/byid/:id", async (req, res, next) => {
        try {
            const sellerid = req.params.id;
            const Seller = await sellerservice.getSellerbyid(sellerid);
            if (Seller) {
                return res.status(201).json(unifiedResponse(201, 'Seller Retrived successfully', Seller));
            }
            else {
                return res.status(403).json(unifiedResponse(403, 'Seller notss found'));
            }
        }
        catch (err) {
            handleError(res, err);
        }

    })
    return router;
})();