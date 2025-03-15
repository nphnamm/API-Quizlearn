import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get database settings from .env
const DB_DIALECT = process.env.DB_DIALECT || "postgres"; // "mssql" or "postgres"
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "quizlearn";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASS = process.env.DB_PASS || "";
const DB_PORT = parseInt(process.env.DB_PORT || (DB_DIALECT === "mssql" ? "1433" : "5432"));

// Sequelize configuration based on dialect
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT as "postgres" | "mssql",
  logging: false,
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
            encrypt: false, // Set to true if SQL Server requires encryption
            enableArithAbort: false,
          },
        },
  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: false,
  },
});

// Define interface for the database object
interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any; // Allow dynamic properties
}

const db: DbInterface = {
  sequelize,
  Sequelize,
};

export default db;
