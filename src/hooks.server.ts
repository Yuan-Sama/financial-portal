import type { Handle } from '@sveltejs/kit';
import { authenticate } from '$lib/auth/server';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.authenticate = authenticate;
	return resolve(event);
};
