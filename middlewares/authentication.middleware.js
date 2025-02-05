const { verifyToken, decodedToken } = require("../utils/jwtToken");
const { unifiedResponse, handleError } = require('../utils/responseHandler');

const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    verifyToken(token);
    const decoded = decodedToken({ token });
    req.data= decoded.payload;
    next();
  } catch (error) {
    return res.status(401).json(unifiedResponse(401, 'unauthenticated please login', null));
  }
};

module.exports = authenticationMiddleware;