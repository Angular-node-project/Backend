const productService = require('../services/product.service');
const { productRequestService } = require('../services/productRequest.service');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const { createProductDto } = require('../validators/product.validator');
const { imageKitPayloadBuilder } = require("../utils/images");
const { uploadService } = require("../services/image.service");

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
    router.get("/status/:status", async (req, res, next) => {
        try {
            const status = req.params.status;
            const Sellers = await sellerservice.getSellersByStatus(status);
            return res.status(201).json(unifiedResponse(201, ' Sellers Retrived successfully', Sellers));
        }
        catch (err) {
            handleError(res, err);
        }

    })

    router.post("/:sellerId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const { error, value } = createProductDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json(unifiedResponse(400, 'Select image for the product'));
            }
            const uploadedFile = req.files?.pics;
            const uploadPayload = [];
            if (Array.isArray(uploadedFile)) {
                for (const expressUploadedFile of uploadedFile) {
                    const { fileName, src } = imageKitPayloadBuilder(expressUploadedFile);
                    uploadPayload.push({
                        src,
                        fileName,
                    });
                }
                const response = await uploadService.upload({ files: uploadPayload });
                const product = await productService.addProduct(sellerId, { ...value, pics: response.imageurls });
                return res.status(201).json(unifiedResponse(201, 'Product created successfully', product));
            } else {
                const { fileName, src } = imageKitPayloadBuilder(uploadedFile);
                uploadPayload.push({ src, fileName });
                const response = await uploadService.upload({ files: uploadPayload });
                const product = await productService.addProduct(sellerId, { ...value, pics: response.imageurls });
                return res.status(201).json(unifiedResponse(201, 'Product created successfully', product));
            }
        } catch (exception) {
            console.log(exception);
            return res.status(400).json(unifiedResponse(400, 'There is a problem'));
        }
    });

    router.patch("/:sellerId/:productId", async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const productId = req.params.productId;
            const { error, value } = createProductDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json(unifiedResponse(400, 'Select image for the product'));
            }
            const uploadedFile = req.files?.pics;
            const uploadPayload = [];
            if (Array.isArray(uploadedFile)) {
                for (const expressUploadedFile of uploadedFile) {
                    const { fileName, src } = imageKitPayloadBuilder(expressUploadedFile);
                    uploadPayload.push({
                        src,
                        fileName,
                    });
                }
                const response = await uploadService.upload({ files: uploadPayload });
                const updateRequest = await productRequestService.createUpdateRequest(sellerId, productId, { ...value, pics: response.imageurls });
                return res.status(201).json(unifiedResponse(201, 'Update request created successfully', updateRequest));
            } else {
                const { fileName, src } = imageKitPayloadBuilder(uploadedFile);
                uploadPayload.push({ src, fileName });
                const response = await uploadService.upload({ files: uploadPayload });
                const updateRequest = await productRequestService.createUpdateRequest(sellerId, productId, { ...value, pics: response.imageurls });
                return res.status(201).json(unifiedResponse(201, 'Update request created successfully', updateRequest));
            }
        } catch (exception) {
            console.log(exception);
            return res.status(400).json(unifiedResponse(400, 'There is a problem'));
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
