import * as jose from 'jose';
import { env } from '$env/dynamic/private';
import type { User } from '$lib/db/db.schema';
import { PUBLIC_APP_NAME } from '$env/static/public';
import { db } from '$lib/db/db.server';

/**
 * @see {@link https://github.com/panva/jose/issues/210#jws-alg Algorithm Key Requirements}
 */
const alg = 'HS256';

const secret = new TextEncoder().encode(env.SECRET);

export async function createToken(user: User, expiresAt: Date) {
	return new jose.SignJWT({ id: user.id })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setIssuer(PUBLIC_APP_NAME)
		.setAudience(PUBLIC_APP_NAME)
		.setExpirationTime(expiresAt)
		.sign(secret);
}

export async function verifyToken(token: string) {
	try {
		const verifiedToken = await jose.jwtVerify(token, secret, {
			issuer: PUBLIC_APP_NAME,
			audience: PUBLIC_APP_NAME
		});

		const userId = verifiedToken.payload.id as number;

		return db
			.selectFrom('user')
			.where('id', '=', userId)
			.select(['id', 'name', 'username'])
			.executeTakeFirst();
	} catch (err) {
		console.error('validateAuthToken():', err);
	}
	return;
}
