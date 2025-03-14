import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Lấy thông tin database từ biến môi trường
const DB_DIALECT = process.env.DB_DIALECT || "postgres"; // postgres | mssql
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "quizlearn";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASS = process.env.DB_PASS || "";
const DB_PORT = parseInt(process.env.DB_PORT || (DB_DIALECT === "mssql" ? "1433" : "5432"));

// Cấu hình Sequelize theo database đang sử dụng
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT as "postgres" | "mssql",
  logging: process.env.DB_LOGGING === "true" ? console.log : false, // Log SQL queries nếu cần
  pool: {
    max: 10, // Số kết nối tối đa
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions:
    DB_DIALECT === "postgres"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {
          options: {
            encrypt: false, // Đặt true nếu SQL Server yêu cầu mã hóa
            enableArithAbort: false,
          },
        },
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: false,
  },
});

// Interface để quản lý models trong Sequelize
interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any; // Cho phép thêm model vào object này
}

const db: DbInterface = {
  sequelize,
  Sequelize,
};

export default db;
