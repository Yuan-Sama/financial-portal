import bcrypt from 'bcrypt';
import { db } from '$lib/db/db.server';
import type { User } from '$lib/db/db.schema';

export async function getUserByUsername(username: string) {
	return db.selectFrom('user').where('username', '=', username).selectAll().executeTakeFirst();
}

export async function createUser(
	data: { name: string; email: string },
	password: string,
	saltOrRounds: string | number = 12
) {
	const hashedPassword = await bcrypt.hash(password, saltOrRounds);

	return db
		.insertInto('user')
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
