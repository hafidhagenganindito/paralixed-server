const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
// ngebuat token
const signToken = (payload) => {
  return jwt.sign(payload, secret);
};

// verify token atau utk cek token tsb benar atau g
const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  signToken,
  verifyToken,
};
