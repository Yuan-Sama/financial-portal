import { transactions } from '../transactions/schema';
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
	id: serial().primaryKey(),
	name: varchar({ length: 256 }).notNull(),
	userId: integer('user_id').notNull()
});

export const accountsRelations = relations(categories, ({ many }) => ({
	transactions: many(transactions)
}));
