import { Request, Response, NextFunction } from "express";
import tokenService from "../services/token.service";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { jwtVerify } from 'jose';

interface AuthenticatedRequest extends Request {
    userId?: string;
}


const authenticateToken = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // const token = req.cookies.token;
    const token = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoieTZsdFRaOFRiR1lrcy1LVGlnVWpzenktN1U3NWRVM1h4dUVINHJBVzlpakh1V05BcVc1SUI5azI3Mk1kVzVPeC1tNVltZkhoTURaejVUMU1BM3FHbFEifQ..UXpw33C1McBEHAxhXdhYZg.lb_asztgd7-yeky1IoGVrKn-xxHNTljlIKhS4n6j0aKTvzXpMVElznl5TRFDnPztTCLsPQp8GCQZZVS_KLMZpSZixrf5ls66iOxAWNXsLqVXdeixaknYFvYeHaIUA-9BHWAMb_v6tSW6pz4GyKAfhsvOFCFy1jL2tRCiv9hN7P6C0xWsLz3wroAyuHFlHkgm4C_j6otKvbyP6E93F7bzAhGcrBDvaKJtUbinU8O7H60s5_mRMwu9xEWO03tH4MgXHuvXv2PacEOIPjpEQELf94xw-1TPkVg1-E3Cwpj_DPo.J2f7ypc_fW0EMWnsNxIb-cfGU8pD8gTX9_wKphsrb_o"
    if (!token) {
        return res.redirect("/login");
    }

    console.log(process.env.NEXTAUTH_SECRET)
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXTAUTH_SECRET));
    console.log(payload);
    if(!payload) {next()}
      

    // if (authenticatedToken.error?.type === "expired") {
    //     return res.redirect("/api/auth/refresh-token");
    //     // throw new ApiError(httpStatus.UNAUTHORIZED, authenticatedToken.error?.message || "Unauthorized");
    // } else if (authenticatedToken.error?.type === "invalid") {
    //     return res.redirect("/login");
    //     }

    // req.userId = authenticatedToken.decoded?.sub; 
      console.log("Authenticated Token: ", payload);
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
});

export default authenticateToken;
