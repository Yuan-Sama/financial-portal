import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		authenticated: Boolean(locals.user)
	};
}) satisfies PageServerLoad;
