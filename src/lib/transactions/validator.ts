import { createInsertSchema } from 'drizzle-zod';
import { transactions } from './schema';
import { z } from 'zod';

export const createTransactionSchema = createInsertSchema(transactions, {
	date: z.coerce.date()
});

export const querySchema = z.object({
	from: z.string().optional(),
	to: z.string().optional(),
	accountId: z.string().optional()
});
