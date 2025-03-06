// See https://svelte.dev/docs/kit/types#app.d.ts

import type { User } from '$lib/user/types';
import type { Cookies } from '@sveltejs/kit';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authenticate: (cookies: Cookies) => Promise<User | undefined>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
