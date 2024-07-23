import { Request, Response, NextFunction } from "express";
import tokenService from "../services/token.service";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";



const authenticateToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Access Denied");
    }
    const authenticatedToken = tokenService.verifyToken(token);
    if (typeof authenticatedToken === "object") {
        console.log("at", authenticatedToken);
        req.userId = ((authenticatedToken as { decoded: any }).decoded.sub);
        next();
    }

});


export default authenticateToken;