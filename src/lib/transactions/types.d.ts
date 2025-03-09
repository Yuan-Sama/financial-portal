import type { InferSelectModel } from 'drizzle-orm';
import type { transactions } from './schema';

type Transaction = InferSelectModel<typeof transactions>;
