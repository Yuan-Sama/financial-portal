import type { Database } from './types';

import { env } from '$env/dynamic/private';
import { Kysely, PostgresDialect, type LogConfig } from 'kysely';
import pg from 'pg';

const { DATABASE_URL } = env;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const pool = new pg.Pool({
	connectionString: DATABASE_URL
});

const log: LogConfig | undefined = import.meta.env.DEV ? ['query', 'error'] : undefined;

export const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool
	}),
	log
});
