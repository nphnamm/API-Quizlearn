# Migrating from SQL Server to PostgreSQL on Render

This document outlines the steps to migrate your QuizLearn application from SQL Server to PostgreSQL on Render.

## Prerequisites

1. You have created a PostgreSQL database on Render.
2. You have installed the required PostgreSQL driver packages:
   ```
   npm install pg pg-hstore
   ```

## Configuration Steps

### 1. Update PostgreSQL Configuration

Update the PostgreSQL connection details in `config/config.json`:

```json
"postgres": {
  "username": "your_postgres_username",
  "password": "your_postgres_password",
  "database": "your_database_name",
  "host": "your_render_postgres_host.render.com",
  "dialect": "postgres",
  "port": 5432,
  "use_env_variable": null,
  "dialectOptions": {
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    }
  }
}
```

### 2. Get Your Render PostgreSQL Connection Info

1. Go to your Render dashboard
2. Select your PostgreSQL database service
3. Copy the "Internal Database URL" - it should look like:
   ```
   postgres://your_username:your_password@your_host/your_database
   ```
4. Extract the details and add them to the config.json file

### 3. Environment Variables Setup

Create a `.env` file with the PostgreSQL connection info (for local development):

```
DB_DIALECT=postgres
PG_USERNAME=your_postgres_username
PG_PASSWORD=your_postgres_password
PG_DATABASE=your_database_name
PG_HOST=your_render_postgres_host.render.com
PG_PORT=5432
```

### 4. Migrate Your Data

Run the migration script to transfer data from SQL Server to PostgreSQL:

```
npm run migrate:pg
```

This script will:
- Connect to both databases
- Create tables in PostgreSQL based on your models
- Copy all data from SQL Server to PostgreSQL

### 5. Run Application with PostgreSQL

After migrating, you can start the application using PostgreSQL:

```
npm run start:pg
```

Or set the environment variable permanently in your deployment settings.

### 6. Deploy to Render

When deploying to Render:

1. Add the following environment variable:
   - `DB_DIALECT=postgres`

2. Ensure your build command installs the PostgreSQL drivers:
   ```
   npm install && npm install pg pg-hstore
   ```

## Troubleshooting

### Connection Issues
- Ensure SSL is enabled in the dialectOptions as shown above
- Check that the database is accessible from your application
- Verify your IP is allowed in Render's database access controls

### Migration Errors
- Check the console for specific error messages
- Common issues include data type compatibility differences between SQL Server and PostgreSQL
- You may need to manually adjust some data formats or fix referential integrity

### Running Both Databases
- The application can switch between SQL Server and PostgreSQL using the `DB_DIALECT` environment variable
- This allows you to test the PostgreSQL version while keeping the SQL Server version running 