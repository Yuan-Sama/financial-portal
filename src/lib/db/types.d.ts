import type { accounts } from '$lib/accounts/schema';
import type { categories } from '$lib/categories/schema';
import type { users } from '$lib/user/schema';
import type { Kyselify } from 'drizzle-orm/kysely';

export interface Database {
	users: Kyselify<typeof users>;
	accounts: Kyselify<typeof accounts>;
	categories: Kyselify<typeof categories>;
}
