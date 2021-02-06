const { verifyToken } = require('../helpers/jwt');

const authenticate = function (req, res, next) {
  try {
    const access_token = req.headers.access_token;
    const decoded = verifyToken(access_token);
    req.decoded = decoded;
    next();
  } catch (err) {
    let error = {
      name: 'CustomError',
      msg: 'Invalid token',
      status: 401
    }
    next(error);
  }
}

module.exports = {
  authenticate
}