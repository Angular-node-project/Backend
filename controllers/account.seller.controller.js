const { unifiedResponse, handleError } = require('../utils/responseHandler');
const bcrypt = require('bcrypt');
const { sellerRegisterDto } = require("../validators/seller.validator");
const jsonwebtoken = require("../utils/jwtToken");
const sellerService = require('../services/seller.service');


module.exports = (() => {
    const router = require("express").Router();
    router.post("/register", async (req, res, next) => {
        try {
            const { error, value } = sellerRegisterDto.validate(req.body, { abortEarly: false });
            if (error) {
                const errors = error.details.map(e => e.message);
                return res.status(400).json(unifiedResponse(400, "validation error", errors));
            }

            let isEmailExist = await sellerService.isEmailExistService(value.email);
            if (isEmailExist) {
                return res.status(500).json(unifiedResponse(500, "seller already registerd try to login", null));
            }
            var hashed_password = await bcrypt.hash(value.password, 10);
            value.password = hashed_password;
            const seller= await sellerService.createSellerService(value);
            if(seller){
                return res.status(201).json(unifiedResponse(210, "registered successfully", null));
            }

        } catch (err) {
            handleError(res, err);
        }
    })

    router.post('/login',async(req,res,next)=>{
        try {
            const { error, value } = customerLoginDto.validate(req.body, { abortEarly: false });
            if (error) {
              const errors = error.details.map(e => e.message);
              return res.status(400).json(unifiedResponse(400, "validation error", errors));
            }
            var user = await customerService.getUserByEmailService(value.email);
            if (user) {
              var samePassword = await bcrypt.compare(value.password, user.password);
              if (samePassword) {
                const claims = {
                  id: user.customer_id,
                  email: user.email,
                  name: user.name,
                  user_type: 'customer'
                }
      
                var token = await jsonwebtoken.signToken({ claims });
                return res.status(201).json(unifiedResponse(201, "user logged in successfully", token))
              }
            }
            return res.status(401).json(unifiedResponse(401, "email or password is not correct", null))
      
          } catch (err) {
            handleError(res, err);
          }
    })



    return router;
})(); 