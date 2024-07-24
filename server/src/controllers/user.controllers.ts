import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import UserService from '../services/user.service';
import ApiError from '../utils/ApiError';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.userId!);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.status(httpStatus.OK).send(user);
})


const updateUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.updateUserById(req.userId!, req.body);
    res.send(user);
});

const updateUserPassword = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.updateUserPassword(req.userId!, req.body.currentPassword, req.body.newPassword);
    res.send(user);
})

const updateUserEmail = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.updateUserEmail(req.userId!, req.body.email, req.body.password);
    res.send(user);
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    await UserService.deleteUserById(req.userId!);
    res.status(httpStatus.NO_CONTENT).redirect('/');
});

export default {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    updateUserPassword,
    updateUserEmail
}