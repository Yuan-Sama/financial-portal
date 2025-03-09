import { ACCESS_TOKEN } from '$lib/server';
import { verifyToken } from '$lib/server/jwt.service';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (!accessToken) locals.user = null;
	else locals.user = (await verifyToken(accessToken)) ?? null;

	return resolve(event);
};
