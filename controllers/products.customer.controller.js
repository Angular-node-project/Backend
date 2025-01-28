const productService = require('../services/product.service');
const orderservice = require("../services/order.service");
const { unifiedResponse, handleError } = require('../utils/responseHandler');

module.exports = (() => {
    const router = require("express").Router();

    router.get("/", async (req, res, next) => {
        try {
            if (req.query.page) {
                var page = parseInt(req.query.page) || 1;
                var limit = 6;
                const result = await productService.getPaginatedActiveProductsService(page, limit);
                return res.status(201).json(unifiedResponse(201, 'paginated products returned succesfully', result));
            } else {
                const products = await productService.getProducts();
                return res.status(201).json(unifiedResponse(201, 'all Products returned successfully', products));
            }

        } catch (err) {
            handleError(res, err);
        }
    })


    router.get("/:status", async (req, res, next) => {
        try {
            const status = req.params.status;
            const products = await productService.getproductsbyStatus(status)
            return res.status(201).json(unifiedResponse(201, 'Products retrived successfully', products));
        } catch (err) {
            handleError(res, err);
        }
    })
    router.patch("/delete/:id", async (req, res, next) => {
        try {
            const productid = req.params.id;
            const orders = await orderservice.getorderbyproductid(productid);
            if (orders) {
                const undeliveredOrders = orders.filter((o) => o.product.
                    some((p) => p.product_id === productid && p.status !== "delivered" && p.status !== "cancelled"));
                if (undeliveredOrders.length > 0) {
                    return res.status(403).json(unifiedResponse(403, "Cannot deactivate product; undelivered orders exist."));
                }
            }
            const products = await productService.softdeleteproduct(productid);
            if (products) {
                return res.status(201).json(unifiedResponse(201, 'Products deactive successfully', products));
            }
            else {
                return res.status(403).json(unifiedResponse(403, 'Product not found '));
            }
        } catch (err) {
            handleError(res, err);
        }
    })
    router.patch("/restore/:id", async (req, res, next) => {
        try {
            const id = req.params.id;
            const products = await productService.restoreproduct(id);
            if (products) {
                return res.status(201).json(unifiedResponse(201, 'Products active successfully', products));
            }
            else {
                return res.status(403).json(unifiedResponse(403, 'Product not found '));
            }
        } catch (err) {
            handleError(res, err);
        }
    })
    router.get("/byid/:id", async (req, res, next) => {
        try {
            const id = req.params.id;
            const products = await productService.getProductbyid(id);
            if (products) {
                return res.status(201).json(unifiedResponse(201, 'Products retrive successfully', products));
            }
            else {
                return res.status(403).json(unifiedResponse(403, 'Product not found '));
            }
        } catch (err) {
            handleError(res, err);
        }
    })

    return router;

})()