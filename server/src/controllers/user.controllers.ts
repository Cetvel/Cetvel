import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import UserService from '../services/user.service';


const createUser = catchAsync(async (req:Request, res:Response) => {
    const user = await UserService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getUsersInfo = catchAsync(async (req:Request, res:Response) => {
    console.log(req.userId);
    const user = await UserService.getUserById(req.userId!);
    res.status(httpStatus.OK).send(user);
})

export default {
    createUser,
    getUsersInfo
}