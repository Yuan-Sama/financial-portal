import type { Kyselify } from 'drizzle-orm/kysely';
import type { users } from './schema';

export interface Database {
	users: Kyselify<typeof users>;
}
