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

const optionalAuthMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if(authHeader){
      const token=authHeader.split(" ")[1];
      const decoded=decodedToken({token});
      req.data=decoded.payload;
    }
  } catch (error) {
    req.data = null;
  }
  next();
}

module.exports = {authenticationMiddleware,optionalAuthMiddleWare};