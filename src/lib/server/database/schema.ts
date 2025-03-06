import { pgTable, serial, text, integer, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial().primaryKey(),
	name: varchar({ length: 256 }).notNull(),
	username: varchar({ length: 256 }).notNull(),
	password: text('password').notNull()
});
