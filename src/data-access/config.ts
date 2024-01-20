// data-access/config.ts
import * as dotenv from 'dotenv';

dotenv.config({ path: './db.env' });

export interface DatabaseConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

export const databaseConfig: DatabaseConfig = {
    user: process.env.DB_USER || 'default_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'default_database',
    password: process.env.DB_PASSWORD || 'default_password',
    port: parseInt(process.env.DB_PORT || '5432', 10),
};
