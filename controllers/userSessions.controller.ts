import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import db from "../models/index";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
const UserSession = db.UserSession;
const UserProgress = db.UserProgress;
const Card = db.Card;
const SessionHistory = db.SessionHistory;

interface CustomRequest extends Request {
  user?: any;
}
// Create Folder
export const startOrResumeSession = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, setId, sessionType ,completed} = req.body;

      let session = await UserSession.findOne({
        where: { userId, setId, sessionType,completed },
      });

      if (!session) {
        const sessionId = uuidv4();
        session = await UserSession.create({
          id: sessionId,
          userId,
          setId,
          sessionType,
          completed: false,
        });
      }

      const answeredCards = await UserProgress.findAll({
        where: { sessionId: session.id },
        attributes: ["cardId", "timesAnswered", "isCorrect"],
      });
      // console.log("Answered Cards:", answeredCards.map((a: any) => a.toJSON())); // Debug log

      const answeredCardIds: number[] = answeredCards
        .filter((card: any) => card.isCorrect)
        .map((card: any) => card.cardId);
      // console.log("Answered Cards id:", answeredCardIds); // Debug log

      const remainingCards = await Card.findAll({
        where: { setId, id: { [Op.notIn]: answeredCardIds } },
      });
      // console.log("Remaining Cards:", remainingCards.map((c: any) => c.toJSON())); // Debug log
      // Gộp dữ liệu `timesAnswered` từ bảng `UserProgress`
      let result;
      if (answeredCards.length > 0) {
        result = remainingCards.map((card: any) => {
          const answeredCard = answeredCards.find(
            (p: any) => p.cardId === card.id
          );
          return {
            id: card.id,
            term: card.term,
            definition: card.definition,
            setId: card.setId,
            position: card.position,
            statusId: card.statusId,
            createdAt: card.createdAt,
            updatedAt: card.updatedAt,
            imageUrl: card.imageUrl,
            timesAnswered: answeredCard ? answeredCard.timesAnswered : 0,
          };
        });
      } else {
        result = remainingCards.map((card: any) => {
          return {
            id: card.id,
            term: card.term,
            definition: card.definition,
            setId: card.setId,
            position: card.position,
            statusId: card.statusId,
            imageUrl: card.imageUrl,
            createdAt: card.createdAt,
            updatedAt: card.updatedAt,
            timesAnswered: 0,
          };
        });
      }

      // Nếu không còn thẻ nào chưa được trả lời đúng, đánh dấu session hoàn thành
      if (remainingCards.length == 0) {
        await session.update({ completed: true });
      }

      res.json({
        sessionId: session.id,
        remainingCards: result,
        isCompleted: session.completed,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get all sets
// export const getMultipleChoices = CatchAsyncError(
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { setId, cardId } = req.params;

//             const card = await Card.findByPk(cardId);
//             if (!card) return res.status(404).json({ message: "Card not found" });

//             const wrongAnswers = await Card.findAll({
//                 where: { setId, id: { [Op.not]: cardId } },
//                 limit: 3
//             });

//             const choices = [...wrongAnswers.map((c: any) => c.definition), card.definition];
//             const shuffledChoices = choices.sort(() => Math.random() - 0.5);

//             return res.json({  // ✅ Thêm return
//                 question: card.term,
//                 choices: shuffledChoices,
//                 correctAnswer: card.definition
//             });
//         } catch (error: any) {
//             return next(new ErrorHandler(error.message, 500));
//         }
//     }
// );

export const getMultipleChoices = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { setId, cardId } = req.params;

      const card = await Card.findByPk(cardId);
      if (!card) return res.status(404).json({ message: "Card not found" });

      // Lấy 3 đáp án sai (các card khác trong cùng bộ)
      const wrongAnswers = await Card.findAll({
        where: { setId, id: { [Op.not]: cardId } },
        limit: 3,
      });

      // Tạo danh sách các lựa chọn (bao gồm cả đáp án đúng)
      const choices = [...wrongAnswers, card];

      // Trộn ngẫu nhiên danh sách lựa chọn
      const shuffledChoices = choices.sort(() => Math.random() - 0.5);

      return res.json({
        question: {
          id: card.id,
          term: card.term,
        },
        choices: shuffledChoices.map((c) => ({
          id: c.id,
          term: c.term,
          definition: c.definition,
        })),
        correctAnswerId: card.id,
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
        order: [["createdAt", "DESC"]],
      });
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
async function getRandomWrongDefinition(setId: string, excludeId: string) {
  const wrong = await Card.findOne({
    where: { setId, id: { [Op.not]: excludeId } },
    order: [db.sequelize.random()],
  });

  return wrong ? wrong.definition : "Unknown";
}

export const createOrResumeTestMode = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { setId } = req.params;
      const cards = await Card.findAll({
        where: { setId },
        order: [["position", "ASC"]],
      });
      const userId = (req as CustomRequest).user.id;

      if (!cards || cards.length === 0) {
        return next(new ErrorHandler("No cards found for this set", 404));
      }
      const generateTestType = () => {
        const types = ["write", "multi-choice", "yes-no"];
        return types[Math.floor(Math.random() * types.length)];
      };
      const questions = await Promise.all(
        cards.map(async (card: any) => {
          const type = generateTestType();
          if (type === "multi-choice") {
            const wrongAnswers = await Card.findAll({
              where: { setId, id: { [Op.not]: card.id } },
              limit: 3,
            });
            const choices = [...wrongAnswers, card].map((c) => ({
              id: c.id,
              definition: c.definition,
            }));
            const shuffledChoices = choices.sort(() => Math.random() - 0.5);
            return {
              id: card.id,
              term: card.term,
              type,
              choices: shuffledChoices,
            };
          } else if (type === "yes-no") {
            const isCorrect = Math.random() < 0.5;
            const displayedDefinition = isCorrect
              ? card.definition
              : await getRandomWrongDefinition(setId, card.id);
            return {
              id: card.id,
              term: card.term,
              type,
              definition: displayedDefinition,
              correctAnswer: isCorrect,
            };
          } else {
            //write
            return {
              id: card.id,
              term: card.term,
              type,
              correctAnswer: card.definition,
            };
          }
        })
      );
      const existSession = await UserSession.findOne({
        where: {
          userId,
          setId,
          sessionType: "test",
          completed: false,
        },
      });

      if (!existSession) {
        const sessionId = uuidv4();
        const session = await UserSession.create({
          id: sessionId,
          userId,
          setId,
          sessionType: "test",
          completed: false,
        });

        return res.status(200).json({
          success: true,
          testMode: true,
          questions,
          sessionId,
        });
      }

      return res.status(200).json({
        success: true,
        testMode: true,
        questions,
        sessionId: existSession.id,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const finishTest = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      sessionId,
      score,
      correctCount,
      incorrectCount,
      totalQuestions,
      detailedResults,
    } = req.body;


    const userId = (req as CustomRequest).user.id;
    const session = await UserSession.findByPk(sessionId);
    if (!session) {
      return next(new ErrorHandler("Session not found", 404));
    }

    // Mark the session as completed
    session.completed = true;
    await session.save();

    // Save session history
    const history = await SessionHistory.create({
      id: uuidv4(),
      sessionId,
      userId,
      setId: session.setId,
      sessionType: 'test',
      totalCards: totalQuestions,
      correctAnswers: correctCount,
      wrongAnswers: incorrectCount,
      score:score
    });
    // Create or update UserProgress for each answered card
    for (const result of detailedResults) {
      const { questionId, correct } = result;

      // Check if progress already exists
      const existingProgress = await UserProgress.findOne({
        where: {
          sessionId,
          cardId: questionId,
        },
      });

      if (existingProgress) {
        // Update if already exists
        await existingProgress.update({
          timesAnswered: existingProgress.timesAnswered + 1,
          isCorrect: correct,
        });
      } else {

        await UserProgress.create({
          id: uuidv4(),
          sessionId,
          cardId: questionId,
          userId,
          isCorrect: correct,
          timesAnswered: 1,
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: "Session completed, progress saved",
      sessionHistory: history,
    });

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});
