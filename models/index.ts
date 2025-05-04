import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
const ENV_FILE = process.env.ENV_FILE || ".env";
console.log(`Loading environment from: ${ENV_FILE}`);
dotenv.config({ path: ENV_FILE });

// Get database connection info from environment variables
const DB_URL = process.env.DB_URL;
const DB_DIALECT = process.env.DB_DIALECT || "postgres"; // postgres | mssql
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
    host: DB_HOST,  // Service name from Docker Compose for PostgreSQL
    port: parseInt(DB_PORT as string, 10),  // PostgreSQL default port is 5432
    dialect: DB_DIALECT as 'postgres' | 'mssql',  // Ensure the dialect is PostgreSQL
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      // Configure dialect options for PostgreSQL
      ssl: process.env.DB_SSL === 'true' // You may want to set this based on your environment
        ? {
          require: true,
          rejectUnauthorized: false,
        }
        : undefined,
    },
    define: {
      timestamps: true,  // Enable timestamps for models
      underscored: false,  // Use camelCase for table column names
      freezeTableName: false,  // Allow Sequelize to pluralize table names
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
