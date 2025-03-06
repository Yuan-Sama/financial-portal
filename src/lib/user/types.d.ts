import type { InferSelectModel } from 'drizzle-orm';
import type { users } from './schema';

type User = InferSelectModel<typeof users>;
