import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Import models - these imports will initialize the models
import db from "./models";
import "./models/user";
import "./models/role";
import "./models/folder";
import "./models/set";
import "./models/card";
import "./models/userSession";
import "./models/userProgress";
import "./models/image";
import "./models/sessionHistory";

// Import routers
import userRouter from "./routes/userRoutes";
import folderRouter from "./routes/folderRoutes";
import setRouter from "./routes/setRoutes";
import cardRouter from "./routes/cardRoutes";
import userSessionRouter from "./routes/userSessionRoutes";
import userProgressRouter from "./routes/userProgressRoutes";
import imageRouter from "./routes/imageRoutes";
import userStatsRouter from "./routes/userStatsRoutes";
import {v2 as cloudinary} from 'cloudinary';
import { ErrorMiddleWare } from "./middleware/error";
import userStreaksRouter from "./routes/userStreaks";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = Number(process.env.PORT) || 8080;


// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:4000", "https://fe-quiz-learn.vercel.app"],
    credentials: true,
  })
);

// Test database connection
const testDatabaseConnection = async () => {
  try {
    console.log("Attempting to connect to database...");
    console.log(`Database dialect: ${process.env.DB_DIALECT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);

    await db.sequelize.authenticate();

    if (process.env.NODE_ENV === "development") {
      console.log("PostgreSQL database connected successfully!");
    } else {
      console.log("SQL Server database connected successfully!");
    }
  } catch (error) {
    console.error("Unable to connect to the SQL Server database:", error);
    console.error("Please check your database configuration in .env.postgres");
    console.error("Make sure your database is running and accessible");
    process.exit(1); // Exit if database connection fails
  }
};

// Routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/set", setRouter);
app.use("/api/v1/card", cardRouter);
app.use("/api/v1/session", userSessionRouter);
app.use("/api/v1/image", imageRouter);
app.use("/api/v1/user-progress", userProgressRouter);
app.use("/api/v1/user-stats", userStatsRouter);
app.use("/api/v1/user-streaks", userStreaksRouter);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the QuizLearn API!");
});

// Error handling middleware
app.use(ErrorMiddleWare);

// Start server
const startServer = async () => {
  await testDatabaseConnection(); // Test database connection

  // Don't sync models with database initially since we're using migrations
  // If you need to sync model changes later, uncomment this
  /* 
  if (process.env.NODE_ENV === 'development') {
    await db.sequelize.sync({ alter: true }); // In development, alter tables
    console.log('Database synchronized');
  }
  */

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
