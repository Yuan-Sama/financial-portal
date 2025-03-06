import type { User } from './types';
import bcrypt from 'bcrypt';
import { db } from '$lib/server/db';

export async function getUserByUsername(username: string) {
	return db.selectFrom('users').where('username', '=', username).selectAll().executeTakeFirst();
}

export async function createUser(
	data: { name: string; email: string },
	password: string,
	saltOrRounds: string | number = 12
) {
	const hashedPassword = await bcrypt.hash(password, saltOrRounds);

	return db
		.insertInto('users')
		.values({
			name: data.name,
			username: data.email,
			password: hashedPassword
		})
		.returningAll()
		.executeTakeFirst();
}

export async function comparePasswords(user: User, password: string) {
	return bcrypt.compare(password, user.password);
}
