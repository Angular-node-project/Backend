const Role = require("../models/role.model");
const Clerk = require("../models/clerk.model");
const { unifiedResponse } = require("../utils/responseHandler");

const authorizationMiddleware = (controller, action) => {
  return async (req, res, next) => {
    try {
      const clerk = await Clerk.findOne({ clerk_id: req.data.id });
      if (!clerk) {
        return res.status(403).json(unifiedResponse(403, "User not found", null));
      }

      const role = await Role.findOne({ role_id: clerk.role_id });
      if (!role) {
        return res.status(403).json(unifiedResponse(403, "Role not found", null));
      }

      if (role.name === "super_admin") {
        return next();
      }
      const hasPermission = role.permissions.some(
        (perm) => perm.controller === controller && perm.action === action
      );

      if (!hasPermission) {
        return res.status(403).json(unifiedResponse(403, "Access Denied", null));
      }

      next();
    } catch (error) {
      return res.status(500).json(unifiedResponse(500, "Internal Server Error", null));
    }
  };
};

module.exports = { authorizationMiddleware };
