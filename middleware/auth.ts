import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import ErrorHandler from "../utils/errorHandler";
import { CatchAsyncError } from "./CatchAsyncError";
// authenticated user
import db from "../models/index";
const User = db.User;
const Role = db.Role;
import { UnauthorizedError } from "../utils/errors";

interface CustomRequest extends Request {
  user?: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        roleId: string;
      };
    }
  }
}

export const isAuthenticated = CatchAsyncError(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }
    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    // console.log(
    //   "Token valid. Expires at:",
    //   new Date(decoded?.exp * 1000).toLocaleString()
    // );

    if (!decoded) {
      return next(new ErrorHandler("access token is not valid", 400));
    }
    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = JSON.parse(user);

    next();
  }
);

//validate user role
export const authorizeAdminRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    if (!access_token) {
      return next(new ErrorHandler("Please login to access this resource", 400));
    }
    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    const user = await redis.get(decoded.id);
    const userData = user ? JSON.parse(user) : null;
    const roleAdmin = await Role.findOne({ where: { name: "Admin" } });
    console.log('111',userData?.roleId, roleAdmin?.id);
    if (userData?.roleId !== roleAdmin?.id) {
      return next(new ErrorHandler(`Role: ${userData?.roleId} is not allowed to access this resource`, 403));
    }
    next();
  }
);

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Access token is required");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN || "") as {
      id: string;
      email: string;
      roleId: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError("Invalid token"));
    } else {
      next(error);
    }
  }
};
