import { migrate } from "postgres-migrations"

import dotenv from 'dotenv';

dotenv.config();

let variables: any = process.env;

// Подключается к базе данных по данным из .env и выполняет миграции из папки.
async function Migrate() {
    const dbConfig = {
        database: variables.DB_DATABASE_NAME as string,
        user: variables.DB_USER as string,
        password: variables.DB_PASSWORD as string,
        host: variables.DB_HOST as string,
        port: parseInt(variables.DB_PORT),

        // Default: false for backwards-compatibility
        // This might change!
        ensureDatabaseExists: true,

        // Default: "postgres"
        defaultDatabase: "postgres"
    }
    await migrate(dbConfig, "src/Model/dbMigrations/migrations")
}

Migrate();