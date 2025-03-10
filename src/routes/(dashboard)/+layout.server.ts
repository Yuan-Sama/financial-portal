import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const { user } = locals;

	if (!user) redirect(307, '/');

	return {
		user: {
			id: user.id,
			name: user.name
		}
	};
}) satisfies LayoutServerLoad;
