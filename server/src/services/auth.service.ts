import userService from "./user.service";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import TokenService from "./token.service";
import { Response } from "express";


interface IAuthService {
    loginUserWithEmailAndPassword(email: string, password: string): Promise<any>;
    logout(refreshToken: string): Promise<void>;
    refreshAuth(refreshToken: string): Promise<any>;
    resetPassword(resetPasswordToken: string, newPassword: string): Promise<void>;
    verifyEmail(verifyEmailToken: string): Promise<void>;
    setCookies(res: Response, tokens: any): void;
}

class AuthServiceClass implements IAuthService {
    async loginUserWithEmailAndPassword(email: string, password: string): Promise<any> {
        const user = await userService.getUserByEmail(email);
        const result = await user.isPasswordMatch(password)
        if (!user || !(await user.isPasswordMatch(password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
        }
        return user;
    }
    async logout(refreshToken: string): Promise<void> {/** Refresh tokenlari blackliste alma yapilabilir.  */ }
    async refreshAuth(refreshToken: string): Promise<any> {
        //!Bu kisma saglam bir ayar lazim. Geri gelinecek

        const authenticatedTRefreshToken = TokenService.verifyToken(refreshToken);

        if (authenticatedTRefreshToken.error) {
            return { redirect: "/login" };
            // throw new ApiError(httpStatus.UNAUTHORIZED, authenticatedTRefreshToken.error?.message || "Unauthorized");
        }

        const userId = authenticatedTRefreshToken.decoded?.sub
        if (userId == undefined) return { redirect: "/login" };

        const user = await userService.getUserById(userId);
        if (!user) return { redirect: "/login" };
        const tokens = TokenService.generateAuthTokens(user)
        return tokens.accessToken
            ;
    }
    async resetPassword(resetPasswordToken: string, newPassword: string): Promise<void> { }
    async verifyEmail(verifyEmailToken: string): Promise<void> { }
    async checkUser(email: string, password: string): Promise<any> { }
    setCookies(res: Response, tokens: any): void {
        res.cookie("token", tokens.accessToken, { httpOnly: true });
        res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
    }
}

// Tip kontrolü
const AuthService: IAuthService = new AuthServiceClass();
export default AuthService;