require("dotenv").config();
import { Response } from "express";
import { redis } from "./redis";
import { User } from "../models/user";

interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}


// parse enviroment variables to integrates with fallback values
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
const refreshTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "1200", 10);

// option for cookies
export const accessTokenOptions: ITokenOptions = {
    
    expires: new Date(Date.now() + accessTokenExpire * 3 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 3 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
}

export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
}

export const sendToken = (user: User, statusCode: number, res: Response) => {
    console.log('1',accessTokenExpire)    
    console.log('2',refreshTokenExpire)

    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // upload session to redis
    redis.set(user.id as any, JSON.stringify(user) as any);


    //only set secure to true in production
    if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true;
        refreshTokenOptions.secure =true;
    }

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success: true,
        user,
        refreshToken,
        accessToken
    })

}

