import { Request, Response, NextFunction } from "express";
import tokenService from "../services/token.service";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

const authenticateToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    //bu adam token uertiyor.
    const authenticatedToken = tokenService.verifyToken(token);
    
    if (authenticatedToken.error?.type === "expired") {
        return res.redirect("/auth/refresh-token");
        // throw new ApiError(httpStatus.UNAUTHORIZED, authenticatedToken.error?.message || "Unauthorized");
    } else if (authenticatedToken.error?.type === "invalid") {
        return res.redirect("/login");
    }

    req.userId = authenticatedToken.decoded?.sub; 
     next();
});

export default authenticateToken;
