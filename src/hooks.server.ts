import type { Handle } from '@sveltejs/kit';
import { ACCESS_TOKEN } from '$lib/constants/server';
import { verifyToken } from '$lib/service/jwt.server';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (!accessToken) locals.user = null;
	else locals.user = (await verifyToken(accessToken)) ?? null;

	return resolve(event);
};
