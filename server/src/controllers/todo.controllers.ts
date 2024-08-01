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
    if (!todo) throw new ApiError(httpStatus.BAD_REQUEST, 'Todo oluşturulamadı');
    res.status(httpStatus.CREATED).send(todo);
});

const getTodos = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const todos = await TodoService.getTodosByUserId(req.userId!);
    if (!todos) throw new ApiError(httpStatus.NOT_FOUND, 'Todolar bulunamadı');
    res.status(httpStatus.OK).send(todos);
});

const updateTodo = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const todo = await TodoService.updateTodo( req.params.todoId ,req.body);
    if (!todo) throw new ApiError(httpStatus.BAD_REQUEST, 'Todo güncellenemedi');
    res.send(todo);
})

const deleteTodo = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    await TodoService.deleteTodo(req.params.todoId );
    res.status(httpStatus.NO_CONTENT).send("Todo silindi");
})

export default {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}