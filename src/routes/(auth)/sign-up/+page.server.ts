import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms';
import { signUpSchema } from '$lib/user/validator';
import { createUser, getUserByUsername } from '$lib/user/server';
import { createAndSetAccessToken } from '$lib/auth/server';

export const load = (async () => {
	const form = await superValidate(zod(signUpSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(signUpSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { data } = form;

		const existedUser = await getUserByUsername(data.email);
		if (existedUser) return message(form, 'User exists', { status: 400 });

		const user = await createUser({ name: data.name, email: data.email }, data.password);
		if (!user) return message(form, 'Can not create user', { status: 400 });

		await createAndSetAccessToken(cookies, user);

		redirect(303, '/dashboard');
	}
} satisfies Actions;
