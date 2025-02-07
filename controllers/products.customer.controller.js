const productService = require('../services/product.service');
const orderservice = require("../services/order.service");
const categoryService = require('../services/category.service');
const orderService = require('../services/order.service');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const { createReviewDto } = require('../validators/product.validator');
const {optionalAuthMiddleWare,authenticationMiddleware} = require("../middlewares/authentication.middleware");

module.exports = (() => {
    const router = require("express").Router();

    router.get("/", async (req, res, next) => {
        try {
            if (req.query.page) {
                var page = parseInt(req.query.page) || 1;
                var limit = 6;
                const sort = req.query.sort || '';
                const category = req.query.category || '';
                const result = await productService.getPaginatedActiveProductsService(page, limit, sort, category);
                return res.status(201).json(unifiedResponse(201, 'paginated products returned succesfully', result));
            } else {
                const products = await productService.getProducts();
                return res.status(201).json(unifiedResponse(201, 'all Products returned successfully', products));
            }

        } catch (err) {
            handleError(res, err);
        }
    })

    router.get("/categories", async (req, res, next) => {
        try {
            const result = await categoryService.getActiveCategoriesService();
            return res.status(201).json(unifiedResponse(201, 'all active categories returned successfully', result));
        } catch (err) {
            handleError(res, err);
        }
    })

    router.get("/status/:status", async (req, res, next) => {
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

    router.get("/:id",optionalAuthMiddleWare, async (req, res, next) => {
        try {
            const id = req.params.id;
            const product = await productService.getProductbyid(id);
            if (product) {
                var claimsData = req.data;
                var doesCustomerOrderThisProduct=false;
                if (claimsData) {
                    var customerId = claimsData.id;
                    var customerOrders = await orderService.getCustomerOrders(customerId);
                    doesCustomerOrderThisProduct = customerOrders.some(order => 
                        order.product.some(p => p.product_id === id)
                    );
                }

                var result={...product.toObject(),doesCustomerOrderThisProduct};
                return res.status(201).json(unifiedResponse(201, 'Product retrived successfully', result));
            }
            else {
                return res.status(403).json(unifiedResponse(403, 'Product not found '));
            }
        } catch (err) {
            handleError(res, err);
        }
    })

    router.post("/addReview/:productId",authenticationMiddleware, async (req, res, next) => {
        try {
            const { productId } = req.params;
            const { error, value } = createReviewDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(401).json(unifiedResponse(400, "validation error", errors));
            }
            var customer = {
                customer_id: req.data.id,
                name: req.data.name
            }
            var result = await productService.addReviewService(productId, customer, value);
            if(result==-1){
                return res.status(200).json(unifiedResponse(200, "customer add comment before", null));
            }
            return res.status(200).json(unifiedResponse(200, "Review added successfully", result));

        } catch (err) {
            handleError(res, err);
        }

    })

    return router;

})()