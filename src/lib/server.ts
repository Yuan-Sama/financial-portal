import type { Cookies } from '@sveltejs/kit';
import type { User } from '$lib/db/db.schema';
import { createToken } from './service/jwt.server';
import { ACCESS_TOKEN } from '$lib/constants/server';

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
	const accessToken = await createToken(user, expiresAt);

	cookies.set(ACCESS_TOKEN, accessToken, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}
