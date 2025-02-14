const productService = require('../services/product.service');
const orderservice = require("../services/order.service");
const {createProductDto}=require('../validators/product.validator');
const { unifiedResponse, handleError } = require('../utils/responseHandler');
const { imageKitPayloadBuilder } = require("../utils/images");
const { uploadService } = require("../services/image.service");
const updateRequestService=require("../services/productRequest.service");

module.exports = (() => {
    const router = require("express").Router();
    router.post("/", async (req, res, next) => {
      try {

         const { error, value } = createProductDto.validate(req.body, { abortEarly: false });
          if (error) {
              const errors = error.details.map(e => e.message);
              return res.status(400).json(unifiedResponse(400, 'Validation Error', errors));
          }

          var uploadedImgsUrl=[]; 
          if(value.pics&& value.pics.length>0){
            var files= value.pics.map(item=>{return {base64:item, fileName:"product"}});
            const uploadFiles=await uploadService.upload({files:files}); 
            uploadedImgsUrl=uploadFiles.imageurls;
          }
          value.pics=uploadedImgsUrl;
          const product =await productService.createProduct(value);

          return res.status(201).json(unifiedResponse(201, 'product created successfully', product));
     
        }  catch (exception) {
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
      
          const product =await productService.updateProduct(productid,value);
      
         
            return res.status(201).json(unifiedResponse(201, 'product updated successfully', product));
          ;
      
      }catch (exception) {
        console.log(exception);
        return res.status(400).json(unifiedResponse(400, 'there is problem'));
      }
    });

    router.get("/", async (req, res, next) => {
      try {
          var page = parseInt(req.query.page) || 1;
          var limit = parseInt(req.query.limit) || 8;  
          var category = req.query.category;
          var status = req.query.status; 
          var sort=req.query.sort;
          var search=req.query.search;
          if (page || category || status||search) {
              const result = await productService.getAllProductsPaginated(page, limit,sort , category, status,search);
              return res.status(201).json(unifiedResponse(201, 'Paginated products returned successfully', result));
          } else {
              const products = await productService.getProducts();
              return res.status(201).json(unifiedResponse(201, 'All products returned successfully', products));
          }
  
      } catch (err) {
          handleError(res, err);
      }
  });
  
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
    router.patch("/ChangeUpdateRequest/:id/:status", async (req, res, next) => {
      try {
          const requestId = req.params.id;
          const status = req.params.status;

          const updatedRequest = await updateRequestService.updateRequest(requestId,status)
  
          if (!updatedRequest) {
              console.log(" Update request not found:", requestId);
              return res.status(404).json(unifiedResponse(404, 'Update request not found'));
          }
  
          console.log("Found Update Request:", updatedRequest);
  
          if (status === "approved") {
              const productId = updatedRequest.updatedProduct.product_id;
              console.log(" Checking Product ID:", `"${productId}"`);
  
              const updatedProduct = await productService.updateProductRequest(  updatedRequest.updatedProduct.product_id, 
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
      router.get("/All/updateRequests", async (req, res, next) => {
        try {
            var page = parseInt(req.query.page) || 1;
            var limit = parseInt(req.query.limit) || 6;  
            var category = req.query.category;
            var status = req.query.status; 
            var sort=req.query.sort;
            var search = req.query.search; 
            var seller=req.query.seller;
            if (page || category || status||seller||search) {
                const result = await updateRequestService.getAllUpdaterequestPaginated(page, limit,sort , category, status,seller,search);
                return res.status(201).json(unifiedResponse(201, 'Paginated Update requests returned successfully', result));
            } else {
                const requests = await updateRequestService.getRequests();
                return res.status(201).json(unifiedResponse(201, 'All Update requests returned successfully', requests));
            }
    
        } catch (err) {
            handleError(res, err);
        }
    });
  router.get("/getupdateRequests/id/:id", async (req, res, next) => {
    try {
      const requestid=req.params.id;
        const requests = await updateRequestService.getRequestbyId(requestid);
        if (requests) {
            return res.status(201).json(unifiedResponse(201, 'Product Requests retrived successfully', requests));
        }
        else {
            return res.status(403).json(unifiedResponse(403, 'Requests not found'));
        }
    } catch (err) {
        handleError(res, err);
    }
})
router.get("/getupdateRequests/status/:status", async (req, res, next) => {
  try {
    const status=req.params.status;
      const requests = await updateRequestService.getRequestsbyStatus(status);
      if (requests) {
          return res.status(201).json(unifiedResponse(201, 'Product Requests retrived successfully', requests));
      }
      else {
          return res.status(403).json(unifiedResponse(403, 'Requests not found'));
      }
  } catch (err) {
      handleError(res, err);
  }
})

   
    return router;

})()