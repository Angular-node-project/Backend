const jwt = require("jsonwebtoken");
const {APP_CONFIG}=require("../config/app.config");

// sign token

module.exports.signToken = ({ claims }) => {
  return jwt.sign(claims,APP_CONFIG.JWT_SECRET, {
    expiresIn: APP_CONFIG.JWT_EXPIRY|| "1d",
  });
};

// verify token
module.exports.verifyToken = (token) => {
  return jwt.verify(token, APP_CONFIG.JWT_SECRET);
};

// decode token
module.exports.decodedToken = ({token}) => {
  return jwt.decode(token, { complete: true });
};