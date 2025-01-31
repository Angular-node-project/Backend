const productService = require('../services/product.service');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const router = require("express").Router();

module.exports = (() => {

    router.get("/:sellerId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const products = await productService.getProductsBySeller(sellerId);
            return res.status(201).json(unifiedResponse(201, 'Products retrieved successfully', products));
        } catch (err) {
            handleError(res, err);
        }
    });

    router.post("/:sellerId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const productData = req.body;
            const newProduct = await productService.addProduct(sellerId, productData);
            return res.status(201).json(unifiedResponse(201, 'Product added successfully', newProduct));
        } catch (err) {
            handleError(res, err);
        }
    });

    router.patch("/:sellerId/:productId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const productId = req.params.productId;
            const productData = req.body;
            const updatedProduct = await productService.updateProduct(sellerId, productId, productData);
            return res.status(201).json(unifiedResponse(201, 'Product updated successfully', updatedProduct));
        } catch (err) {
            handleError(res, err);
        }
    });

    router.delete("/:sellerId/:productId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const productId = req.params.productId;
            const deletedProduct = await productService.deleteProduct(sellerId, productId);
            return res.status(201).json(unifiedResponse(201, 'Product deleted successfully', deletedProduct));
        } catch (err) {
            handleError(res, err);
        }
    });

    return router;
})();