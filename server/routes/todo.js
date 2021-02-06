const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { authenticate } = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

router.use(authenticate);
router.post('/', todoController.postTodo);
router.get('/', todoController.getTodo);
router.get('/:id', authorize, todoController.getTodoIdParams);
router.patch('/:id', authorize, todoController.updateStatusTodo);
router.put('/:id', authorize, todoController.updateTodo);
router.delete('/:id', authorize, todoController.deleteTodo);

module.exports = router;