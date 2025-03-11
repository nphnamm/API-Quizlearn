import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import db from "../models/index";
import { v4 as uuidv4 } from 'uuid';
import { Op } from "sequelize";
const UserSession = db.UserSession;
const UserProgress = db.UserProgress;
const Card = db.Card;

interface CustomRequest extends Request {
    user?: any;
}
// Create Folder
export const startOrResumeSession = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, setId } = req.body;

            let session = await UserSession.findOne({ where: { userId, setId } });

            if (!session) {
                const sessionId =  uuidv4();
                session = await UserSession.create({id:sessionId, userId, setId, completed: false });
            }

            const answeredCards = await UserProgress.findAll({
                where: { sessionId: session.id,isCorrect:true },
                attributes: ["cardId"],
            });
            // console.log('answeredCard',answeredCards)
            const answeredCardIds: number[] = answeredCards.map((p: { cardId: number }) => p.cardId);

            // console.log("answeredCardIds",answeredCardIds)
            const remainingCards = await Card.findAll({
                where: { setId, id: { [Op.notIn]: answeredCardIds } },
            });
            console.log('remainingCards',remainingCards)
            if(remainingCards.length === 0) {
                session.update({completed:true});
            }

            res.json({ sessionId: session.id, remainingCards, isCompleted:session.completed});
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// Get all sets 
export const getMultipleChoices = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { setId, cardId } = req.params;

            const card = await Card.findByPk(cardId);
            if (!card) return res.status(404).json({ message: "Card not found" });

            const wrongAnswers = await Card.findAll({
                where: { setId, id: { [Op.not]: cardId } },
                limit: 3
            });

            const choices = [...wrongAnswers.map((c: any) => c.definition), card.definition];
            const shuffledChoices = choices.sort(() => Math.random() - 0.5);

            return res.json({  // ✅ Thêm return
                question: card.term,
                choices: shuffledChoices,
                correctAnswer: card.definition
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
//Get Card by FolderId
export const getCardBySetId = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const sets = await Card.findAll({
                where: { setId: id },
                order: [["createdAt", "DESC"]]
            })
            if (!sets) {
                return next(new ErrorHandler("Folder not found", 404));
            }

            res.status(200).json({ success: true, sets });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// // Get Folder by ID
// export const getSetByUserId = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req.params;
//       const userId = (req as CustomRequest).user.id;
//       const folders  = await Card.findAll({
//         where: {userId},
//         order:[["createdAt","DESC"]]
//       })
//       if (!folders) {
//         return next(new ErrorHandler("Folder not found", 404));
//       }

//       res.status(200).json({ success: true, folders });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

// Update Card
export const updateCard = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { term, setId, definition, position, statusId } = req.body;

            const card = await Card.findByPk(id);

            if (!card) {
                return next(new ErrorHandler("Folder not found", 404));
            }

            card.term = term ?? card.term;
            card.definition = definition ?? card.definition;
            card.setId = setId ?? card.setId;
            card.statusId = statusId ?? card.statusId;
            card.position = position ?? card.position;

            await card.save();

            res.status(200).json({ success: true, card });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// // // Delete Folder
// // export const deleteFolder = CatchAsyncError(
// //   async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //       const { id } = req.params;
// //       const folder = await Folder.findByPk(id);

// //       if (!folder) {
// //         return next(new ErrorHandler("Folder not found", 404));
// //       }

// //       await folder.destroy();

// //       res.status(200).json({ success: true, message: "Folder deleted" });
// //     } catch (error: any) {
// //       return next(new ErrorHandler(error.message, 500));
// //     }
// //   }
// // );
