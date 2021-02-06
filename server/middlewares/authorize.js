const { Todo } = require('../models/index');

async function authorize(req, res, next) {
  let id = +req.params.id;
  try {
    const list = await Todo.findByPk(id);
    if (list) {
      let UserId = +req.decoded.id;
      if (list.UserId === UserId) {
        next();
      } else {
        throw {
          name: 'CustomError',
          msg: 'Not Authorized!',
          status: 400
        }
      }
    } else {
      throw {
        name: 'CustomError',
        msg: 'ID not found!',
        status: 404
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authorize
}