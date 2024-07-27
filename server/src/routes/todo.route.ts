import express from 'express';
const router = express.Router();

import todoController from '../controllers/todo.controllers';
import authenticateToken from '../middlewares/authenticateToken';
import validate from '../middlewares/validate';
import todoValidation from '../middlewares/validations/todo.validation';

router.get('/getTodos', authenticateToken, todoController.getTodos);
router.post('/create', authenticateToken, validate(todoValidation.createTodo), todoController.createTodo);
router.put('/update/:todoId', authenticateToken, validate(todoValidation.updateTodo), todoController.updateTodo);
router.delete('/delete/:todoId', authenticateToken, validate(todoValidation.deleteTodo) ,todoController.deleteTodo);

export default router;