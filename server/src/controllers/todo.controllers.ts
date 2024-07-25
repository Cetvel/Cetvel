import { Request, Response } from 'express';

import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import TodoService from '../services/todo.service';
import ApiError from '../utils/ApiError';

interface AuthenticatedRequest extends Request {
    userId?: string;
}


const createTodo = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const todo = await TodoService.createTodo(req.userId, req.body);
    if (!todo) throw new ApiError(httpStatus.BAD_REQUEST, 'Todo not created');
    res.status(httpStatus.CREATED).send(todo);
});

const getTodos = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const todos = await TodoService.getTodosByUserId(req.userId!);
    if (!todos) throw new ApiError(httpStatus.NOT_FOUND, 'Todos not found');
    res.status(httpStatus.OK).send(todos);
});

const updateTodo = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const todo = await TodoService.updateTodo( req.body);
    if (!todo) throw new ApiError(httpStatus.BAD_REQUEST, 'Todo not updated');
    res.send(todo);
})

const deleteTodo = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    await TodoService.deleteTodo(req.body.todoId);
    res.status(httpStatus.NO_CONTENT).redirect('/');
})

export default {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}