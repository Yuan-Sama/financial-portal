import type { RequestHandler } from './$types';
import { ACCESS_TOKEN } from '$lib/constants/server';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	cookies.set(ACCESS_TOKEN, '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});

	locals.user = null;

	return new Response(null, { status: 401 });
};
