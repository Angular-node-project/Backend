const productService = require('../services/product.service');
const orderservice = require("../services/order.service");
const {createProductDto}=require('../validators/product.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const { imageKitPayloadBuilder } = require("../utils/images");
const { uploadService } = require("../services/image.service");
const updateProductSchema=require("../models/sellerUpdateProductRequest.model");

module.exports = (() => {
    const router = require("express").Router();
    router.post("/", async (req, res, next) => {
        try {

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
            const product =await productService.createProduct({...value,pics:response.imageurls});
        
           
              return res.status(201).json(unifiedResponse(201, 'product created successfully', product));
            ;
          } else {
            
            const { fileName, src } = imageKitPayloadBuilder(uploadedFile);
            uploadPayload.push({ src, fileName });
            const response = await uploadService.upload({ files: uploadPayload });
            const product =await productService.createProduct({...value,pics:response.imageurls});
              return res.status(201).json(unifiedResponse(201, 'product created successfully', product));
            ;
          }
        } catch (exception) {
          console.log(exception);
          return res.status(400).json(unifiedResponse(400, 'there is problem'));
        }
      });
      router.patch("/:id", async (req, res, next) => {
        try {
           const productid=req.params.id;
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
            const product =await productService.updateProduct(productid,{...value,pics:response.imageurls});
        
           
              return res.status(201).json(unifiedResponse(201, 'product updated successfully', product));
            ;
          } else {
            
            const { fileName, src } = imageKitPayloadBuilder(uploadedFile);
            uploadPayload.push({ src, fileName });
            const response = await uploadService.upload({ files: uploadPayload });
            const product =await productService.updateProduct(productid,{...value,pics:response.imageurls});
              return res.status(201).json(unifiedResponse(201, 'product updated successfully', product));
            ;
          }
        } catch (exception) {
          console.log(exception);
          return res.status(400).json(unifiedResponse(400, 'there is problem'));
        }
      });

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
    router.patch("/acceptUpdateRequest/:id/:status", async (req, res, next) => {
      try {
          const productid = req.params.id;
          const status = req.params.status;
          const updatedData = await updateProductSchema.findOneAndUpdate(
              { "updatedProduct.product_id": productid },
              { status: status }, 
              { new: true }
          );
  
          if (!updatedData) {
            console.log('No document found with product_id:', productid);
              return res.status(404).json(unifiedResponse(404, 'Update request not found'));
          }
          const updatedProduct = await productService.updateProductRequest(
              productid, 
              updatedData.updatedProduct 
          );
          if (updatedProduct) {
              return res.status(200).json(unifiedResponse(200, 'Product update accepted successfully', updatedProduct));
          } else {
              return res.status(404).json(unifiedResponse(404, 'Product not found'));
          }
  
      } catch (err) {
          handleError(res, err);
      }
  });
  
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
    router.get("/:id", async (req, res, next) => {
        try {
            const id = req.params.id;
            const products = await productService.getProductbyid(id);
            if (products) {
                return res.status(201).json(unifiedResponse(201, 'Product retrived successfully', products));
            }
            else {
                return res.status(403).json(unifiedResponse(403, 'Product not found'));
            }
        } catch (err) {
            handleError(res, err);
        }
    })

    return router;

})()