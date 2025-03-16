import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Determine which .env file to load
const ENV_FILE = process.env.ENV_FILE || ".env.postgres";
dotenv.config({ path: ENV_FILE });
console.log(`Loaded environment file: ${ENV_FILE}`); // Debugging

// Database settings from .env
const DB_URL = process.env.DB_URL || "";
const DB_DIALECT = (process.env.DB_DIALECT || "postgres") as "postgres" | "mssql";
const DB_SSL = process.env.DB_SSL === "true"; // Use SSL if specified in .env

// Sequelize configuration based on dialect
const sequelize = new Sequelize(DB_URL, {
  dialect: DB_DIALECT,
  logging: false,
  dialectOptions:
    DB_DIALECT === "postgres" && DB_SSL
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : DB_DIALECT === "mssql"
      ? {
          options: {
            encrypt: false, // Set to true if SQL Server requires encryption
            enableArithAbort: false,
          },
        }
      : {},
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