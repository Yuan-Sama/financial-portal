import { accounts } from '../accounts/schema';
import { categories } from '../categories/schema';
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const transactions = pgTable('transactions', {
	id: serial().primaryKey(),
	amount: integer().notNull(),
	payee: text().notNull(),
	notes: text(),
	date: timestamp({ mode: 'date' }).notNull(),
	accountId: integer('account_id')
		.references(() => accounts.id, { onDelete: 'cascade' })
		.notNull(),
	categoryId: integer('category_id').references(() => categories.id, {
		onDelete: 'set null'
	})
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
	account: one(accounts, {
		fields: [transactions.accountId],
		references: [accounts.id]
	}),
	category: one(categories, {
		fields: [transactions.categoryId],
		references: [categories.id]
	})
}));
