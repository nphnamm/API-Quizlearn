import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "./CatchAsyncError";
// authenticated user
import db from "../models/index";
const User = db.User;

interface CustomRequest extends Request {
    user?: any;
  }
export const isAuthenticated = CatchAsyncError(async(req: CustomRequest, res: Response, next: NextFunction)=>{
    const access_token = req.cookies.access_token as string;
    if(!access_token){
        return next(new ErrorHandler("Please login to access this resource",400));

    } 
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if(!decoded){
        return next(new ErrorHandler("access token is not valid",400));

    }
    const user = await redis.get(decoded.id);

    if(!user){
        return next(new ErrorHandler("User not found",404));

    }
    
    req.user = JSON.parse(user);
    
    next();

});

//validate user role 
// export const authorizeRoles = (...roles:string[]) =>{
//     return (req: Request, res: Response, next: NextFunction)=>{{
//         if(!roles.includes(req?.user?.roleId || "")){
//             return next(new ErrorHandler(`Role: ${req?.user?.roleId} is not allowed to access this resource`,403));
//         }
//         next();
//     }}
// }


