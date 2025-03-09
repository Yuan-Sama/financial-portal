import { transaction } from '$lib/db/db.schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const createTransactionSchema = createInsertSchema(transaction, {
	date: z.coerce.date()
});

export const querySchema = z.object({
	from: z.string().optional(),
	to: z.string().optional(),
	accountId: z.string().optional()
});
