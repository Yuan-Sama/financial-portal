import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { getPageCategory } from '$lib/categories/server';
import {
	createCategorySchema,
	deleteCategoriesSchema,
	updateCategorySchema
} from '$lib/categories/validator';
import { delay } from '$lib';
import { db } from '$lib/db/server';

const { DEV } = import.meta.env;

// TODO: handle search params for dynamic page, pageSize, search

export const load = (async ({ parent }) => {
	const { user } = await parent();

	const createForm = await superValidate(zod(createCategorySchema));
	const updateForm = await superValidate(zod(updateCategorySchema));
	const deletesForm = await superValidate(zod(deleteCategoriesSchema));

	return { createForm, updateForm, deletesForm, pagination: await getPageCategory(user.id) };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ locals, request }) => {
		const { user } = locals;
		if (!user) return fail(401);

		const createForm = await superValidate(request, zod(createCategorySchema));

		if (DEV) await delay(1, 5);

		if (!createForm.valid) return fail(400, { createForm });

		const { name } = createForm.data;

		await db
			.insertInto('categories')
			.values({
				user_id: user.id,
				name: name
			})
			.execute();

		createForm.message = 'Category created';

		return { createForm, pagination: await getPageCategory(user.id) };
	},

	update: async ({ locals, request }) => {
		const { user } = locals;
		if (!user) return fail(401);

		const updateForm = await superValidate(request, zod(updateCategorySchema));

		if (DEV) await delay(1, 5);

		if (!updateForm.valid) return fail(400, { updateForm });

		const { id, name } = updateForm.data;

		await db
			.updateTable('categories')
			.set({ name: name })
			.where('user_id', '=', user.id)
			.where('id', '=', id)
			.execute();

		updateForm.message = 'Category updated';

		return { updateForm, pagination: await getPageCategory(user.id) };
	},

	delete: async ({ locals, request }) => {
		const { user } = locals;
		if (!user) return fail(401);

		const updateForm = await superValidate(request, zod(updateCategorySchema));

		if (DEV) await delay(1, 5);

		if (!updateForm.valid) return fail(400, { updateForm });

		const { id } = updateForm.data;

		await db.deleteFrom('categories').where('user_id', '=', user.id).where('id', '=', id).execute();

		updateForm.message = 'Category deleted';
		return { updateForm, pagination: await getPageCategory(user.id) };
	},

	deletes: async ({ locals, request }) => {
		const { user } = locals;
		if (!user) return fail(401);

		const deletesForm = await superValidate(request, zod(deleteCategoriesSchema));

		if (DEV) await delay(1, 5);

		if (!deletesForm.valid) return fail(400);

		const { ids } = deletesForm.data;

		await db
			.deleteFrom('categories')
			.where('user_id', '=', user.id)
			.where('id', 'in', ids)
			.execute();

		deletesForm.message = `Categor${ids.length > 1 ? 'ies' : 'y'} deleted`;
		return { deletesForm, pagination: await getPageCategory(user.id) };
	}
} satisfies Actions;
