import { AnyArray } from 'mongoose';
import Todo from '../models/todo.model';
import { ITodoDocument } from '../models/todo.model';

interface ITodoService {
    createTodo(userId: string ,todoData: any ): Promise<ITodoDocument>;
    getTodosByUserId(userId: string): Promise<[ITodoDocument]>;
    updateTodo(todoData: ITodoDocument): Promise<ITodoDocument>;
    deleteTodo(todoId: string): Promise<void>;}

class TodoServiceCLass implements ITodoService { 
    async createTodo(userId : string,todoData: any): Promise<ITodoDocument> {
        todoData.userId = userId;
        return await Todo.create(todoData);
    }
    async getTodosByUserId (userId: string): Promise<[ITodoDocument]> {
        return await Todo.find({ userId }) as [ITodoDocument];
    }
    async updateTodo( todoData: any): Promise<ITodoDocument> {
        const todoId = todoData.todoId;
        return await Todo.findByIdAndUpdate(todoId, todoData, { new: true });
    }
    async deleteTodo(todoId: string): Promise<void> {
         await Todo.findByIdAndDelete(todoId);
    }
}

const TodoService: ITodoService = new TodoServiceCLass()

export default TodoService;