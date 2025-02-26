import {Request, Response, NextFunction} from 'express';

export const CatchAsyncError = (theFunc: (req: Request, res: Response, next: NextFunction) => Promise<void> | void) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      Promise.resolve(theFunc(req, res, next)).catch(next);  // Catches errors and forwards to the next middleware (error handler)
    };
  };
