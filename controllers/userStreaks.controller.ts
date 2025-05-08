import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import UserStreak from "../models/userStreak";
interface CustomRequest extends Request {
    user?: any;
  }

export const getUserStreak = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as CustomRequest).user?.id;

      const streak = await UserStreak.findAll({
        where: {
          userId,
        },
      });

      res.status(200).json({
        success: true,
        streak,
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);