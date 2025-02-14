const { unifiedResponse, handleError } = require('../utils/responseHandler');
const { clerkLoginDto } = require("../validators/clerk.validator");
const clerkService = require("../services/clerk.service");
const bcrypt = require('bcrypt');
const jsonwebtoken = require("../utils/jwtToken");
const sendemail = require("../utils/email")
const roleService = require('../services/role.service');
const { userTypeAccessMiddleware } = require("../middlewares/authentication.middleware");

module.exports = (() => {
  const router = require("express").Router();

  router.post("/login", async (req, res, next) => {
    try {
      const { error, value } = clerkLoginDto.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map(e => e.message);
        return res.status(400).json(unifiedResponse(400, "validation error", errors));
      }
      var user = await clerkService.getuserbyemail(value.email);
      if (user) {
        var samePassword = await bcrypt.compare(value.password, user.password);
        if (samePassword) {
          var userPermissions = await roleService.getPermisssionsService(user.role_id);
          const claims = {
            id: user.clerk_id,
            email: user.email,
            name: user.name,
            user_type: 'admin',
            role_id: user.role_id,
            role_name: userPermissions.name,
            permissions: userPermissions.permissions
          }

          var token = await jsonwebtoken.signToken({ claims });
          return res.status(201).json(unifiedResponse(201, "clerk logged in successfully", token))
        }
      }
      return res.status(401).json(unifiedResponse(401, "email or password is not correct", null))

    } catch (err) {
      handleError(res, err);
    }
  })


  router.post("/password/reset", userTypeAccessMiddleware("admin"), async (req, res, next) => {
    try {
      var authUserId = req.data.id;
      if (authUserId) {
       var user= await clerkService.getuserbyemail(req.data.email);
       var randomPassword=Math.random().toString(36).slice(-8);
       var hashedPassword=await bcrypt.hash(randomPassword,10);
       user.password=hashedPassword;
       var result= await clerkService.updateUser(authUserId,user);
        await sendEmail(user.email, "Password Reset", `Your new password is: ${randomPassword}`);
       return res.status(201).json(unifiedResponse(201, "password changed successfully", result))

      } else {
        return res.status(401).json(unifiedResponse(401, "user is not logged in", null))
      }

    } catch (err) {
      handleError(res, err);
    }

  })


  return router;
})();