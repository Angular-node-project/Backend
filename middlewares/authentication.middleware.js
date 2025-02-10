const { verifyToken, decodedToken } = require("../utils/jwtToken");
const { unifiedResponse, handleError } = require('../utils/responseHandler');

const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    verifyToken(token);
    const decoded = decodedToken({ token });
    req.data = decoded.payload;
    next();
  } catch (error) {
    return res.status(401).json(unifiedResponse(401, 'unauthenticated please login', null));
  }
};


const userTypeAccessMiddleware = (allowedUserType) => {
 return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json(unifiedResponse(401, 'unauthenticated please login', null));

    try {
      verifyToken(token);
      const decoded = decodedToken({ token });
      if (decoded.payload.user_type !== allowedUserType) {
        return res.status(401).json(unifiedResponse(401, 'Access denied', null));
      }
      req.data = decoded.payload;
      next();
    } catch (error) {
      return res.status(401).json(unifiedResponse(401, 'invalied token', null));
    }
  };
}

const optionalAuthMiddleWare = (allowedUserType) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        const decoded = decodedToken({ token });
        if (decoded.payload.user_type !== allowedUserType) {
          return res.status(403).json({ message: "Access Denied" });
        }
        req.data = decoded.payload;
      }
    } catch (error) {
      req.data = null;
    }
    next();
  }
}

module.exports = { authenticationMiddleware, userTypeAccessMiddleware, optionalAuthMiddleWare };