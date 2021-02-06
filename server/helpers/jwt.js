const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET);
}

module.exports = {
  generateToken,
  verifyToken
}