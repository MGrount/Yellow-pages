// data-access/db-client.ts
import { Pool } from 'pg';
import { databaseConfig, DatabaseConfig } from './config';

export class DbClient {
    private static pool: Pool;

    static initialize(config: DatabaseConfig): void {
        DbClient.pool = new Pool(config);
    }

    static async query(queryText: string, params?: any[]): Promise<any> {
        const client = await DbClient.pool.connect();
        try {
            return await client.query(queryText, params);
        } finally {
            client.release();
        }
    }
}

// Initialize the DbClient with the configuration
DbClient.initialize(databaseConfig);
