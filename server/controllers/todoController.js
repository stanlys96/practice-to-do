const { Todo } = require('../models/index');

class todoController {
  static async postTodo(req, res, next) {
    let { title, description, status, due_date } = req.body;
    let UserId = req.decoded.id;
    try {
      let newTodo = await Todo.create({ title, description, status, due_date, UserId });
      res.status(201).json(newTodo);
    } catch (err) {
      next(err);
    }
  }

  static async getTodo(req, res, next) {
    let UserId = req.decoded.id;
    try {
      let lists = await Todo.findAll({ order: [['id', 'asc']], where: { UserId } });
      res.status(200).json(lists);
    } catch (err) {
      next(err);
    }
  }

  static async getTodoIdParams(req, res, next) {
    let id = +req.params.id;
    try {
      let list = await Todo.findOne({ where: { id } });
      if (list) res.status(200).json(list);
      throw {
        name: 'CustomError',
        msg: 'ID not found!',
        status: 404
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateTodo(req, res, next) {
    let { title, description, status, due_date } = req.body;
    let id = +req.params.id;
    due_date = new Date(due_date);
    try {
      let updatedList = await Todo.update({
        title,
        description,
        status,
        due_date
      }, {
        where: {
          id
        },
        returning: true
      });
      if (updatedList[0] !== 0) res.status(200).json(updatedList[1][0]);
      throw {
        name: 'CustomError',
        msg: 'ID not found!',
        status: 404
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateStatusTodo(req, res, next) {
    let id = +req.params.id;
    let { status } = req.body;
    try {
      let updatedList = await Todo.update({ status }, { where: { id }, returning: true });
      if (updatedList[0] !== 0) res.status(200).json(updatedList[1][0]);
      throw {
        name: 'CustomError',
        msg: 'ID not found!',
        status: 404
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteTodo(req, res, next) {
    let id = +req.params.id;
    try {
      let list = await Todo.findByPk(id);
      if (list) {
        Todo.destroy({ where: { id: list.id } })
        res.status(200).json({ data: list, message: 'Todo success to delete!' });
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
}

module.exports = todoController;