import { z } from 'zod';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { categories } from './schema';

export const createCategorySchema = createInsertSchema(categories, {
	name: z.string().trim().min(1, { message: 'name is not empty or contains spaces' })
}).omit({ userId: true });

export const updateCategorySchema = createUpdateSchema(categories, {
	id: z.coerce.number().min(1, { message: 'id must be greater than 0' }),
	name: z.string().trim().min(1, { message: 'name is not empty or contains spaces' })
}).omit({ userId: true });

export const deleteCategoriesSchema = z.object({
	ids: z.number().array()
});
