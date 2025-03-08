import { z } from 'zod';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { accounts } from './schema';

export const createAccountSchema = createInsertSchema(accounts, {
	name: z.string().trim().min(1, { message: 'name is not empty or contains spaces' })
}).omit({ userId: true });

export const updateAccountSchema = createUpdateSchema(accounts, {
	id: z.coerce.number().min(1, { message: 'id must be greater than 0' }),
	name: z.string().trim().min(1, { message: 'name is not empty or contains spaces' })
}).omit({ userId: true });

export const deleteAccountsSchema = z.object({
	ids: z.number().array()
})