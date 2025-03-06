import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { comparePasswords, getUserByUsername } from '$lib/user/server';
import { signInSchema } from '$lib/user/validator';
import { createAndSetAccessToken } from '$lib/auth/server';

export const load = (async () => {
	const form = await superValidate(zod(signInSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(signInSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { data } = form;

		const user = await getUserByUsername(data.email);
		if (!user) return message(form, 'Email or password incorrect', { status: 400 });

		const passwordsMatch = await comparePasswords(user, data.password);
		if (!passwordsMatch) return message(form, 'Email or password incorrect', { status: 400 });

		await createAndSetAccessToken(cookies, user);

		redirect(303, '/dashboard');
	}
} satisfies Actions;
