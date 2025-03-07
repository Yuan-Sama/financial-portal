import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { authenticated } = await parent();

	if (authenticated) redirect(307, '/dashboard');
}) satisfies LayoutServerLoad;
