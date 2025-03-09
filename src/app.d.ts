// See https://svelte.dev/docs/kit/types#app.d.ts

import type { User } from '$lib/db/db.schema';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Omit<User, 'password'> | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
