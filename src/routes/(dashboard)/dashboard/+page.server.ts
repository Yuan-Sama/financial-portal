import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { user } = await parent();
}) satisfies PageServerLoad;
