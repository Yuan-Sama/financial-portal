import { createInsertSchema } from 'drizzle-zod';
import { transactions } from './schema';
import { z } from 'zod';

export const insertTransactionSchema = createInsertSchema(transactions, {
	date: z.coerce.date()
});
