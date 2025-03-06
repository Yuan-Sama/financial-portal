import type { Database } from './types';

import { env } from '$env/dynamic/private';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const { DATABASE_URL } = env;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const pool = new Pool({
	connectionString: DATABASE_URL
});

export const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool
	})
});
