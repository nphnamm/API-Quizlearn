import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import db from "../models/index";
import UserProgress from "../models/userProgress";
const SessionHistory = db.SessionHistory;
const UserSession = db.UserSession;
const Set = db.Set;


interface CustomRequest extends Request {
  user?: any;
}

export const getUserStatsOfSet = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as CustomRequest).user?.id;
      if (!userId) {
        return next(new ErrorHandler("Please login to access this resource", 400));
      }

      const { id } = req.params;
      console.log('id', id);
      const learnHistory = await SessionHistory.findAll({
        where: {
          userId: userId,
          setId: id,
        },
        order: [['createdAt', 'ASC']],
      });
      console.log('learnHistory', learnHistory);
      if (!learnHistory) {
        res.status(200).json({
          success: false,
          message: "No history found"
        })
      }
      const testSession = learnHistory.filter((session: any) => session.sessionType === 'test').reduce((latest: any, current: any) => {
        //Compare by `completedAt` to find the most recent on
        return !latest || new Date(current.completedAt) > new Date(latest.completedAt) ? current : latest;
      }, null);

      console.log('testSession', testSession);
      if (testSession) {
        const allCompletedCards = await UserProgress.findAll({
          where: {
            sessionId: testSession.sessionId,
          }
        })
        testSession.dataValues.allCompletedCards = allCompletedCards;
        console.log('allCardsLearned', allCompletedCards);
        res.status(200).json({
          success: true,
          testSession

        })
      }

      const sessionTypes = [
        'write', 'multi-choice', 'fill-in', 'drag-and-drop', 'true-false', 'matching', 'flashcard', 'test'
      ];

      const learnSession = learnHistory.filter((session: any) => session.sessionType !== 'test').reduce((latest: any, current: any) => {
        //Compare by `completedAt` to find the most recent on
        return !latest || new Date(current.completedAt) > new Date(latest.completedAt) ? current : latest;
      }, null);

      if (learnSession) {
        const allCompletedCards = await UserProgress.findAll({
          where: {
            sessionId: learnSession.sessionId,
          }
        })
        learnSession.dataValues.allCompletedCards = allCompletedCards;

        console.log('allCardsLearned', allCompletedCards);
        res.status(200).json({
          success: true,
          learnSession
        })
      }
      console.log('learnSession', learnSession);


      // const learnHistory =await UserSession.findOne(
      //   {
      //     where:{
      //     userId: userId,
      //     setId: id,
      //     completed:true,          
      //   },
      //   order:[['updatedAt','DESC']]
      // })


    } catch (error: any) {
      console.log('error', error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getStudyingSets = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as CustomRequest).user?.id;
      console.log('iiii', userId)

      if (!userId) {
        return next(new ErrorHandler("Please login to access this resource", 400));
      }
      const studyingSets = await UserSession.findAll({
        where: {
          userId,
          completed: false
        },
        include: [
          {
            model: Set,
            as: 'set',
            attributes: ['id', 'title', 'description'] // Changed 'name' to 'title'
          }
        ],
        logging: console.log // Logs the SQL query

      })
      if (!studyingSets) {
        return next(new ErrorHandler("No studying sets found", 400));
      }

      res.status(200).json({
        success: true,
        studyingSets
      })

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getRecentSets = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as CustomRequest).user?.id;
      if (!userId) {
        return next(new ErrorHandler("Please login to access this resource", 400));
      }
      console.log('iiii', userId)
      const recentSets = await UserSession.findAll({
        where: {
          userId,
          completed: true,
        }
      })
      if (!recentSets) {
        return next(new ErrorHandler("No recent sets found", 400));
      }

      res.status(200).json({
        success: true,
        recentSets
      })

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// export const addXP = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = (req as CustomRequest).user?.id;
//       const { amount } = req.body;

//       if (!userId) {
//         return next(new ErrorHandler("Please login to access this resource", 400));
//       }

//       if (!amount || typeof amount !== 'number' || amount <= 0) {
//         return next(new ErrorHandler("Invalid XP amount", 400));
//       }

//       await userStatsService.addXP(userId, amount, res);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

// export const updateStreak = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = (req as CustomRequest).user?.id;
//       if (!userId) {
//         return next(new ErrorHandler("Please login to access this resource", 400));
//       }

//       await userStatsService.updateStreak(userId, res);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

// export const addCoins = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = (req as CustomRequest).user?.id;
//       const { amount } = req.body;

//       if (!userId) {
//         return next(new ErrorHandler("Please login to access this resource", 400));
//       }

//       if (!amount || typeof amount !== 'number' || amount <= 0) {
//         return next(new ErrorHandler("Invalid coin amount", 400));
//       }

//       await userStatsService.addCoins(userId, amount, res);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

// export const addBadge = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = (req as CustomRequest).user?.id;
//       const { badgeId } = req.body;

//       if (!userId) {
//         return next(new ErrorHandler("Please login to access this resource", 400));
//       }

//       if (!badgeId || typeof badgeId !== 'string') {
//         return next(new ErrorHandler("Invalid badge ID", 400));
//       }

//       await userStatsService.addBadge(userId, badgeId, res);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

// export const removeBadge = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = (req as CustomRequest).user?.id;
//       const { badgeId } = req.body;

//       if (!userId) {
//         return next(new ErrorHandler("Please login to access this resource", 400));
//       }

//       if (!badgeId || typeof badgeId !== 'string') {
//         return next(new ErrorHandler("Invalid badge ID", 400));
//       }

//       await userStatsService.removeBadge(userId, badgeId, res);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

// export const spendCoins = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = (req as CustomRequest).user?.id;
//       const { amount } = req.body;

//       if (!userId) {
//         return next(new ErrorHandler("Please login to access this resource", 400));
//       }

//       if (!amount || typeof amount !== 'number' || amount <= 0) {
//         return next(new ErrorHandler("Invalid coin amount", 400));
//       }

//       await userStatsService.spendCoins(userId, amount, res);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );