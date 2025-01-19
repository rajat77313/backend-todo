const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo-controller')

router.route('/getTodo').get(controller.getTodo)
router.route('/createtodo').post(controller.createtodo)
router.route('/deleteTodo/:id').post(controller.deleteTodo)
router.route('/updateTodo/:id').put(controller.updateTodo)
router.route('/isComplete').post(controller.isComplete)

module.exports = router;  