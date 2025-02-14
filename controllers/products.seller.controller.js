const productService = require('../services/product.service');
const  productRequestService  = require('../services/productRequest.service');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const { createProductDto,createSellerProductDto } = require('../validators/product.validator');
const { imageKitPayloadBuilder } = require("../utils/images");
const { uploadService } = require("../services/image.service");

const router = require("express").Router();


module.exports = (() => {

    router.get("/:sellerId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 8;  
            var category = req.query.category;
            var status = req.query.status; 
            var sort = req.query.sort;
            var search = req.query.search;
            if (page || category || status || search) {
                const result = await productService.getProductsBySellerPaginated(sellerId, page, limit, sort, category, status, search);
                return res.status(201).json(unifiedResponse(201, 'Paginated products returned successfully', result));
            } else {
                const products = await productService.getProductsBySeller(sellerId);
                return res.status(201).json(unifiedResponse(201, 'Products retrieved successfully', products));
            }
        } catch (err) {
            handleError(res, err);
        }
    });
    // router.get("/status/:status", async (req, res, next) => {
    //     try {
    //         const status = req.params.status;
    //         const Sellers = await sellerservice.getSellersByStatus(status);
    //         return res.status(201).json(unifiedResponse(201, ' Sellers Retrived successfully', Sellers));
    //     }
    //     catch (err) {
    //         handleError(res, err);
    //     }

    // })

    router.post("/:sellerId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            console.log(sellerId);
            const { error, value } = createSellerProductDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            var uploadedImgsUrl = [];
            if (value.pics && value.pics.length > 0) {
                var files = value.pics.map(item => { return { base64: item, fileName: "product" }; });
                const uploadFiles = await uploadService.upload({ files: files });
                uploadedImgsUrl = uploadFiles.imageurls;
            }
            value.pics = uploadedImgsUrl;
            const product = await productService.addProduct(sellerId, value);

            return res.status(201).json(unifiedResponse(201, 'Product created successfully', product));
        } catch (exception) {
            console.log(exception);
            return res.status(400).json(unifiedResponse(400, 'There is a problem'));
        }
    });

    router.patch("/:sellerId/:productId", async (req, res, next) => {
        try {
            console.log(req.body);
            const sellerId = req.params.sellerId;
            const productId = req.params.productId;
            const { error, value } = createSellerProductDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            var uploadedImgsUrl = [];
            if (value.pics && value.pics.length > 0) {
                var files = value.pics.map(item => { return { base64: item, fileName: "product" }; });
                const uploadFiles = await uploadService.upload({ files: files });
                uploadedImgsUrl = uploadFiles.imageurls;
            }
            value.pics = uploadedImgsUrl;
           // const product = await productRequestService.createUpdateRequest(sellerId, productId, value);
           const product =await productRequestService.createUpdateRequest(sellerId,productId,value);

            return res.status(201).json(unifiedResponse(201, 'Product updated successfully', product));
        } catch (exception) {
            console.log(exception);
            return res.status(400).json(unifiedResponse(400, 'There is a problem'));
        }
    });

    router.patch("/changeStatus/:id/:status", async (req, res, next) => {
            try {
                const id = req.params.id;
                const status = req.params.status;
                const products = await productService.ChangeStatusproduct(id,status);
                if (products) {
                    return res.status(201).json(unifiedResponse(201, `Products ${status} successfully`, products));
                }
                else {
                    return res.status(403).json(unifiedResponse(403, 'Product not found '));
                }
            } catch (err) {
                handleError(res, err);
            }
        });

    router.delete("/:sellerId/:productId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const productId = req.params.productId;
            const deletedProduct = await productService.deleteProduct(sellerId, productId);
            return res.status(201).json(unifiedResponse(201, 'Product now inactive', deletedProduct));
        } catch (err) {
            handleError(res, err);
        }
    });

    return router;
})();
