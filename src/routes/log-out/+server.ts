import { deleteAccessToken } from '$lib/auth/server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	deleteAccessToken(cookies);
	return new Response(null, { status: 401 });
};
