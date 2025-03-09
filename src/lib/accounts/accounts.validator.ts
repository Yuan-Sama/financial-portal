import { z } from 'zod';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { account } from '$lib/db/db.schema';

export const createAccountSchema = createInsertSchema(account, {
	name: z.string().trim().min(1, { message: 'name is not empty or contains spaces' })
}).omit({ userId: true });

export type CreateAccountFormSchema = z.infer<typeof createAccountSchema>;

export const updateAccountSchema = createUpdateSchema(account, {
	id: z.coerce.number().min(1, { message: 'id must be greater than 0' }),
	name: z.string().trim().min(1, { message: 'name is not empty or contains spaces' })
}).omit({ userId: true });

export type UpdateAccountFormSchema = z.infer<typeof updateAccountSchema>;

export const deleteAccountsSchema = z.object({
	ids: z.number().array()
});

export type DeleteAccountsFormSchema = z.infer<typeof deleteAccountsSchema>;
