import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import userService from "../services/user.service";
import tokenService from "../services/token.service";


const register = catchAsync(async (req: Request, res: Response) => {
    const createdUser = await userService.createUser(req.body);
    const user =await AuthService.loginUserWithEmailAndPassword(createdUser.email, createdUser.password);
    const tokens = tokenService.generateAuthTokens(user) as { accessToken: string, refreshToken: string };
    AuthService.setCookies(res, tokens);
    res.status(httpStatus.CREATED).send( user );
});

const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await AuthService.loginUserWithEmailAndPassword(email, password);
    const tokens = tokenService.generateAuthTokens(user) as { accessToken: string, refreshToken: string };
    AuthService.setCookies(res, tokens);
    console.log(tokens);
    res.status(httpStatus.CREATED).send({ user, tokens });
})

const logout = catchAsync(async (req: Request, res: Response) => { 
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.redirect("/login");
});
const refreshTokens = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await AuthService.refreshAuth(refreshToken);
    if (typeof result === "string") {
        res.cookie("token", result, { httpOnly: true });
        return res.status(httpStatus.CREATED).send({ accessToken: result });
    }
    res.redirect(result.redirect);
});
const forgotPassword = catchAsync(async (req: Request, res: Response) => { });
const resetPassword = catchAsync(async (req: Request, res: Response) => { });
const sendVerificationEmail = catchAsync(async (req: Request, res: Response) => { });
const verifyEmail = catchAsync(async (req: Request, res: Response) => { });




export default {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
}