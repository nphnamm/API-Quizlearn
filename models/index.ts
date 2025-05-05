// models/index.ts - Fixing circular dependency issues

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
const ENV_FILE = process.env.ENV_FILE || ".env";
console.log(`Loading environment from: ${ENV_FILE}`);
dotenv.config({ path: ENV_FILE });

// Get database connection info from environment variables
const DB_URL = process.env.DB_URL;
const DB_DIALECT = process.env.DB_DIALECT || "postgres";
console.log(`DB_DIALECT from env: ${DB_DIALECT}`);
console.log(`DB_URL from env: ${DB_URL}`);

// Configure Sequelize based on the database URL
let sequelize: Sequelize;

if (typeof DB_URL === "string" && DB_URL.trim() !== "") {
  // If DB_URL is provided, use it directly
  console.log("Using DB_URL for connection");
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
  console.log("Using individual parameters for connection");
  const DB_HOST = process.env.DB_HOST || "postgres";
  const DB_NAME = process.env.DB_NAME || "quizlearn";
  const DB_USER = process.env.DB_USER || "postgres";
  const DB_PASS = process.env.DB_PASS || "postgres";
  const DB_PORT = process.env.DB_PORT || 5432;

  console.log(`Connection details:
     - Dialect: ${DB_DIALECT}
     - Host: ${DB_HOST}
     - Database: ${DB_NAME}
     - Port: ${DB_PORT}
  `);

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: parseInt(DB_PORT as string, 10),
    dialect: DB_DIALECT as 'postgres' | 'mssql',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true'
        ? {
          require: true,
          rejectUnauthorized: false,
        }
        : undefined,
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
  User?: any;
  Folder?: any;
  Set?: any;
  Card?: any;
  UserSession?: any;
  UserProgress?: any;
  [key: string]: any;
}

// Create the db object with sequelize instance first
const db: DbInterface = {
  sequelize,
  Sequelize,
};

// Export the db object right away to avoid circular dependencies
export default db;

// Now import the models (AFTER exporting db)
// This is crucial to avoid circular dependencies
import User from "./user";
import Folder from "./folder";
import Set from "./set";
import Card from "./card";
import UserSession from "./userSession";
import UserProgress from "./userProgress";

// Add models to db object
db.User = User;
db.Folder = Folder;
db.Set = Set;
db.Card = Card;
db.UserSession = UserSession;
db.UserProgress = UserProgress;


// Set up associations after all models are loaded
Object.keys(db).forEach((modelName) => {
  if (db[modelName] && db[modelName].associate) {
    console.log(`Setting up associations for ${modelName}`);
    db[modelName].associate(db);
    console.log(`Model ${modelName} associated`);
  }
});