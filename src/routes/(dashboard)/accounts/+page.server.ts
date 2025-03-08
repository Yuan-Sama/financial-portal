import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { getPageAccount } from '$lib/accounts/server';
import {
	createAccountSchema,
	deleteAccountsSchema,
	updateAccountSchema
} from '$lib/accounts/validator';
import { delay } from '$lib';
import { db } from '$lib/db/server';

const { DEV } = import.meta.env;

// TODO: handle search params for dynamic page, pageSize, search

export const load = (async ({ parent }) => {
	const { user } = await parent();

	const createForm = await superValidate(zod(createAccountSchema));
	const updateForm = await superValidate(zod(updateAccountSchema));
	const deletesForm = await superValidate(zod(deleteAccountsSchema));

	return { createForm, updateForm, deletesForm, pagination: await getPageAccount(user.id) };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ locals, request }) => {
		const { user } = locals;
		if (!user) return fail(401);

		const createForm = await superValidate(request, zod(createAccountSchema));

		if (DEV) await delay(1, 5);

		if (!createForm.valid) return fail(400, { createForm });

		const { name } = createForm.data;

		await db
			.insertInto('accounts')
			.values({
				user_id: user.id,
				name: name
			})
			.execute();

		createForm.message = 'Account created';

		return { createForm, pagination: await getPageAccount(user.id) };
	},

	update: async ({ locals, request }) => {
		const { user } = locals;
		if (!user) return fail(401);

		const updateForm = await superValidate(request, zod(updateAccountSchema));

		if (DEV) await delay(1, 5);

		if (!updateForm.valid) return fail(400, { updateForm });

		const { id, name } = updateForm.data;

		await db
			.updateTable('accounts')
			.set({ name: name })
			.where('user_id', '=', user.id)
			.where('id', '=', id)
			.execute();

		updateForm.message = 'Account updated';

		return { updateForm, pagination: await getPageAccount(user.id) };
	},

	delete: async ({ locals, request }) => {
		const { user } = locals;
		if (!user) return fail(401);

		const updateForm = await superValidate(request, zod(updateAccountSchema));

		if (DEV) await delay(1, 5);

		if (!updateForm.valid) return fail(400, { updateForm });

		const { id } = updateForm.data;

		await db.deleteFrom('accounts').where('user_id', '=', user.id).where('id', '=', id).execute();

		updateForm.message = 'Account deleted';
		return { updateForm, pagination: await getPageAccount(user.id) };
	},

	deletes: async ({ locals, request }) => {
		const { user } = locals;
		if (!user) return fail(401);

		const deletesForm = await superValidate(request, zod(deleteAccountsSchema));

		if (DEV) await delay(1, 5);

		if (!deletesForm.valid) return fail(400);

		const { ids } = deletesForm.data;

		await db.deleteFrom('accounts').where('user_id', '=', user.id).where('id', 'in', ids).execute();

		deletesForm.message = `Account${ids.length > 1 ? 's' : ''} deleted`;
		return { deletesForm, pagination: await getPageAccount(user.id) };
	}
} satisfies Actions;
