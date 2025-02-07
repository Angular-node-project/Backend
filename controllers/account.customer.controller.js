const { unifiedResponse, handleError } = require('../utils/responseHandler');
const { customerCreateDto, customerLoginDto, customerUpdateDto } = require("../validators/customer.validator");
const customerService = require("../services/customer.service");
const bcrypt = require('bcrypt');
const jsonwebtoken = require("../utils/jwtToken")

module.exports = (() => {
  const router = require("express").Router();
  router.post("/register", async (req, res, next) => {
    try {

      const { error, value } = customerCreateDto.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map(e => e.message);
        return res.status(400).json(unifiedResponse(400, "validation error", errors));
      }
      let isEmailExist = await customerService.isEmailExistService(value.email);
      if (isEmailExist) {
        return res.status(500).json(unifiedResponse(500, "customer already registerd try to login", null))
      }
      var hashed_password = await bcrypt.hash(value.password, 10);
      value.password = hashed_password;
      const customer = await customerService.registerService(value);
      if (customer) {
        const claims = {
          id: customer.customer_id,
          email: customer.email,
          name: customer.name,
          user_type: 'customer'
        }
        var token = await jsonwebtoken.signToken({ claims });
        const respons = {
          customer,
          token
        }
        return res.status(201).json(unifiedResponse(201, "customer registerd successfully", respons))
      }


    } catch (err) {
      handleError(res, err);
    }

  })

  router.post("/login", async (req, res, next) => {
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

  router.put("/profile", async (req, res, next) => {

    try {
      const { error, value } = customerUpdateDto.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map(e => e.message);
        return res.status(400).json(unifiedResponse(400, "validation error", errors));
      }
      let customer = await customerService.getUserByCustomerIdService(value.customer_id);

      if (!customer)
        return res.status(400).json(unifiedResponse(400, "validation error", errors));


      var hashed_password = await bcrypt.compare(value.currentPassword, customer.password);
      if (!hashed_password)
        return res.status(400).json(unifiedResponse(400, "Password didn't match", value));

      var hashed_password = await bcrypt.hash(value.newPassword, 10);
      value.newPaswword = hashed_password;


      let updatedCustomer = await customerService.updateProfile(value)

      return res.status(201).json(unifiedResponse(201, "customer Info Updated successfully", updatedCustomer))

    } catch (error) {
      handleError(res, error);
    }

  });

  return router;
})();