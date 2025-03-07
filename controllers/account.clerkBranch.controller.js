const { unifiedResponse, handleError } = require('../utils/responseHandler');
const bcrypt = require('bcrypt');
const { clerkBranchLoginDto } = require("../validators/clerkBranch.validator");
const jsonwebtoken = require("../utils/jwtToken");
const clerkBranchService = require('../services/clerkBranch.service');


module.exports = (() => {
  const router = require("express").Router();

  router.post('/login', async (req, res, next) => {
    try {
      const { error, value } = clerkBranchLoginDto.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map(e => e.message);
        return res.status(400).json(unifiedResponse(400, "validation error", errors));
      }
      var user = await clerkBranchService.getClerkByEmailService(value.email)

      if (user) {
        if (user.status != 'active') {
          return res.status(401).json(unifiedResponse(401, "you can not login ,please contact with super admin", null))

        }
        var samePassword = await bcrypt.compare(value.password, user.password);
        if (samePassword) {
          const claims = {
            id: user.clerkBranch_id,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
            branch: user.branch,
            user_type: 'clerkBranch'
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



  return router;
})(); 