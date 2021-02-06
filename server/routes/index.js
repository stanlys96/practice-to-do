const express = require('express');
const router = express.Router();
const todoRoutes = require('./todo');
const userRoutes = require('./user');

router.use('/todo', todoRoutes);
router.use('/user', userRoutes);

module.exports = router;