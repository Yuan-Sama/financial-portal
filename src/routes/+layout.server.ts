import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;

	return {
		authenticated: Boolean(user)
	};
}) satisfies LayoutServerLoad;
