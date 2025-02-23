const productService = require('../services/product.service');
const orderservice = require("../services/order.service");
const { createProductDto } = require('../validators/product.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const { uploadService } = require("../services/image.service");
const updateRequestService = require("../services/productRequest.service");
const productBranchService = require("../services/productBranch.service");
const updateQtyService = require("../services/qtyRequest.service");
const updateQtyBranchservice = require("../services/productBranch.service");
const { UpdateQtyRequest } = require('../repos/qtyRequest.repo');

module.exports = (() => {
    const router = require("express").Router();
    router.post("/", async (req, res, next) => {
        try {

            const { error, value } = createProductDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }

            var uploadedImgsUrl = [];
            if (value.pics && value.pics.length > 0) {
                var files = value.pics.map(item => { return { base64: item, fileName: "product" } });
                const uploadFiles = await uploadService.upload({ files: files });
                uploadedImgsUrl = uploadFiles.imageurls;
            }
            value.pics = uploadedImgsUrl;
            const product = await productService.createProduct(value);
            if (product) {
                const result = await productBranchService.addUpdateBranchesQtyService(product.product_id, value.branches);
            }

            return res.status(201).json(unifiedResponse(201, 'product created successfully', product));

        } catch (exception) {
            console.log(exception);
            return res.status(400).json(unifiedResponse(400, 'there is problem'));
        }
    });

    router.patch("/:id", async (req, res, next) => {
        try {
            const productid = req.params.id;
            const { error, value } = createProductDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
            }
            var uploadedImgsUrl = [];
            if (value.pics && value.pics.length > 0) {
                var files = value.pics.map(item => { return { base64: item, fileName: "product" } });
                const uploadFiles = await uploadService.upload({ files: files });
                uploadedImgsUrl = uploadFiles.imageurls;
            }
            value.pics = uploadedImgsUrl;
            const product = await productService.updateProduct(productid, value);
            if (product) {
                const result = await productBranchService.addUpdateBranchesQtyService(product.product_id, value.branches);
            }

            return res.status(201).json(unifiedResponse(201, 'product updated successfully', product));

        } catch (exception) {
            console.log(exception);
            return res.status(400).json(unifiedResponse(400, 'there is problem'));
        }
    });

    router.get("/", async (req, res, next) => {
        try {
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 5;
            var category = req.query.category;
            var status = req.query.status;
            var sort = req.query.sort;
            var search = req.query.search;
            if (page || category || status || search) {
                const result = await productService.getAllProductsPaginated(page, limit, sort, category, status, search);
                return res.status(201).json(unifiedResponse(201, 'Paginated products returned successfully', result));
            } else {
                const products = await productService.getProducts();
                return res.status(201).json(unifiedResponse(201, 'All products returned successfully', products));
            }

        } catch (err) {
            handleError(res, err);
        }
    });
    router.get("/:id", async (req, res, next) => {
        try {

            const productid = req.params.id;
            const products = await productService.getProductbyid(productid);
            return res.status(201).json(unifiedResponse(201, 'All products returned successfully', products));
        }

        catch (err) {
            handleError(res, err);
        }
    });

    router.patch("/ChangeUpdateRequest/:id/:status", async (req, res, next) => {
        try {
            const requestId = req.params.id;
            const status = req.params.status;

            const updatedRequest = await updateRequestService.updateRequest(requestId, status)

            if (!updatedRequest) {
                console.log(" Update request not found:", requestId);
                return res.status(404).json(unifiedResponse(404, 'Update request not found'));
            }

            console.log("Found Update Request:", updatedRequest);

            if (status === "approved") {
                const productId = updatedRequest.updatedProduct.product_id;
                console.log(" Checking Product ID:", `"${productId}"`);



                const updatedProduct = await productService.updateProduct(updatedRequest.updatedProduct.product_id,
                    updatedRequest.updatedProduct);
                if (updatedProduct) {

                    console.log(" Product updated successfully:", updatedProduct);
                    return res.status(200).json(unifiedResponse(200, 'Product update accepted successfully', updatedProduct));
                } else {
                    console.log(" Product update failed");
                    return res.status(404).json(unifiedResponse(404, 'Update failed'));
                }
            } else {
                console.log(" Update request not approved");
                return res.status(200).json(unifiedResponse(200, "Product update request wasn't approved"));
            }
        } catch (err) {
            console.log(" Error:", err);
            handleError(res, err);
        }
    });


    router.patch("/changeStatus/:id/:status", async (req, res, next) => {
        try {
            const id = req.params.id;
            const status = req.params.status;
            var isProductAssignedToBranch=await productBranchService.isProductAssignedToBranchService(id);
            if(isProductAssignedToBranch){
                const products = await productService.ChangeStatusproduct(id, status);
                if (products) {
                    return res.status(201).json(unifiedResponse(201, `Products ${status} successfully`, products));
                }
                else {
                    return res.status(403).json(unifiedResponse(403, 'Product not found ',null));
                }
            }
            return res.status(401).json(unifiedResponse(401, 'please assing branches to this product first',null));

        } catch (err) {
            handleError(res, err);
        }
    })

    router.get("/All/updateRequests", async (req, res, next) => {
        try {
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 6;
            var category = req.query.category;
            var status = req.query.status;
            var sort = req.query.sort;
            var search = req.query.search;
            var seller = req.query.seller;
            if (page || category || status || seller || search) {
                const result = await updateRequestService.getAllUpdaterequestPaginated(page, limit, sort, category, status, seller, search);
                return res.status(201).json(unifiedResponse(201, 'Paginated Update requests returned successfully', result));
            } else {
                const requests = await updateRequestService.getRequests();
                return res.status(201).json(unifiedResponse(201, 'All Update requests returned successfully', requests));
            }

        } catch (err) {
            handleError(res, err);
        }
    });
    router.get("/all/updateQtyRequests", async (req, res, next) => {
        try {
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 6;
            var status = req.query.status;
            var sort = req.query.sort;
            var search = req.query.search;
            if (page || category || status || search) {
                const result = await updateQtyService.getAllQtyRequestedPaginated(page, limit, sort, status, search);
                return res.status(201).json(unifiedResponse(201, 'Paginated Update Qty requests returned successfully', result));
            } else {
                const requests = await updateQtyService.getAllrequests();
                return res.status(201).json(unifiedResponse(201, 'All Update Qty requests returned successfully', requests));
            }

        } catch (err) {
            handleError(res, err);
        }
    });

    router.patch("/ChangeUpdateQuantityRequest/:id/:status", async (req, res, next) => {
        try {
            const requestId = req.params.id;
            const status = req.params.status;
            const qty = +req.query.qty;

            const updatedQtyRequest = await updateQtyService.UpdateQtyRequest(requestId, status)


            const productId = updatedQtyRequest.product_id;
            const BranchId = updatedQtyRequest.branch.branch_id;
            const existingProduct = await productService.getProductbyid(productId);
            if(!existingProduct)
            {
                return res.status(200).json(unifiedResponse(200, 'products not found'));
            }
            const exsistQty = +existingProduct.qty;
            const exsistingBranchProduct = await updateQtyBranchservice.getProductBranchbyIdService(productId,BranchId)
            if (exsistingBranchProduct ) {
                console.log("in branch")
                const exsistingBranchqty = +exsistingBranchProduct.qty;
                if (status === "allApproved") {
                    const DemandQty = +updatedQtyRequest.requiredQty;
                    const total = +DemandQty + exsistQty;
                    const TotalBranch = +DemandQty + exsistingBranchqty;

                    const updatedQty = await productService.updateReturnedProduct(productId, total);
                    const updatedQtyBranch = await productBranchService.UpdateReuqestQtyService(productId, TotalBranch,BranchId);
                    console.log("branch qty"+updatedQtyBranch.qty)
                    
                    return res.status(200).json(unifiedResponse(200, 'Product Request approved totally  successfully', updatedQty, updatedQtyBranch));
                }
                else if (status === "partiallyApproved") {
                    const DemandQty = qty;
                    const total = +DemandQty + exsistQty;
                    const TotalBranch = +DemandQty + exsistingBranchqty;

                    const updatedQty = await productService.updateReturnedProduct(productId, total);
                    const updatedQtyBranch = await productBranchService.UpdateReuqestQtyService(productId, TotalBranch,BranchId);
                 
                    return res.status(200).json(unifiedResponse(200, 'Product Request approved totally  successfully', updatedQty, updatedQtyBranch));
                }
                else {
                    return res.status(200).json(unifiedResponse(200, 'update reuqest dissapproved'));
                }
            }else
            {
                console.log("not in branch")
                if (status === "allApproved") {
                   
                    const DemandQty = +updatedQtyRequest.requiredQty;
                    const total = +DemandQty + exsistQty;
                    const newproduct={
                        product_id:updatedQtyRequest.product_id,
                        branch:{
                            branch_id:updatedQtyRequest.branch.branch_id,
                            name:updatedQtyRequest.branch.name
                        },
                        qty:DemandQty,
                        status:'active',
    
                    }
              
                    const AddProductToBranch=await productBranchService.createProductsBranch(newproduct)
                    const updatedQty = await productService.updateReturnedProduct(productId, total);
                   
                    console.log(AddProductToBranch)
                  
                    return res.status(200).json(unifiedResponse(200, 'New Product Request approved totally  successfully', AddProductToBranch));
                }
                else if (status === "partiallyApproved") {
                    const DemandQty = qty;
                    const total =+ DemandQty + exsistQty;
                    const newproduct={
                        product_id:updatedQtyRequest.product_id,
                        branch:{
                            branch_id:updatedQtyRequest.branch.branch_id,
                            name:updatedQtyRequest.branch.name
                        },
                        qty:DemandQty,
                        status:'active',
    
                    }
                    const AddProductToBranch=await productBranchService.createProductsBranch(newproduct)
                   
                    const updatedQty = await productService.updateReturnedProduct(productId, total);
                   
                    return res.status(200).json(unifiedResponse(200, 'New Product Request approved totally  successfully', AddProductToBranch));
                }
                else {
                    return res.status(200).json(unifiedResponse(200, 'New update reuqest dissapproved'));
                } 
            }

        } catch (err) {
            console.log(" Error:", err);
            handleError(res, err);
        }
    });

    router.post("/branches", async (req, res, next) => {
        try {
            const productIds = req.body.productsIds;
            const result = await productBranchService.getBrancheaBYProductIdsService(productIds);
            return res.status(201).json(unifiedResponse(201, 'product branches retrived successfully', result));


        } catch (err) {
            handleError(res, err);
        }
    })

    return router;

})()