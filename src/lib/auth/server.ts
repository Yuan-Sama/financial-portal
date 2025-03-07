import type { User } from '$lib/user/types';
import type { Cookies } from '@sveltejs/kit';
import * as jose from 'jose';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { PUBLIC_APP_NAME } from '$env/static/public';

/**
 * @see {@link https://github.com/panva/jose/issues/210#jws-alg Algorithm Key Requirements}
 */
const alg = 'HS256';

const secret = new TextEncoder().encode(env.SECRET);

export const ACCESS_TOKEN = 'fp-access-token';

export async function createAccessToken(user: User, expiresAt: Date) {
	return new jose.SignJWT({ id: user.id })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setIssuer(PUBLIC_APP_NAME)
		.setAudience(PUBLIC_APP_NAME)
		.setExpirationTime(expiresAt)
		.sign(secret);
}

export async function authenticate(cookies: Cookies) {
	const token = cookies.get(ACCESS_TOKEN);

	if (!token) return;

	try {
		const verifiedToken = await jose.jwtVerify(token, secret, {
			issuer: PUBLIC_APP_NAME,
			audience: PUBLIC_APP_NAME
		});

		const userId = verifiedToken.payload.id as number;

		return db.selectFrom('users').where('id', '=', userId).selectAll().executeTakeFirst();
	} catch (err) {
		console.error('validateAuthToken():', err);
	}
	return;
}

export function getExpiresAt(seconds: number = 3600 /** 1 hour */) {
	const expiresAtMillis = Date.now() + seconds * 1000;
	return new Date(expiresAtMillis);
}

export async function createAndSetAccessToken(
	cookies: Cookies,
	user: User,
	expiresAtSeconds: number = 3600 /** 1 hour */
) {
	const expiresAt = getExpiresAt(expiresAtSeconds);
	const accessToken = await createAccessToken(user, expiresAt);

	cookies.set(ACCESS_TOKEN, accessToken, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function deleteAccessToken(cookies: Cookies) {
	cookies.set(ACCESS_TOKEN, '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}
