import jwt from "jsonwebtoken";
import moment from "moment";


interface IDecodedToken {
    id: string;
    iat: number;
    exp: number;
}

interface ITokenService {
    generateToken(userId: string): object;
    verifyToken(token: string): string | object;
    generateAuthTokens(user: any): object
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
            accessToken: jwt.sign(accessTokenPayload, process.env.ACCESS_TOKEN_SECRET!),
            refreshToken: jwt.sign(refreshTokenPayload, process.env.REFRESH_TOKEN_SECRET!)
        }
    };
    verifyToken = (token: string) => {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as IDecodedToken;
        return {
            valid: true,
            decoded
        }
    }
    
    generateAuthTokens = (user: any) => {
        console.log(user);
        const {accessToken , refreshToken}= this.generateToken(user._id);// user._id nasil calisiyor bir fikrim yok.
        return { accessToken , refreshToken};
    };
}

const TokenService: ITokenService = new TokenServiceClass();


export default TokenService;