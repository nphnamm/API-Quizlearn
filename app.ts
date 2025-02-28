// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';
// const userRoutes = require("./routes/userRoutes");
// // Load environment variables
// dotenv.config();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection (Sequelize instance)
// const sequelize = new Sequelize(
//   process.env.DB_DATABASE || '',
//   process.env.DB_USER || '',
//   process.env.DB_PASSWORD || '',
//   {
//     host: process.env.DB_SERVER || 'localhost',
//     dialect: process.env.DB_DIALECT as any || 'mysql', // Change 'mysql' to 'mssql' for SQL Server
//     dialectOptions: {
//       encrypt: process.env.DB_DIALECT === 'mssql' ? true : false, // Optional for MSSQL
//       trustServerCertificate: process.env.DB_DIALECT === 'mssql' ? true : false,
//     },
//   }
// );

// // Test database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection established successfully');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

// // Routes
// app.use('/users', userRoutes);

// app.get('/', (req, res) => {
//   res.send('Welcome to the Node.js API with TypeScript, Sequelize, and SQL Server/MySQL!');
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express, { Application, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import db from './models'; // Import các models Sequelize
import userRouter from "./routes/userRoutes";
import folderRouter from './routes/folderRoutes';
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleWare } from './middleware/error';

const app: Application = express();
const PORT = process.env.PORT || 8080;
require('dotenv').config();

app.use(cookieParser());

// Middleware
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));

// cors => cross origin resource sharing 
app.use(cors({
    origin:['http://localhost:3001'],
    credentials:true,
}))

// Kiểm tra kết nối cơ sở dữ liệu
const testDatabaseConnection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
app.use("/api/v1",userRouter)
app.use("/api/v1/folder",folderRouter)

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, welcome to the API!');
});

// Khởi động server
const startServer = async () => {
  await testDatabaseConnection(); // Kiểm tra kết nối DB
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

app.use(ErrorMiddleWare)

startServer();
