import type { users } from '$lib/user/schema';
import type { Kyselify } from 'drizzle-orm/kysely';

export interface Database {
	users: Kyselify<typeof users>;
}
