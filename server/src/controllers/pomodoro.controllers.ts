import { Request, Response } from "express";
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import pomodoroService from '../services/pomodoro.service';
import ApiError from '../utils/ApiError';


interface AuthenticadedRequest extends Request {
    userId?: string;
}


const createPomodoro = catchAsync(async (req: AuthenticadedRequest, res: Response) => {
    const pomodoro = await pomodoroService.createPomodoro(req.userId , req.body);
    res.status(httpStatus.CREATED).json(pomodoro);
});

const getPomodoros = catchAsync(async (req: AuthenticadedRequest, res: Response) => {
    const pomodoros = await pomodoroService.getPomodoros(req.userId);
    res.json(pomodoros);
});

const getPomodoroById = catchAsync(async (req: Request, res: Response) => {
    const pomodoro = await pomodoroService.getPomodoroById(req.params.pomodoroId);
    if (!pomodoro) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Pomodoro not found');
    }
    res.json(pomodoro);
});

const updatePomodoro = catchAsync(async (req: Request, res: Response) => {
    const pomodoro = await pomodoroService.updatePomodoro(req.params.pomodoroId, req.body);
    res.json(pomodoro);
});

const deletePomodoro = catchAsync(async (req: Request, res: Response) => {
    const pomodoro = await pomodoroService.deletePomodoro(req.params.pomodoroId);
    if (!pomodoro) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Pomodoro not found');
    }
    return res.json("Pomodoro deleted");
});

export  default{
    createPomodoro,
    getPomodoros,
    getPomodoroById,
    updatePomodoro,
    deletePomodoro,
};