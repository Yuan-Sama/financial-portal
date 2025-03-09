import { z } from 'zod';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { category } from '$lib/db/db.schema';

export const createCategorySchema = createInsertSchema(category, {
	name: z.string().trim().min(1, { message: 'name is not empty or contains spaces' })
}).omit({ userId: true });

export type CreateCategoryFormSchema = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createUpdateSchema(category, {
	id: z.coerce.number().min(1, { message: 'id must be greater than 0' }),
	name: z.string().trim().min(1, { message: 'name is not empty or contains spaces' })
}).omit({ userId: true });

export type UpdateCategoryFormSchema = z.infer<typeof updateCategorySchema>;

export const deleteCategoriesSchema = z.object({
	ids: z.number().array()
});
