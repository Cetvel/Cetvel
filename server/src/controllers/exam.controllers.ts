import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import examService from '../services/exam.service';

interface AuthenticatedRequest extends Request {
    userId?: string;
}


const createExam = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const examType = req.path.split('/').pop();
    const newExam = await examService.createExam(req.userId, req.body, examType);
    res.status(httpStatus.CREATED).send(newExam);
});

const getExam = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const exam = await examService.getExamById(req.params.id);
    if (!exam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Sınav bulunamadı');
    }
    res.send(exam);
});

const getUserExams = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const exams = await examService.getUserExams(req.userId);
    res.send(exams);
});

const getUserExamsByType = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const exams = await examService.getUserExamsByType(req.userId, req.params.type);
    res.send(exams);
});

const updateExam = catchAsync(async (req: Request, res: Response) => {
    const exam = await examService.updateExam(req.params.examId, req.body);
    if (!exam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Sınav bulunamadı');
    }
    res.send(exam);
});

const deleteExam = catchAsync(async (req: Request, res: Response) => {
    const result = await examService.deleteExam(req.params.examId);
    if(result) return res.status(httpStatus.OK).send("deneme basari ile silindi");
    return res.status(httpStatus.NOT_FOUND).send("deneme silinemedi");
});

const getUserExamsByDateRange = catchAsync(async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;
    const exams = await examService.getUserExamsByDateRange(
        req.params.userId,
        new Date(startDate as string),
        new Date(endDate as string)
    );
    res.send(exams);
});


const getUserExamStatistics = catchAsync(async (req: Request, res: Response) => {
    const statistics = await examService.getUserExamStatistics(req.params.userId);
    res.send(statistics);
});

const compareUserExams = catchAsync(async (req: Request, res: Response) => {
    const { examId1, examId2 } = req.query;
    const comparison = await examService.compareUserExams(
        req.params.userId,
        examId1 as string,
        examId2 as string
    );
    res.send(comparison);
});

export default {
    createExam,
    getExam,
    getUserExams,
    getUserExamsByType,
    updateExam,
    deleteExam,
    getUserExamsByDateRange,
    getUserExamStatistics,
    compareUserExams
}