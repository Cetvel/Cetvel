import jwt from "jsonwebtoken";
import moment from "moment";

interface IDecodedToken {
    sub: string;
    iat: number;
    exp: number;
}

interface VerifyResult {
    valid: boolean;
    decoded?: IDecodedToken;
    error?: {
        type: 'expired' | 'invalid';
        message: string;
    };
}

interface ITokenService {
    generateToken(userId: string): { accessToken: string; refreshToken: string };
    verifyToken(token: string): VerifyResult;
    generateAuthTokens(user: any): { accessToken: string; refreshToken: string };
}

class TokenServiceClass implements ITokenService {
    generateToken = (userId: string) => {
        const accessTokenPayload = {
            sub: userId,
            iat: moment().unix(),
            exp: moment().add(10, "minutes").unix(), // Access token süresi 10 dakika
        };
        const refreshTokenPayload = {
            sub: userId,
            iat: moment().unix(),
            exp: moment().add(1, "week").unix(), // Refresh token süresi 1 hafta
        };
        return {
            accessToken: jwt.sign(accessTokenPayload, process.env.TOKEN_SECRET!),
            refreshToken: jwt.sign(refreshTokenPayload, process.env.TOKEN_SECRET!)
        }
    };

    verifyToken = (token: string): VerifyResult => {
        
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as IDecodedToken;
            return {
                valid: true,
                decoded
            };
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return {
                    valid: false,
                    error: {
                        type: 'expired',
                        message: `token süresi dolmuş.`
                    }
                };
            } else if (error instanceof jwt.JsonWebTokenError) {
                return {
                    valid: false,
                    error: {
                        type: 'invalid',
                        message: `GECERSIZ token.`
                    }
                };
            } else {
                return {
                    valid: false,
                    error: {
                        type: 'invalid',
                        message: ` token doğrulama hatası.`
                    }
                };
            }
        }
    }
   
    generateAuthTokens = (user: any) => {
        return this.generateToken(user._id);
    };
}

const TokenService: ITokenService = new TokenServiceClass();
export default TokenService;