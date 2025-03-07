import type { LayoutServerLoad } from './$types';
import { authenticate } from '$lib/auth/server';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
	const user = await authenticate(cookies);

	if (!user) redirect(307, '/');

	return {
		user: {
			id: user.id,
			name: user.name,
			email: user.username
		}
	};
}) satisfies LayoutServerLoad;
