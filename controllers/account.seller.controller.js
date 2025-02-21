const { unifiedResponse, handleError } = require('../utils/responseHandler');
const bcrypt = require('bcrypt');
const { sellerRegisterDto ,sellerLoginDto, sellerProfileDto} = require("../validators/seller.validator");
const jsonwebtoken = require("../utils/jwtToken");
const sellerService = require('../services/seller.service');
const {userTypeAccessMiddleware}=require("../middlewares/authentication.middleware");


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
            const seller= await sellerService.createSellerService(value);
            if(seller){
                return res.status(201).json(unifiedResponse(201, "registered successfully", seller));
            }

        } catch (err) {
            handleError(res, err);
        }
    })


    router.post('/login',async(req,res,next)=>{
        try {
            const { error, value } = sellerLoginDto.validate(req.body, { abortEarly: false });
            if (error) {
              const errors = error.details.map(e => e.message);
              return res.status(400).json(unifiedResponse(400, "validation error", errors));
            }
            var user = await sellerService.getSellerByEmailService(value.email);
            if(user.status!='active'){
                return res.status(401).json(unifiedResponse(401, "you are not allowed to enter the system", null));
            }
            if (user) {
              var samePassword = await bcrypt.compare(value.password, user.password);
              if (samePassword) {
                const claims = {
                  id: user.seller_id,
                  email: user.email,
                  name: user.name,
                  phone_number:user.phone_number,
                  registeration_number:user.registeration_number,
                  national_id:user.national_id,
                  user_type: 'seller'
                }
      
                var token = await jsonwebtoken.signToken({ claims });
                return res.status(201).json(unifiedResponse(201, "seller logged in successfully", token))
              }
            }
            return res.status(401).json(unifiedResponse(401, "email or password is not correct", null))
      
          } catch (err) {
            handleError(res, err);
          }
    })



    router.post('/profile',userTypeAccessMiddleware('seller'),async(req,res,next)=>{
      try{
        const { error, value } = sellerProfileDto.validate(req.body.data, { abortEarly: false });
        if (error) {
          const errors = error.details.map(e => e.message);
          return res.status(400).json(unifiedResponse(400, "validation error", errors));
        }
        value.seller_id=req.data.id;
        value.status='active';
        var user= await sellerService.updateSellerService(value);
        if(user){
          const claims = {
            id: user.seller_id,
            email: user.email,
            name: user.name,
            phone_number:user.phone_number,
            registeration_number:user.registeration_number,
            national_id:user.national_id,
            user_type: 'seller'
          }

          var token = await jsonwebtoken.signToken({ claims });
          return res.status(201).json(unifiedResponse(201, "profile updated successfully", token));
        }

      }catch(err){
        handleError(err);
      }
    })



    return router;
})(); 