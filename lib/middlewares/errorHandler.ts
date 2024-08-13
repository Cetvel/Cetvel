import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error: ', err);
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        const statusCode = err.status || 500;
        const message = err.message || 'Internal Server Error';
        res.status(statusCode).json({
            success: false,
            status: statusCode,
            message: message
        });
    }
};

export default errorHandler;

