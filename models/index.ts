import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get database connection info from environment variables
const DB_URL = process.env.DB_URL;
const DB_DIALECT = process.env.DB_DIALECT || "postgres"; // postgres | mssql

// Configure Sequelize based on the database URL
let sequelize: Sequelize;

if (DB_URL) {
  // If DB_URL is provided, use it directly
  sequelize = new Sequelize(DB_URL, {
    dialect: DB_DIALECT as "postgres" | "mssql",
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
    pool: {
      max: 10,
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
              encrypt: false,
              enableArithAbort: false,
            },
          },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: false,
    },
  });
} else {
  // Fallback to individual parameters if DB_URL is not provided
  const DB_HOST = process.env.DB_HOST || "localhost";
  const DB_NAME = process.env.DB_NAME || "quizlearn";
  const DB_USER = process.env.DB_USER || "postgres";
  const DB_PASS = process.env.DB_PASS || "";
  const DB_PORT = parseInt(process.env.DB_PORT || (DB_DIALECT === "mssql" ? "1433" : "5432"));

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT as "postgres" | "mssql",
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
    pool: {
      max: 10,
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
              encrypt: false,
              enableArithAbort: false,
            },
          },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: false,
    },
  });
}

// Interface to manage models in Sequelize
interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any; // Allow adding models to this object
}

const db: DbInterface = {
  sequelize,
  Sequelize,
};

export default db;
